import React, { useEffect, useState } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";
import "../Main/Display.scss";
import Lines from "../Main/Lines";

export default function MultiDisplay() {

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
    fetchPrompt(language);
    resetInput();
    resetTimer();
    setStats({
      wordsPerMin: 0,
      accuracy: 0,
      score: 0
    });
  }

  // THIS IS NEEDED FOR INITIAL PROMPT TO SHOW UP
  useEffect(() => {
    newPrompt(language);
    setFocus(true);
  }, []);

  // timer toggling side effect for when user first presses a key
  // NEEDS TO BE DISABLED, DONT WANT TIMER STOPPING DURING MULTIPLAYER
  useEffect(() => {
    if (!input.end) {
      if (!running && (input.keys[0].length > 0 || input.queue !== null)) {
        toggleTimer(true);
      } else if (lengths[lengths.length - 1]) {
        if (counter === lengths[lengths.length - 1][1] - 1) {
          toggleTimer(false);
          endInput();
        }
      }
    }
  }, [input]);

  // THIS USE EFFECT SHOULD SEND TO THE WEBSOCKET THAT USER FINISHED PROMPT
  useEffect(() => {
    if (input.end) {
      alert('PROMPT COMPLETE!!!') // This is where websocket should send
    }
  }, [input.end]);

  // creates new event listener when component is unmounted (new prompt)
  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <div className="display">
      <p>Time: {time}</p>
      <div
        className="codeContainer"
        tabIndex={0}
      >
        <div className="codeSideline" />
        <div>
          <Lines
            lines={codeLines}
            lengths={lengths}
            indexes={wrongIndexes}
            counter={counter}
          />
        </div>
      </div>
    </div>
  );
};