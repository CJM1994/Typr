const sendMessage = (socket, message) => {
  socket.emit('newClientMessage', message);
};

const updateProgress = (socket, percentComplete) => {
  socket.emit('progressUpdate', percentComplete);
}

module.exports = {sendMessage, updateProgress}