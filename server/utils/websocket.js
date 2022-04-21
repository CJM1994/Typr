const createIO = (io) => {
  const players = {};

  io.on("connection", (socket) => {

    socket.on("joinMatch", async () => {
      console.log(`${socket.id} joined room1`);
      socket.join("room1");

      players[socket.id] = {
        position: 0,
        progress: 0,
        speed: 0,
        errors: 0,
        counter: 0,
      }
      
      if (Object.keys(players).length >= 2) {
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

      players[socket.id].counter = counter;
      players[socket.id].errors = errors;
      
      for (const key in players) {
        console.log(key, 'correct: ', players[key].counter, 'errors', players[key].errors);
      };

    });

  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
