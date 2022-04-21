const createIO = (io) => {
  const playersArray = [];

  io.on("connection", (socket) => {

    socket.on("joinMatch", async (arg) => {
      console.log(`${socket.id} joined room1`);
      socket.join("room1");

      playersArray.push(socket.id);

      if (playersArray.length >= 2) {
        const promptSchema = require("../models/prompt");
        await promptSchema.find({ language: "Javascript" }).then((prompt) => {
          console.log(prompt);
          let i = Math.floor(Math.random(prompt.length) * 10);
          console.log("i", i);
          io.to('room1').emit("newPrompt", prompt[i]);
        });
      };
    });


  });
};

module.exports = createIO;
