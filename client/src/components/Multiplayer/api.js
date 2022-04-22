const joinMatch = (socket) => {
  socket.emit('joinMatch');
}

const sendGameProgress = (socket, counter, errors) => {
  socket.emit('gameProgress', counter, errors);
}

const promptComplete = (socket) => {
  socket.emit('promptComplete');
}

module.exports = {joinMatch, sendGameProgress, promptComplete}