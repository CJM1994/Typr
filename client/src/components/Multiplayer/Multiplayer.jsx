import React from 'react';
import './Multiplayer.scss'
import Prompt from './Prompt';
import VSDisplay from './VSDisplay';
import { useEffect, useState, useRef } from "react";

// Websocket functions
const { io } = require("socket.io-client");
const {sendMessage, joinMatch} = require('./api')

export default function Multiplayer() {

  const NEW_SERVER_MESSAGE_EVENT = "newServerMessage";
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on(NEW_SERVER_MESSAGE_EVENT, (message) => {
      console.log(message);
    });

  });

  // TEST VARIABLES
  const player1 = {
    connected: true,
    progress: 50,
  }

  const player2 = {
    connected: true,
    progress: 50,
  }

  return (
    <div>
      <VSDisplay player1={player1} player2={player2} />
      <Prompt
        onComplete={() => sendMessage(socketRef.current, 'Prompt Complete')}
        onJoin={(counter) => joinMatch(socketRef.current, counter)}
        />
    </div>
  )

};

// What to do for mp functionality
// Make game room for new connections
// When 2 players connected send prompt to players (Hardcode for now)
// When a player finishes their prompt send complete back to Server
// When all players send complete to server, server sends back game result