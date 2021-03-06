const createIO = (io) => {
  const players = {};
  const gameStates = {};
  let promptLength = 0;
  let winner = "";

  io.on("connection", (socket) => {
    // Creates a room if it doesn't exist and add client to the room with blank data
    socket.on("joinMatch", async (roomName, userProps) => {
      if (!gameStates[roomName]) {
        gameStates[roomName] = {};
      };

      // Stop players from joining full rooms here
      numberOfPlayersInRoom = Object.keys(gameStates[roomName]).length;
      if (numberOfPlayersInRoom >= 4) {
        io.sockets.sockets
          .get(socket.id)
          .emit(
            "serverMessage",
            "This server is currently full, please try another!"
          );
      } else {
        socket.join(roomName);
        io.sockets.sockets
          .get(socket.id)
          .emit(
            "serverMessage",
            `Joined: ${roomName}, please wait until server is full`
          );
      };

      players[socket.id] = {
        nickname: userProps?.user?.nickname || 'guest',
        position: 0,
        progress: 0,
        speed: 0,
        errors: 0,
        counter: 0,
        roomName,
      }; 

      gameStates[roomName][socket.id] = {nickname: players[socket.id].nickname};
      numberOfPlayersInRoom = Object.keys(gameStates[roomName]).length;

      io.to(players[socket.id].roomName).emit("newGameState", gameStates[players[socket.id].roomName]);
      
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
    socket.on("gameProgress", (counter, errors) => {
      const usersRoom = players[socket.id].roomName;

      players[socket.id].counter = counter;
      players[socket.id].errors = errors;
      players[socket.id].progress = counter / promptLength;

      let position = 1;
      let counters = [];
      for (const key in players) {
        counters.push(players[key].counter);
        // if (players[key].counter > players[socket.id].counter) {
        //   position++;
        // };
        // players[socket.id].position = position;
      };

      counters = counters.sort().reverse();

      for (const key in players) {
        players[key].position = counters.indexOf(players[key].counter) + 1;
      }

      for (const key in players) {
        gameStates[usersRoom][key] = players[key];
      };

      io.to(usersRoom).emit("newGameState", gameStates[usersRoom]); // send game state back here
    });

    // Reset everything in a room when a prompt is finished, kick clients
    socket.on("promptComplete", () => {
      const usersRoom = players[socket.id].roomName;
      let counterMax = 0;

      for(let player in gameStates[usersRoom]){
        if(gameStates[usersRoom][player].counter > counterMax) {
          counterMax = gameStates[usersRoom][player].counter;
          winner = gameStates[usersRoom][player].nickname;
        }
      }

      gameStates[usersRoom] = {};

      io.to(usersRoom).emit("matchOver", winner);
      io.in(usersRoom).socketsLeave(usersRoom);
    });
  });
};

module.exports = createIO;

// for the game track
// position, progress, speed, errors
