import React, { useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import Lines from "../Main/Lines";

import "../Main/Display.scss";
import "./Prompt.scss";

export default function Prompt(props) {

  const { onComplete, serverPrompt, onProgress, running, toggleTimer, resetTimer } = props;

  const { prompt, input, lengths, resetInput, handleKeypress, setFocus, endInput, setPrompt } = useKeyPress();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;

  function newPrompt() {
    setPrompt({ codeLines: serverPrompt, language: 'Javascript', category: 'All' });
    resetInput();
    resetTimer();
    toggleTimer(true);
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
        if (counter === lengths[lengths.length - 1][1]) {
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
    <div
      className="mp-codeContainer"
      tabIndex={0}
    >
      <div className="codeSideline" />
      <div className="code">
        <Lines
          lines={codeLines}
          lengths={lengths}
          indexes={wrongIndexes}
          counter={counter}
          line={input.line}
        />
      </div>
    </div>
  );
};