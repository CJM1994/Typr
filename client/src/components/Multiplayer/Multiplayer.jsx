import React from 'react';
import './Multiplayer.scss'
import useSocket from '../../hooks/useSocket';
import { useEffect, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";
import Lines from "../Main/Lines";

export default function Multiplayer() {

  const { prompt, input, lengths, fetchPrompt, resetInput, handleKeypress, setFocus, endInput } = useKeyPress();
  const { time, running, toggleTimer, resetTimer } = useTimer();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;

  const [stats, setStats] = useState({
    wordsPerMin: 0,
    accuracy: 0,
    score: 0
  });

  function newPrompt(language) {
    fetchPrompt(language); // sends get request for random prompt of a given language
                           // fetch this from websocket instead! just hardcode for now
    resetInput(); // returns input to original state (wrongindexes, counter, keys, etc)
    resetTimer(); // reset timer
    setStats({
      wordsPerMin: 0,
      accuracy: 0,
      score: 0
    });
  }

  useEffect(() => { 
    newPrompt('Javascript'); // Allows me to display a prompt with javascript
                             // Will want to make a similar function that takes prompt from websocket
  }, [])

  useSocket();

  return (
        <div>
          <Lines
            lines={codeLines}
            lengths={lengths}
            indexes={wrongIndexes}
            counter={counter}
          />
        </div>
  )

};

// What to do for mp functionality
// Make game room for new connections
// When 2 players connected send prompt to players (Hardcode for now)
// When a player finishes their prompt send complete back to Server
// When all players send complete to server, server sends back game result