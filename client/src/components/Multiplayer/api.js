const joinMatch = (socket, server, userProps) => {
  if (socket) {
    socket.emit("joinMatch", server, userProps);
  };
};

const sendGameProgress = (socket, counter, errors) => {
  socket.emit("gameProgress", counter, errors);
};

const promptComplete = (socket) => {
  socket.emit("promptComplete");
};

module.exports = { joinMatch, sendGameProgress, promptComplete };
