const createIO = (io) => {
  const players = {};
  let promptLength = 0;

  io.on("connection", (socket) => {

    // pass rooms as parameters
    // join room button separate from ready button (disable until enough players)

    socket.on("joinMatch", async (roomName = 'room1') => {
      // join room logic
      console.log(`${socket.id} joined room1`);
      socket.join(roomName); // broadcast how many players in the gameroom to each player

      players[socket.id] = {
        position: 0,
        progress: 0,
        speed: 0,
        errors: 0,
        counter: 0,
        roomName,
      };
      
      // ready to start match button, refactor into function
      if (Object.keys(players).length >= 2) {
        const promptSchema = require("../models/prompt");
        await promptSchema.find({ language: "Javascript" }).then((prompt) => {
          console.log(prompt);
          let i = Math.floor(Math.random(prompt.length - 1) * 10);
          console.log("i", i);
          io.to(roomName).emit("newPrompt", prompt[i]);
          promptLength = prompt[i].codeBlock.length + 1;
          console.log('promptlength', promptLength);
        });
      };
    });

    socket.on('gameProgress', (counter, errors) => {

      players[socket.id].counter = counter;
      players[socket.id].errors = errors;
      players[socket.id].progress = counter / promptLength;
      
      for (const key in players) {
        console.log(key, 'correct: ', players[key].counter, 'errors: ', players[key].errors, 'progress: ', players[key].progress);
      };

    });

    socket.on('sendMessage', (message) => {
      console.log('sendMessage', message);
      io.to(players[socket.id].roomName).emit('newPrompt', {codeBlock: 'console.log()'});
    });

  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
