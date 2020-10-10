const fp = require("fastify-plugin");
const { fn } = require("moment");
const SocketIO = require("socket.io");
const redisAdapter = require("socket.io-redis");

function onSocketConnect(socket) {
  console.log("[ws] user connected");
  const Thread = this.mongo.model("Thread");
  const User = this.mongo.model("User");
  const Post = this.mongo.model("Post");
  const Message = this.mongo.model("Message");

  socket.on("IDENTIFY", async (data, res) => {
    const [userErr, user] = await this.to(User.findById(data.id));
    if (userErr) {
      return res({ code: 500, message: "Internal server error" });
    } else if (user === null) {
      return res({ code: 404, message: "User not found" });
    }
    socket.userId = data.id;

    this.io.emit("USER_STATUS_UPDATE", { id: socket.userId, status: "online" });
    socket.on("disconnect", () => {
      console.log("[ws] user disconnected");
      for (let room in socket.rooms) {
        socket.leave(room);
      }
      setTimeout(() => {
        // the user maybe is just changing/reloading the page, wait to make sure they completely disconnected
        const stillOnline = getSocketByUserId(this, socket.userId);
        if (!stillOnline)
          this.io.emit("USER_STATUS_UPDATE", {
            id: socket.userId,
            status: "offline",
          });
      }, 1000);
    });
    res({ code: 200, message: "Success" });
  });

  socket.on("JOIN_ROOM", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY

    let userInRoom = await isUserInRoom(this, data.threadId, socket.id);
    var threadErr, thread;
    if (data.threadId) {
      // joining from inbox
      [threadErr, thread] = await this.to(
        Thread.findOne({
          _id: data.threadId,
          "participants.id": userId,
        }),
      );
    } else if (data.receiverId) {
      // joining from feed
      [threadErr, thread] = await this.to(
        Thread.findOne({
          $and: [
            { "participants.id": userId },
            { "participants.id": data.receiverId },
          ],
        }),
      );
    } else {
      // user called joinRoom({}) inside leaveAllRooms()
      for (let room in socket.rooms) {
        if (room != socket.id) await socket.leave(room);
      }
      return res({ code: 401, message: "Unauthorized" });
    }
    if (threadErr) return res({ code: 500, message: "Internal server error" });

    // first time joining, creating new thread.
    if (!thread && data.receiverId) {
      const [senderErr, sender] = await this.to(User.findById(userId));
      const [receiverErr, receiver] = await this.to(
        User.findById(data.receiverId),
      );
      if (senderErr || receiverErr)
        return res({ code: 500, message: "Internal server error" });
      if (!sender || !receiver)
        return res({ code: 404, message: "User not found" });
      let newThread = { participants: [] };
      [sender, receiver].forEach((participant) => {
        newThread.participants.push({
          id: participant._id,
          lastAccess: participant == sender ? new Date() : null,
          name: participant.name,
          newMessages: participant == receiver ? 1 : 0,
          photo: participant.photo,
          status: participant == sender ? "accepted" : "pending",
          type: participant.type,
        });
      });

      [threadErr, thread] = await this.to(new Thread(newThread).save());
      if (threadErr)
        return res({ code: 500, message: "Internal server error" });
    } else if (!thread) return res({ code: 401, message: "Unauthorized" });

    // update participant.lastAccess, and mark messages as read.
    [threadErr, thread] = await this.to(
      Thread.findByIdAndUpdate(
        thread._id,
        {
          $set: {
            "participants.$[userToUpdate].lastAccess": new Date(),
            "participants.$[userToUpdate].newMessages": 0,
          },
        },
        { new: true, arrayFilters: [{ "userToUpdate.id": userId }] },
      ),
    );
    let threadWithLastMessage = thread.toObject();
    const [lastMessageErr, lastMessage] = await this.to(
      Message.findOne({ threadId: thread._id }).sort({ updatedAt: -1 }),
    );
    if (lastMessage) threadWithLastMessage.lastMessage = lastMessage;

    if (!userInRoom) {
      // user not already in that room
      // leave any other room, EXCEPT the unique socket room (socket.id)
      for (let room in socket.rooms) {
        if (room != socket.id) await socket.leave(room);
      }
      socket.join(threadWithLastMessage._id);
    }
    res({ code: 200, data: threadWithLastMessage });
  });

  socket.on("GET_USER_THREADS", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const [threadsErr, threads] = await this.to(
      Thread.find({ "participants.id": userId }).sort({ updatedAt: 1 }),
    );
    if (threadsErr) return res({ code: 500, message: "Internal server error" });

    const threadsRich = []; // Rich because will have lastMessage, and topic
    for (let i = 0; i < threads.length; i++) {
      const thread = threads[i].toObject();
      const [lastMessageErr, lastMessage] = await this.to(
        Message.findOne({ threadId: thread._id }).sort({ createdAt: -1 }),
      );
      const [lastEmbedMessageErr, lastEmbedMessage] = await this.to(
        Message.findOne({ threadId: thread._id, postRef: { $ne: null } }).sort({
          createdAt: -1,
        }),
      );

      if (lastMessage) thread.lastMessage = lastMessage;
      if (lastEmbedMessage) thread.topic = lastEmbedMessage.postRef.title;
      threadsRich.push(thread);
    }
    res({ code: 200, data: threadsRich });
  });

  socket.on("GET_USER_STATUS", async (id, res) => {
    const status = getSocketByUserId(this, id) ? "online" : "offline";
    res({ code: 200, data: status });
  });

  socket.on("GET_CHAT_LOG", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    let userInRoom = await isUserInRoom(this, data.threadId, socket.id);
    if (!userInRoom) return res({ code: 401, message: "Unauthorized" });

    const [messagesErr, messages] = await this.to(
      Message.find({ threadId: data.threadId })
        .limit(20)
        .sort({ createdAt: -1 }),
    );

    if (messagesErr)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, data: messages });
  });

  socket.on("GET_CHAT_LOG_MORE", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    let userInRoom = await isUserInRoom(this, data.threadId, socket.id);
    if (!userInRoom) return res({ code: 401, message: "Unauthorized" });

    const [messagesErr, messages] = await this.to(
      Message.find({ threadId: data.threadId })
        .limit(20)
        .skip(data.skip)
        .sort({ createdAt: -1 }),
    );

    if (messagesErr)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, data: messages });
  });

  socket.on("SEND_MESSAGE", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    let userInRoom = await isUserInRoom(this, data.threadId, socket.id);
    if (!data.threadId && !userInRoom)
      return res({ code: 401, message: "Unauthorized" });
    var [threadErr, thread] = await this.to(
      Thread.findOne({
        _id: data.threadId,
        "participants.id": userId,
      }),
    );
    if (threadErr) return res({ code: 500, message: "Internal server error" });
    if (!thread) return res({ code: 401, message: "Unauthorized" });

    let newMessage = {
      authorId: userId,
      content: data.content.substring(0, 2048),
      postRef: null,
      status: "sent", // later
      threadId: thread._id,
    };

    // add postRef
    if (data.postId) {
      var [postErr, post] = await this.to(Post.findOne({ _id: data.postId }));
      if (postErr) return res({ code: 500, message: "Internal server error" });
      if (post)
        newMessage.postRef = {
          content: post.content,
          id: post._id,
          objective: post.objective,
          title: post.title,
          createdAt: post.createdAt,
        };
    }
    [messageErr, message] = await this.to(Message(newMessage).save());
    if (messageErr) return res({ code: 500, message: "Internal server error" });

    // add unread mark to recipient(s)
    // if not ( online && in the same room)
    let recipients = thread.participants
      .filter((p) => p.id != userId)
      .map((r) => r.id);

    for (const recipient of recipients) {
      let recipientSocket = getSocketByUserId(this, recipient);
      let isInSameRoom = recipientSocket
        ? await isUserInRoom(this, thread._id.toString(), recipientSocket.id)
        : false;

      if (!recipientSocket || (recipientSocket && !isInSameRoom)) {
        // equivalent to (!online || (online && !inSameRoom))
        const [updateThreadErr, updateThread] = await this.to(
          Thread.findByIdAndUpdate(
            thread._id,
            { $inc: { "participants.$[userToUpdate].newMessages": 1 } },
            { arrayFilters: [{ "userToUpdate.id": recipient }] },
          ),
        );

        // send message web notification
        if (recipientSocket && !isInSameRoom) {
          // equivalent to (online && !inSameRoom))
          this.io
            .to(recipientSocket.id)
            .emit("NEW_MESSAGE_NOTIFICATION", message);
        }
      }
    }

    this.io.to(data.threadId).emit("MESSAGE_RECEIVED", message);
    res({ code: 200, message: "Success" });
  });

  socket.on("DELETE_MESSAGE", async (messageId) => {
    userId = socket.userId;
    if (!userId) return; //user did not IDENTIFY
    var [messageDeletedErr, messageDeleted] = await this.to(
      Message.findOneAndUpdate(
        {
          _id: messageId,
          authorId: userId,
          status: { $ne: "deleted" },
        },
        { status: "deleted", content: null, postRef: null },
      ),
    );
    if (messageDeletedErr || !messageDeleted) return;
    this.io.to(messageDeleted.threadId).emit("MESSAGE_DELETED", messageId);
  });

  socket.on("EDIT_MESSAGE", async (data) => {
    userId = socket.userId;
    if (!userId) return; //user did not IDENTIFY
    var [messageEditedErr, messageEdited] = await this.to(
      Message.findOneAndUpdate(
        {
          _id: data.messageId,
          authorId: userId,
          status: { $ne: "deleted" },
        },
        { status: "edited", content: data.newContent },
        { new: true },
      ),
    );
    if (messageEditedErr || !messageEdited) return;
    this.io.to(messageEdited.threadId).emit("MESSAGE_EDITED", messageEdited);
  });
}

function getSocketByUserId(app, userId) {
  // usefull to send notifications outside socket context, or get online status
  return (
    Object.values(app.io.of("/").connected).find(
      (socket) => socket.userId == userId,
    ) || null
  );
}

function isUserInRoom(app, threadId, socketId) {
  return new Promise((resolve) => {
    app.io.of("/").adapter.clientRooms(socketId, (err, rooms) => {
      if (err) return resolve(false);
      if (!rooms.includes(threadId)) return resolve(false);
      else resolve(true);
    });
  });
}

function fastifySocketIo(app, config, next) {
  try {
    const io = new SocketIO(app.server, config.options);
    io.adapter(redisAdapter(config.redis));
    io.on("connect", onSocketConnect.bind(app));
    app.decorate("io", io);

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = fp(fastifySocketIo);