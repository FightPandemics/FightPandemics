const fp = require("fastify-plugin");
const { fn } = require("moment");
const SocketIO = require("socket.io");
const redisAdapter = require("socket.io-redis");

function onSocketConnect(socket) {
  console.log("[ws] user connected");

  socket.on("IDENTIFY", async (data, res) => {
    const [userErr, user] = await this.to(
      this.mongo.model("User").findById(data.id),
    );
    if (userErr) {
      return res({ code: 500, message: "Internal server error" });
    } else if (user === null) {
      return res({ code: 404, message: "User not found" });
    }
    socket.userId = data.id;

    this.io.emit("USER_STATUS_UPDATE", {id: socket.userId, status: "online"})
    socket.on("disconnect", () => {
      console.log("[ws] user disconnected");
      for (let room in socket.rooms) {
        socket.leave(room);
      }
      setTimeout(() => { // the user maybe is just changing/reloading the page, wait to make sure they completely disconnected
        const stillOnline = getSocketByUserId(this, socket.userId);
        if (!stillOnline) this.io.emit("USER_STATUS_UPDATE", {id: socket.userId, status: "offline"})
      }, 1000);
    });
    res({ code: 200, message: "Success" });
  });

  socket.on("JOIN_ROOM", async (data, res) => {
    const Thread = this.mongo.model("Thread");
    const User = this.mongo.model("User");
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const roomId = getUniqueRoomId([{ id: data.receiverId }, { id: userId }]);
    let userInRoom = await isUserInRoom(this, roomId, socket.id);
    var [threadErr, thread] = await this.to(
      Thread.findOne({
        $and: [
          { "participants.id": userId },
          { "participants.id": data.receiverId },
        ],
      }),
    );
    if (threadErr) return res({ code: 500, message: "Internal server error" });
    if (!thread) {
      const [senderErr, sender] = await this.to(User.findById(userId));
      const [receiverErr, receiver] = await this.to(
        User.findById(data.receiverId),
      );
      if (senderErr || receiverErr)
        return res({ code: 500, message: "Internal server error" });
      if (!sender || !receiver)
        return res({ code: 404, message: "User not found" });
      let newThread = { participants: [], status: "pending" };
      [sender, receiver].forEach((participant) => {
        newThread.participants.push({
          id: participant._id,
          lastAccess: participant == sender ? new Date() : null,
          name: participant.name,
          newMessages: participant == receiver ? true : false,
          photo: participant.photo,
          type: participant.type,
        });
      });

      [threadErr, thread] = await this.to(new Thread(newThread).save());
      if (threadErr)
        return res({ code: 500, message: "Internal server error" });
    }

    // update participant.lastAccess, and mark messages as read.
    [updateThreadErr, thread] = await this.to(
      Thread.findOneAndUpdate(
        { _id: thread._id, "participants.id": userId },
        {
          $set: {
            "participants.$.lastAccess": new Date(),
            "participants.$.newMessages": false,
          },
        },
        { new: true },
      ),
    );
    let threadWithLastMessage = thread.toObject();
    const [lastMessageErr, lastMessage] = await this.to(
      this.mongo
        .model("Message")
        .findOne({ threadId: thread._id })
        .sort({ updatedAt: -1 }),
    );
    if (lastMessage) threadWithLastMessage.lastMessage = lastMessage;

    if (!userInRoom) {
      // unser not already in that room
      // leave any other room
      for (let room in socket.rooms) {
        await socket.leave(room);
      }
      socket.join(roomId);
    }
    res({ code: 200, data: threadWithLastMessage });
  });

  socket.on("GET_USER_THREADS", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const [threadsErr, threads] = await this.to(
      this.mongo
        .model("Thread")
        .find({ "participants.id": userId })
        .sort({ updatedAt: 1 }),
    );
    if (threadsErr) return res({ code: 500, message: "Internal server error" });

    const threadsRich = []; // Rich because will have lastMessage, topic (in the futur)
    for (let i = 0; i < threads.length; i++) {
      const thread = threads[i].toObject();
      const [lastMessageErr, lastMessage] = await this.to(
        this.mongo
          .model("Message")
          .findOne({ threadId: thread._id })
          .sort({ createdAt: -1 }),
      );
      if (lastMessage) thread.lastMessage = lastMessage;
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
    let userInRoom = await isUserInRoom(
      this,
      getUniqueRoomId([{ id: data.receiverId }, { id: userId }]),
      socket.id,
    );
    if (!userInRoom) return res({ code: 401, message: "Unauthorized" });
    const Thread = this.mongo.model("Thread");
    var [threadErr, thread] = await this.to(
      Thread.findOne({
        $and: [
          { "participants.id": userId },
          { "participants.id": data.receiverId },
        ],
      }),
    );
    if (threadErr) return res({ code: 500, message: "Internal server error" });
    if (!thread) return res({ code: 404, message: "Thread not found" }); // user didn't join room, or sending bad receiverId

    const [messagesErr, messages] = await this.to(
      this.mongo
        .model("Message")
        .find({ threadId: thread._id })
        .limit(20)
        .sort({ createdAt: -1 }),
    );

    if (messagesErr)
      return res({ code: 500, message: "Internal server error" });
    res({ code: 200, data: messages });
  });

  socket.on("SEND_MESSAGE", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const roomId = getUniqueRoomId([{ id: data.receiverId }, { id: userId }]);
    let userInRoom = await isUserInRoom(this, roomId, socket.id);
    if (!userInRoom) return res({ code: 401, message: "Unauthorized" });
    const Thread = this.mongo.model("Thread");
    var [threadErr, thread] = await this.to(
      //shouldn't be doing this, will change for prod.
      Thread.findOne({
        $and: [
          { "participants.id": userId },
          { "participants.id": data.receiverId },
        ],
      }),
    );
    if (threadErr) return res({ code: 500, message: "Internal server error" });

    // add unread mark to receiver
    const [updateThreadErr, updateThread] = await this.to(
      Thread.findOneAndUpdate(
        { _id: thread._id, "participants.id": data.receiverId },
        { $set: { "participants.$.newMessages": true } },
      ),
    );
    let newMessage = {
      authorId: userId,
      content: data.content.substring(0, 2048),
      postRef: null,
      status: "sent", // later
      threadId: thread._id,
    };

    // add postRef
    if (data.postId) {
      const Post = this.mongo.model("Post");
      var [postErr, post] = await this.to(
        //shouldn't be doing this, will change for prod.
        Post.findOne({_id: data.postId}),
      );
      if (threadErr) return res({ code: 500, message: "Internal server error" });
      console.log(post)
      if (post) newMessage.postRef = {
        content: post.content,
        id: post._id,
        objective: post.objective,
        title: post.title,
        createdAt: post.createdAt,
      }
    }

    [messageErr, message] = await this.to(
      this.mongo.model("Message")(newMessage).save(),
    );
    if (messageErr) return res({ code: 500, message: "Internal server error" });
    this.io.to(roomId).emit("NEW_MESSAGE", message);
    res({ code: 200, message: "Success" });
  });
}

function getSocketByUserId(app, userId) { // usefull to send notifications outside socket context, or get online status
  return (
    Object.values(app.io.of("/").connected).find(
      (socket) => socket.userId == userId,
    ) || null
  );
}

function isUserInRoom(app, uniqueRoomId, socketId) {
  return new Promise((resolve) => {
    app.io.of("/").adapter.clientRooms(socketId, (err, rooms) => {
      if (err) return resolve(false);
      if (!rooms.includes(uniqueRoomId)) return resolve(false);
      else resolve(true);
    });
  });
}

// this is different from thread._id, this is not stored in db
// this only used to differentiate socket.io rooms, not actual threads.
function getUniqueRoomId(participants) {
  return participants
    .map((p) => p.id.toString().substring(0, 8))
    .sort()
    .join("-");
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
