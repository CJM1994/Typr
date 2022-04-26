import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../App';
import Prompt from './Prompt';
import Gameover from './Gameover';

import './Multiplayer.scss';
import '../Main/Button.scss';

import VSDisplay from './VSDisplay';
import ServerSelect from './ServerSelect';
import useTimer from '../../hooks/useTimer';

// Websocket functions
const { io } = require('socket.io-client');
const { joinMatch, sendGameProgress, promptComplete } = require('./api');

export default function Multiplayer() {
  // Timer
  const { time, running, toggleTimer, resetTimer } = useTimer();
  // User information
  const { userProps } = useContext(UserContext);

  // Boolean if game is in progress or not, is user waiting?
  const [wait, setWait] = useState('lobby');

  // Setting winning state
  const [winner, setWinner] = useState('');

  // Holds messages from the server to display on screen
  const [serverMessage, setServerMessage] = useState('');

  // Holds current typing prompt sent from server
  const [serverPrompt, setServerPrompt] = useState('');

  // Holds information about each player in current match
  const [serverGameState, setServerGameState] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {},
  });

  const NEW_PROMPT_EVENT = 'newPrompt';
  const NEW_GAME_STATE_EVENT = 'newGameState';
  const MATCH_END_EVENT = 'matchOver';
  const SERVER_MESSAGE_EVENT = 'serverMessage';
  const socketRef = useRef();
  let messageTimeout = null;

  // Use this function to display message with a timeout
  const addMessageTimeout = (message, timeout) => {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }
    setServerMessage(message);
    messageTimeout = setTimeout(() => {
      setServerMessage('');
    }, timeout);
  };

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on(SERVER_MESSAGE_EVENT, (message) => {
      addMessageTimeout(message, 3000);
    });

    // Trigger when lobby is full, new prompt sent
    socketRef.current.on(NEW_PROMPT_EVENT, (prompt) => {
      setServerPrompt(prompt.codeBlock.split('\n'));
      setWait('playing');
    });

    // Trigger on user progress in match
    socketRef.current.on(NEW_GAME_STATE_EVENT, (gameState) => {
      setServerGameState({
        player1: Object.values(gameState)[0],
        player2: Object.values(gameState)[1],
        player3: Object.values(gameState)[2],
        player4: Object.values(gameState)[3],
      });
    });

    socketRef.current.on(MATCH_END_EVENT, (winner) => {
      setWinner(winner);
      setWait('gameover');
      setServerPrompt(``);
      setServerGameState({
        player1: {},
        player2: {},
        player3: {},
        player4: {},
      });
    });
  }, []);

  return (
    <div className='multiplayer'>
      {/* Game Select */}
      {wait === 'lobby' && (
        <>
          {/* <Modal/> */}
          <ServerSelect />
          <button
            className='button button--highlighted'
            onClick={() => joinMatch(socketRef.current, userProps)}
          >
            Join Default Server
          </button>
          <p>{serverMessage}</p>
        </>
      )}

      {wait === 'gameover' && <Gameover winner={winner} setWait={setWait} />}
      {/* Game Screen */}
      {wait === 'playing' && (
        <>
          <VSDisplay gameState={serverGameState} time={time} />
          <Prompt
            onComplete={() => promptComplete(socketRef.current)}
            serverPrompt={serverPrompt}
            onProgress={(counter, errors) =>
              sendGameProgress(socketRef.current, counter, errors)
            }
            running={running}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
          />
        </>
      )}
    </div>
  );
}
