const sendMessage = (socket, message) => {
  socket.emit('newClientMessage', message);
};

module.exports = sendMessage;