import React, { useEffect, useState } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";
import "../Main/Display.scss";
import Lines from "../Main/Lines";

export default function Prompt(props) {

  const { onComplete, serverPrompt, onProgress } = props;

  const { prompt, input, lengths, fetchPrompt, resetInput, handleKeypress, setFocus, endInput, setPrompt } = useKeyPress();
  const { time, running, toggleTimer, resetTimer } = useTimer();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;

  const [stats, setStats] = useState({
    wordsPerMin: 0,
    accuracy: 0,
    score: 0
  });

  function newPrompt() {
    setPrompt({codeLines: serverPrompt, language: 'Javascript', category: 'food'});
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
  }, [serverPrompt]);

  // On click
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

  // On prompt complete
  useEffect(() => {
    if (input.end) {
      onComplete(); // send complete message to websocket
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

  useEffect(() => {
    if (counter !== 0) {
      // Can send a websocket message here to update % progress
      onProgress(counter, wrongIndexes.length);
    }
  }, [counter])

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
            line={input.line}
          />
        </div>
        <p>Counter: {counter}</p>
        <p>Errors: {wrongIndexes.length}</p>
      </div>
    </div>
  );
};