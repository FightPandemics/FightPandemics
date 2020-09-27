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
    socket.on("disconnect", () => {
      console.log("[ws] user connected");
      for (let room in socket.rooms) {
        socket.leave(room);
      }
    });
    res({ code: 200, message: "Success" });
  });

  socket.on("JOIN_ROOM", async (data, res) => {
    const Thread = this.mongo.model("Thread");
    const User = this.mongo.model("User");
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
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
      const [senderErr, sender] = await this.to(
        User.findById(userId),
      );
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

      [threadErr, thread] = await this.to(
        new Thread(newThread).save(),
      );
      if (threadErr)
        return res({ code: 500, message: "Internal server error" });
    }
    // leave any other room
    for (let room in socket.rooms) {
      socket.leave(room);
    }
    socket.join(getUniqueRoomId(thread.participants));
    res({ code: 200, data: thread });
  });

  socket.on("GET_USER_THREADS", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const [threadsErr, threads] = await this.to(
      this.mongo.model("Thread").find({ "participants.id": userId }),
    );
    if (threadsErr) return res({code: 500, message: 'Internal server error'});
    res({code:200, data: threads});
  });

  socket.on("GET_CHAT_LOG", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    let userInRoom = await isUserInRoom(this, getUniqueRoomId([{id: data.receiverId}, {id: userId}]), socket.id)
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
    if (threadErr) return res({code: 500, message: 'Internal server error'});
    if (!thread) return res({ code: 404, message: "Thread not found" }); // user didn't join room, or sending bad receiverId

    const [messagesErr, messages] = await this.to(
      this.mongo.model("Message").find({ threadId: thread._id }).limit(20).sort({createdAt: 1}),
    );
    
    if (messagesErr) return res({code: 500, message: 'Internal server error'});
    res({code:200, data: messages});
  });
  
  socket.on("SEND_MESSAGE", async (data, res) => {
    userId = socket.userId;
    if (!userId) return res({ code: 401, message: "Unauthorized" }); //user did not IDENTIFY
    const roomId = getUniqueRoomId([{id: data.receiverId}, {id: userId}])
    let userInRoom = await isUserInRoom(this, roomId, socket.id)
    if (!userInRoom) return res({ code: 401, message: "Unauthorized" });
    const Thread = this.mongo.model("Thread");
    var [threadErr, thread] = await this.to( //shouldn't be doing this, will change for prod.
      Thread.findOne({
          $and: [
            { "participants.id": userId },
            { "participants.id": data.receiverId },
          ],
        }),
    );
    if (threadErr) return res({ code: 500, message: "Internal server error" });
    let newMessage = {
        authorId: userId,
        content: data.content.substring(0,2000),
        postRef: null, // later
        status: "sent", // later
        threadId: thread._id
    };
    [messageErr, message] = await this.to(
      this.mongo.model("Message")(newMessage).save(),
    );
    if (messageErr)
      return res({ code: 500, message: "Internal server error" });
    this.io.to(roomId).emit("NEW_MESSAGE", message);
    res({ code: 200, message: "Success" })
  });
}

function getSocketByUserId(app, socketId) {
  return app.io.sockets.sockets[socketId.id];
}
function isUserInRoom(app, uniqueRoomId, socketId) {
  return new Promise((resolve)=>{
    app.io.of('/').adapter.clientRooms(socketId, (err, rooms) => {
      if (err)return resolve(false)
      if (!rooms.includes(uniqueRoomId)) return resolve(false);
      else resolve(true);
    })
  }) 
}
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
