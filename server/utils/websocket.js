const createIO = (io) => {
  const playersArray = [];

  io.on("connection", (socket) => {
    console.log(`connection created for user ${socket.id}`);
    socket.emit("newServerMessage", { body: "test server message" });

    socket.on("newClientMessage", (arg) => {
      console.log(`user ${socket.id} replied with ${arg}`);
    });

    socket.on("joinMatch", async (arg) => {
      playersArray.push(socket.id);
      console.log(`${socket.id} joined match: `, playersArray);

      if (playersArray.length >= 2) {
        const promptSchema = require("../models/prompt");
        await promptSchema.find({ language: "Javascript" }).then((prompt) => {
          console.log(prompt);
          socket.emit('newPrompt', prompt);
        });
      }
    });
  });
};

module.exports = createIO;