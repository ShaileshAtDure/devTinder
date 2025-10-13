const socket = require("socket.io");
const crypto = require("crypto");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    // Handle events here

    socket.on("joinChat", ({ userId, targetUserId }) => {
      // const roomId = [userId, targetUserId].sort().join("_"); //uniqueId
      const roomId = getSecretRoomId(userId, targetUserId); // unique encryptedId

      console.log(firstName + "joined Room : " + roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      // const roomId = [userId, targetUserId].sort().join("_");
      const roomId = getSecretRoomId(userId, targetUserId); // unique encryptedId

      console.log(firstName + " " + text);
      io.to(roomId).emit("messageReceived", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
