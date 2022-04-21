const joinMatch = (socket) => {
  socket.emit('joinMatch');
}

const sendGameProgress = (socket, counter, errors) => {
  socket.emit('gameProgress', counter, errors);
}

module.exports = {joinMatch, sendGameProgress}