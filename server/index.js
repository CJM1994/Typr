const { createServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const websocket = require('./utils/websocket');
const app = require('./server');
const PORT = process.env.PORT || 3001;

// SocketIO
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
  },
});

websocket(io);

httpServer.listen(PORT, () => {
  console.log(`http server listening on port ${PORT}`);
});