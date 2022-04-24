const createIO = (io) => {
  const players = {};
  const gameStates = {};
  let promptLength = 0;

  io.on("connection", (socket) => {
    // Creates a room if it doesn't exist and add client to the room with blank data
    socket.on("joinMatch", async (roomName = 'default') => {
      

      if (!gameStates[roomName]) {
        gameStates[roomName] = {};
      };

      // Stop players from joining full rooms here
      numberOfPlayersInRoom = Object.keys(gameStates[roomName]).length;
      if (numberOfPlayersInRoom >= 4) {
        io.sockets.sockets.get(socket.id).emit('serverMessage', 'This server is currently full, please try another!');
      } else {
        socket.join(roomName);
        io.sockets.sockets.get(socket.id).emit('serverMessage', `Joined: ${roomName}, please wait until server is full`);
        io.to(roomName).emit('newUser', {user_id: socket.handshake.auth.user_id || socket.id, player_pos: numberOfPlayersInRoom + 1});
      };

      gameStates[roomName][socket.id] = {};
      numberOfPlayersInRoom = Object.keys(gameStates[roomName]).length;

      players[socket.id] = {
        user_id: socket.handshake.auth.user_id || socket.id,
        position: 0,
        progress: 0,
        speed: 0,
        errors: 0,
        counter: 0,
        roomName,
      };
      
      // Serve a prompt to a server when a room is full and ready
      if (numberOfPlayersInRoom === 4) {
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

      let position = 1;
      for (const key in players) {
        if (players[key].counter > players[socket.id].counter) {
          position++;
        }
        players[socket.id].position = position;
      }
      
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
