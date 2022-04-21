const createIO = (io) => {
  const playersArray = [];

  io.on("connection", (socket) => {

    socket.on("joinMatch", async () => {
      console.log(`${socket.id} joined room1`);
      socket.join("room1");

      if(!playersArray.includes(socket.id)) {
        playersArray.push(socket.id);
      }
      
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

    socket.on('gameProgress', (counter, errors) => {
      
      for (const player of playersArray) {
        console.log(player, 'correct: ', counter, 'errors', errors);
      }

    });

  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
