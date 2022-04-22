const createIO = (io) => {
  const players = {};
  const gameStates = {};
  let promptLength = 0;

  io.on("connection", (socket) => {

    // Creates a room if it doesn't exist and add client to the room with blank data
    socket.on("joinMatch", async (roomName = 'default') => {
      socket.join(roomName);

      if (!gameStates[roomName]) {
        gameStates[roomName] = {};
      };

      gameStates[roomName][socket.id] = {};
      numberOfPlayersInRoom = Object.keys(gameStates[roomName]).length;

      players[socket.id] = {
        position: 0,
        progress: 0,
        speed: 0,
        errors: 0,
        counter: 0,
        roomName,
      };
      
      // Serve a prompt to a server when a room is full and ready
      if (numberOfPlayersInRoom === 2) {
        const promptSchema = require("../models/prompt");
        await promptSchema.find({ language: "Javascript" }).then((prompt) => {

          let i = Math.floor(Math.random() * prompt.length);

          io.to(roomName).emit("newPrompt", prompt[i]);
          promptLength = prompt[i].codeBlock.length + 1;
        });
      };
    });

    // Serve users up to date data on each clients progress in the prompt
    socket.on('gameProgress', (counter, errors) => {

      const usersRoom = players[socket.id].roomName;

      players[socket.id].counter = counter;
      players[socket.id].errors = errors;
      players[socket.id].progress = counter / promptLength;
      
      for (const key in players) {
        gameStates[usersRoom][key] = players[key];
      };

      io.to(usersRoom).emit('newGameState', gameStates[usersRoom]); // send game state back here

    });

    // Reset everything in a room when a prompt is finished, kick clients
    socket.on('promptComplete', () => {
      const usersRoom = players[socket.id].roomName;
      gameStates[usersRoom] = {};

      io.to(usersRoom).emit('matchOver');
      io.in(usersRoom).socketsLeave(usersRoom);
    });

  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
