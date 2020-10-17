const fp = require("fastify-plugin");
const { fn } = require("moment");
const SocketIO = require("socket.io");
const cookieParser = require('socket.io-cookie-parser');
const redisAdapter = require("socket.io-redis");

const {
  config: { auth },
} = require("../../config");

function onSocketConnect(socket) {
  console.log("[ws] user connected");
  const Thread = this.mongo.model("Thread");
  const User = this.mongo.model("User");
  const Post = this.mongo.model("Post");
  const Message = this.mongo.model("Message");

  socket.on("IDENTIFY", async (data, res) => {
    if (!socket.request.cookies['token']) return res({ code: 401, message: "Unauthorized" });
    const decodedToken = this.jwt.decode(socket.request.cookies['token'])
    const userId = decodedToken.payload[auth.jwtMongoIdKey]
    if (!userId) return res({ code: 401, message: "Unauthorized" });
    const [userErr, user] = await this.to(User.findById(userId));
    if (userErr) {
      return res({ code: 500, message: "Internal server error" });
    } else if (user === null) {
      return res({ code: 404, message: "User not found" });
    }
    socket.userId = userId;

    this.io.emit("USER_STATUS_UPDATE", { id: socket.userId, status: "online" });
    socket.on("disconnect", () => {
      console.log("[ws] user disconnected");
      for (let room in socket.rooms) {
        socket.leave(room);
      }
      setTimeout(async () => {
        // the user maybe is just changing/reloading the page, wait to make sure they completely disconnected
        const stillOnline = await getSocketIdByUserId(this, socket.userId);
        if (!stillOnline)
          this.io.emit("USER_STATUS_UPDATE", {
            id: socket.userId,
            status: "offline",
          });
      }, 1000);
    });
    res({ code: 200, data: userId });
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

      // if user is online, force add this room to their rooms list.
      const recipientSocketId = await getSocketIdByUserId(
        this,
        thread.participants.find((p) => p.id != userId).id,
      );
      if (recipientSocketId)
        this.io.to(recipientSocketId).emit("FORCE_ROOM_UPDATE", thread._id);
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
    const status = (await getSocketIdByUserId(this, id)) ? "online" : "offline";
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

    // someone blocked someone else, no one can send a message
    if (thread.participants.find((p) => p.status == "blocked"))
      return res({ code: 401, message: "Unauthorized" });
    // sender is still "pending", they can't send until they accept
    if (
      thread.participants.find((p) => p.id == userId && p.status == "pending")
    )
      return res({ code: 401, message: "Unauthorized" });

    let newMessage = {
      authorId: userId,
      content: data.content.substring(0, 2048),
      postRef: null,
      status: "sent",
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
      let recipientSocketId = await getSocketIdByUserId(this, recipient);
      let isInSameRoom = recipientSocketId
        ? await isUserInRoom(this, thread._id.toString(), recipientSocketId)
        : false;

      if (!recipientSocketId || (recipientSocketId && !isInSameRoom)) {
        // equivalent to (!online || (online && !inSameRoom))

        const updates = {
          $inc: { "participants.$[userToUpdate].newMessages": 1 },
        };

        // set status to "accepted", if it was "archived".
        if (
          thread.participants.find(
            (p) => p.id == recipient && p.status == "archived",
          )
        )
          updates.$set = { "participants.$[userToUpdate].status": "accepted" };

        const [updateThreadErr, updateThread] = await this.to(
          Thread.findByIdAndUpdate(thread._id, updates, {
            arrayFilters: [{ "userToUpdate.id": recipient }],
          }),
        );

        // send message web notification
        if (recipientSocketId && !isInSameRoom) {
          // equivalent to (online && !inSameRoom))
          this.io
            .to(recipientSocketId)
            .emit("NEW_MESSAGE_NOTIFICATION", message);

            // if the status was "archived", then force room update because it's now "accepted"
            if (
              thread.participants.find(
                (p) => p.id == recipient && p.status == "archived",
              )
            )
            this.io.to(recipientSocketId).emit("FORCE_ROOM_UPDATE", thread._id);
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
        { status: "edited", content: data.newContent.substring(0, 2048) },
        { new: true },
      ),
    );
    if (messageEditedErr || !messageEdited) return;
    this.io.to(messageEdited.threadId).emit("MESSAGE_EDITED", messageEdited);
  });

  socket.on("BLOCK_THREAD", async (data, res) => {
    userId = socket.userId;
    if (!userId) return; //user did not IDENTIFY
    var [blockThreadErr, blockThread] = await this.to(
      Thread.findByIdAndUpdate(
        data,
        {
          $set: {
            "participants.$[userToUpdate].status": "blocked",
          },
        },
        { arrayFilters: [{ "userToUpdate.id": userId }] },
      ),
    );
    if (blockThreadErr || !blockThread)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, message: "Success" });
    const recipientSocketId = await getSocketIdByUserId(
      this,
      blockThread.participants.find((p) => p.id != userId).id,
    );
    if (recipientSocketId)
      this.io.to(recipientSocketId).emit("FORCE_ROOM_UPDATE", data);
  });

  socket.on("ARCHIVE_THREAD", async (data, res) => {
    userId = socket.userId;
    if (!userId) return; //user did not IDENTIFY
    var [blockThreadErr, blockThread] = await this.to(
      Thread.findByIdAndUpdate(
        data,
        {
          $set: {
            "participants.$[userToUpdate].status": "archived",
          },
        },
        { arrayFilters: [{ "userToUpdate.id": userId }] },
      ),
    );
    if (blockThreadErr || !blockThread)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, message: "Success" });
    const recipientSocketId = await getSocketIdByUserId(
      this,
      blockThread.participants.find((p) => p.id != userId).id,
    );
    if (recipientSocketId)
      this.io.to(recipientSocketId).emit("FORCE_ROOM_UPDATE", data);
  });

  // used for unblock, accept, and unarchive (because it sets status to "accepted")
  socket.on("UNBLOCK_THREAD", async (data, res) => {
    userId = socket.userId;
    if (!userId) return; //user did not IDENTIFY
    var [unblockThreadErr, unblockThread] = await this.to(
      Thread.findByIdAndUpdate(
        data,
        {
          $set: {
            "participants.$[userToUpdate].status": "accepted",
          },
        },
        { arrayFilters: [{ "userToUpdate.id": userId }] },
      ),
    );
    if (unblockThreadErr || !unblockThread)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, message: "Success" });
    const recipientSocketId = await getSocketIdByUserId(
      this,
      unblockThread.participants.find((p) => p.id != userId).id,
    );
    if (recipientSocketId)
      this.io.to(recipientSocketId).emit("FORCE_ROOM_UPDATE", data);
  });
}

// usefull to send notifications outside socket context, or get online status
function getSocketIdByUserId(app, userId) {
  return new Promise((resolve) => {
    app.io
      .of("/")
      .adapter.customRequest(
        { type: "getSocketIdByUserId", userId: userId },
        (err, replies) => {
          // replies is an array of element pushed by cb(element) on individual socket.io server
          // remove empty replies
          const filtered = replies.filter((reply) => reply != null);
          resolve(filtered[0]);
        },
      );
  });
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
    io.use(cookieParser());
    // customHook, to run a request on every node
    // every socket.io server executes below code, when customRequest is called
    io.of("/").adapter.customHook = (request, cb) => {
      if (request.type == "getSocketIdByUserId") {
        let userSocket =
          Object.values(io.of("/").connected).find(
            (socket) => socket.userId == request.userId,
          ) || null;
        cb(userSocket ? userSocket.id : null);
      }
      // add more request types if you need something that runs on all nodes
      cb();
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = fp(fastifySocketIo);
