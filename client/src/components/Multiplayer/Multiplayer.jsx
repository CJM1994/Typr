import React, { useEffect, useState, useRef, useContext } from "react";
import { SpinnerCircularFixed } from 'spinners-react';
import { UserContext } from "../App";

import './Multiplayer.scss'
import '../Main/Button.scss'

import VSDisplay from './VSDisplay';
import ServerSelect from './ServerSelect';
import useTimer from '../../hooks/useTimer';
import Servers from "./Servers";
import Prompt from './Prompt';
import Gameover from "./Gameover";

// Websocket functions
const { io } = require("socket.io-client");
const { joinMatch, sendGameProgress, promptComplete } = require('./api')

export default function Multiplayer() {
  // Timer
  const { time, running, toggleTimer, resetTimer } = useTimer();

  // User information
  const { userProps } = useContext(UserContext);

  const [mode, setMode] = useState("choosing");
  const [winner, setWinner] = useState("");

  // Holds messages from the server to display on screen
  const [serverMessage, setServerMessage] = useState('');

  // Holds current typing prompt sent from server
  const [serverPrompt, setServerPrompt] = useState('');

  // Holds current prompt language sent from server
  const [promptLanguage, setPromptLanguage] = useState('...');

  // Holds current prompt language sent from server
  const [promptCategory, setPromptCategory] = useState('...');

  // Holds information about each player in current match
  const [serverGameState, setServerGameState] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {},
  });

  const NEW_PROMPT_EVENT = "newPrompt";
  const NEW_GAME_STATE_EVENT = 'newGameState';
  const MATCH_END_EVENT = "matchOver";
  const SERVER_MESSAGE_EVENT = 'serverMessage';
  const socketRef = useRef();
  let messageTimeout = null;

  // Use this function to display message with a timeout
  const addMessageTimeout = (message, timeout) => {
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    };
    setServerMessage(message)
    messageTimeout = setTimeout(() => {
      if (message.includes("another")) {
        setMode("choosing");
      }

      if (message.includes("wait until server is full")) {
        setServerMessage("Waiting for players...");
      } else {
        setServerMessage('');
      }
    }, timeout)
  };

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on(SERVER_MESSAGE_EVENT, (message) => {
      addMessageTimeout(message, 5000);
    });

    // Trigger when lobby is full, new prompt sent
    socketRef.current.on(NEW_PROMPT_EVENT, (prompt) => {
      setServerPrompt(prompt.codeBlock.split('\n'));
      setMode("game");
      setPromptLanguage(prompt.language);
      setPromptCategory(prompt.category);
    });

    // Trigger on user progress in match
    socketRef.current.on(NEW_GAME_STATE_EVENT, (gameState) => {
      console.log(gameState);
      setServerGameState({
        player1: Object.values(gameState)[0],
        player2: Object.values(gameState)[1],
        player3: Object.values(gameState)[2],
        player4: Object.values(gameState)[3],
      });
    });

    socketRef.current.on(MATCH_END_EVENT, (winner) => {
      setWinner(winner);
      setMode("gameover");
      setServerMessage("");
      setServerPrompt(``);
      setServerGameState({
        player1: {},
        player2: {},
        player3: {},
        player4: {},
      });
      resetTimer();
    });

  }, []);

  const servers = [];

  for (let i = 1; i <= 10; i++) {
    servers.push({ value: i });
  }

  function joinServer(server) {
    joinMatch(socketRef.current, server, userProps);
    setMode("waiting");
  }

  return (
    <div className="multiplayer">
      <VSDisplay
        gameState={serverGameState}
        time={mode === "choosing" ? 0 : time}
        language={promptLanguage}
        category={promptCategory}
      />

      {mode === "choosing" && <>
        <Servers servers={servers} joinServer={(server) => joinServer(server)} />
      </>}

      {mode === "waiting" && <>
        <div className="mp-codeContainer mp-codecontainer--display">
          <div className="codeSideline" />
          <div className="code" />
          <div className="overlay">
            <SpinnerCircularFixed
              size={100}
              thickness={100}
              speed={100}
              color="#7A7A7A"
              secondaryColor="rgba(0, 0, 0, 0.44)"
            />
            <span className="indicator indicator--mp">{serverMessage}</span>
          </div>
        </div>
      </>}

      {/* Game Screen */}
      {mode === "game" && <>
        <Prompt
          onComplete={() => promptComplete(socketRef.current)}
          serverPrompt={serverPrompt}
          onProgress={(counter, errors) => sendGameProgress(socketRef.current, counter, errors)}
          running={running}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
        />
      </>}

      {mode === "gameover" && <Gameover winner={winner} setMode={setMode} />}
    </div>
  )
};
