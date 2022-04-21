const sendMessage = (socket, message) => {
  socket.emit('newClientMessage', message);
};

const joinMatch = (socket, percentComplete) => {
  socket.emit('joinMatch', percentComplete);
}

module.exports = {sendMessage, joinMatch}