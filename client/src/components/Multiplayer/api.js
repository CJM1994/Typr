const joinMatch = (socket, percentComplete) => {
  socket.emit('joinMatch', percentComplete);
}

module.exports = {joinMatch}