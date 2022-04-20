import { useEffect, useRef } from "react";
const { io } = require("socket.io-client");

const NEW_SERVER_MESSAGE_EVENT = "newServerMessage";

export default function useSocket(gameID) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on(NEW_SERVER_MESSAGE_EVENT, (message) => {
      console.log(message);
    });

    socketRef.current.emit('newClientMessage', 'hello');

  });

  return socketRef.current;
};
