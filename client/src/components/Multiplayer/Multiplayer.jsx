import React from 'react';
import './Multiplayer.scss'
import Prompt from './Prompt';
import '../Main/Button.scss'
import VSDisplay from './VSDisplay';
import ServerSelect from './ServerSelect';
import { useEffect, useState, useRef } from "react";

// Websocket functions
const { io } = require("socket.io-client");
const { joinMatch, sendGameProgress, promptComplete } = require('./api')

export default function Multiplayer() {

  // Boolean if game is in progress or not, is user waiting?
  const [wait, setWait] = useState(true);

  // Holds the name of the room user is currently in
  const [roomName, setRoomName] = useState();

  // Holds current typing prompt sent from server
  const [serverPrompt, setServerPrompt] = useState('');

  // Holds information about each player in current match
  const [serverGameState, setServerGameState] = useState({
    player1: {},
    player2: {},
  });

  const NEW_PROMPT_EVENT = "newPrompt";
  const NEW_GAME_STATE_EVENT = 'newGameState';
  const MATCH_END_EVENT = "matchOver";
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io();

    // Trigger when lobby is full, new prompt sent
    socketRef.current.on(NEW_PROMPT_EVENT, (prompt) => {
      setServerPrompt(prompt.codeBlock.split('\n'));
      setWait(false);
    });

    // Trigger on user progress in match
    socketRef.current.on(NEW_GAME_STATE_EVENT, (gameState) => {
      setServerGameState({
        player1: Object.values(gameState)[0],
        player2: Object.values(gameState)[1],
      });
    });

    socketRef.current.on(MATCH_END_EVENT, () => {
      console.log('match is over');
      setWait(true);
      setServerPrompt('');
    })

  }, []);

  return (
    <div>
      {wait === true && <ServerSelect />}
      {wait === true &&
        <button onClick={() => joinMatch(socketRef.current)}>
          Join Default Server
        </button>
      }

      {wait === false && <>
        <VSDisplay gameState={serverGameState} />
        <Prompt
          onComplete={() => promptComplete(socketRef.current)}
          serverPrompt={serverPrompt}
          onProgress={(counter, errors) => sendGameProgress(socketRef.current, counter, errors)}
        />
      </>}
    </div>
  )

};

// What to do for mp functionality
// Make game room for new connections
// When 2 players connected send prompt to players (Hardcode for now)
// When a player finishes their prompt send complete back to Server
// When all players send complete to server, server sends back game result