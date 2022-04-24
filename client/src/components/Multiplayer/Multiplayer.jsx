import React, { useEffect,useContext, useState, useRef } from "react";
import Prompt from './Prompt';

import './Multiplayer.scss';
import '../Main/Button.scss';
import { UserContext } from "../App";
import VSDisplay from './VSDisplay';
import ServerSelect from './ServerSelect';

// Websocket functions
const { io } = require("socket.io-client");
const { joinMatch, sendGameProgress, promptComplete } = require('./api');

export default function Multiplayer() {
  const { userProps } = useContext(UserContext);

  // Boolean if game is in progress or not, is user waiting?
  const [wait, setWait] = useState(true);

  // Holds messages from the server to display on screen
  const [serverMessage, setServerMessage] = useState('');

  // Holds current typing prompt sent from server
  const [serverPrompt, setServerPrompt] = useState("");

  // Holds information about each player in current match
  const [serverGameState, setServerGameState] = useState({
    player1: {},
    player2: {},
    player3: {},
    player4: {},
  });

  const NEW_PROMPT_EVENT = "newPrompt";
  const NEW_USER_JOINED = "newUser";
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
    setServerMessage(message);
    messageTimeout = setTimeout(() => {
      setServerMessage('');
    }, timeout);
  };

  useEffect(() => {
    
    socketRef.current = io({auth:{ user_id: userProps?.user?.nickname || null}});

    socketRef.current.on(SERVER_MESSAGE_EVENT, (message) => {
      addMessageTimeout(message, 3000);
    });

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
        player3: Object.values(gameState)[2],
        player4: Object.values(gameState)[3],
      });
    });

    socketRef.current.on(NEW_USER_JOINED, (userInfo) => {

      setServerGameState((prev) => {

        if (userInfo.player_pos === 1) {
          prev.player1 = { ...prev.player1, user_id: userInfo.user_id };
        } 
        else if (userInfo.player_pos === 2) {
          prev.player2 = { ...prev.player2, user_id: userInfo.user_id };
        }
        else if(userInfo.player_pos === 3){
          prev.player3 = {...prev.player3, user_id: userInfo.user_id}
        }
        else if (userInfo.player_pos === 4) {
          prev.player4 = { ...prev.player4, user_id: userInfo.user_id };
        }
    

        return ({
          ...prev
        }
        );
      });
    });

    socketRef.current.on(MATCH_END_EVENT, () => {
      setWait(true);
      setServerPrompt(``);
    });

  }, []);

  return (

    <div className="multiplayer">
      {/* Game Select */}
      {wait === true &&
        <>
          <ServerSelect />
          <button className="button button--highlighted" onClick={() => joinMatch(socketRef.current)}>
            Join Default Server
          </button>
          <p>{serverMessage}</p>
        </>
      }

      {/* Game Screen */}
      {wait === false && <>
        <VSDisplay gameState={serverGameState} />
        <Prompt
          onComplete={() => promptComplete(socketRef.current)}
          serverPrompt={serverPrompt}
          onProgress={(counter, errors) => sendGameProgress(socketRef.current, counter, errors)}
        />
      </>}
    </div>
  );
};

// What to do for mp functionality
//
// Stop people from joining a full lobby
// When 2 players connected send prompt to players (Hardcode for now)
// send back who won when someone finishes