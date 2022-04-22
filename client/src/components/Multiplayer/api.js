const joinMatch = (socket) => {
  socket.emit('joinMatch');
}

const sendGameProgress = (socket, counter, errors) => {
  socket.emit('gameProgress', counter, errors);
}

const sendMessage = (socket, message) => {
  socket.emit('sendMessage', message);
}

module.exports = {joinMatch, sendGameProgress, sendMessage}