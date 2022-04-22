import React from 'react';
import './Multiplayer.scss'
import Prompt from './Prompt';
import '../Main/Button.scss'
import VSDisplay from './VSDisplay';
import { useEffect, useState, useRef } from "react";

// Websocket functions
const { io } = require("socket.io-client");
const { joinMatch, sendGameProgress, sendMessage } = require('./api')

export default function Multiplayer() {

  const [serverPrompt, setServerPrompt] = useState('');

  const [serverGameState, setServerGameState] = useState({
    player1: {},
    player2: {},
  });

  const NEW_PROMPT_EVENT = "newPrompt";
  const NEW_GAME_STATE_EVENT = 'newGameState';
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on(NEW_PROMPT_EVENT, (prompt) => {
      setServerPrompt(prompt.codeBlock.split('\n'));
    });

    socketRef.current.on(NEW_GAME_STATE_EVENT, (gameState) => {
      
      setServerGameState({
        player1: Object.values(gameState)[0],
        player2: Object.values(gameState)[1],
      });

    });

  }, []);

  // TEST VARIABLES
  const player1 = {
    connected: true,
    progress: 50,
  }

  return (
    <div>
      <VSDisplay gameState={serverGameState}/>
      <button onClick={() => joinMatch(socketRef.current)}>
        Join Default Server
      </button>
      <Prompt
        onComplete={() => sendMessage(socketRef.current, 'Prompt Complete')}
        serverPrompt={serverPrompt}
        onProgress={(counter, errors) => sendGameProgress(socketRef.current, counter, errors)}
      />
    </div>
  )

};

// What to do for mp functionality
// Make game room for new connections
// When 2 players connected send prompt to players (Hardcode for now)
// When a player finishes their prompt send complete back to Server
// When all players send complete to server, server sends back game result