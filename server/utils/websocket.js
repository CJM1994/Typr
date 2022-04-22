const createIO = (io) => {
  const players = {};
  const gameStates = {};
  let promptLength = 0;

  io.on("connection", (socket) => {

    // pass rooms as parameters
    // join room button separate from ready button (disable until enough players)

    socket.on("joinMatch", async (roomName = 'default') => {
      // join room logic
      console.log(`${socket.id} joined room: ${roomName}`);
      socket.join(roomName); // broadcast how many players in the gameroom to each player

      if (!gameStates[roomName]) {
        gameStates[roomName] = {};
      };

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

          let i = Math.floor(Math.random() * prompt.length);

          io.to(roomName).emit("newPrompt", prompt[i]);
          promptLength = prompt[i].codeBlock.length + 1;

        });
      };
    });

    socket.on('gameProgress', (counter, errors) => {

      const usersRoom = players[socket.id].roomName;

      players[socket.id].counter = counter;
      players[socket.id].errors = errors;
      players[socket.id].progress = counter / promptLength;
      
      for (const key in players) {
        gameStates[usersRoom][key] = players[key];
      };

      console.log(gameStates);
      io.to(usersRoom).emit('newGameState', gameStates[usersRoom]); // send game state back here

    });

    socket.on('sendMessage', (message) => {
      console.log('sendMessage', message);
      io.to(players[socket.id].roomName).emit('newPrompt', {codeBlock: 'console.log()'});
      promptLength = 13;
    });

  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
