import React, { useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";

import "./Display.scss";

import Information from "./Information";
import Lines from "./Lines";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  // deconstructing objects
  const { prompt, input, lengths, fetchPrompt, resetInput, handleKeypress } = useKeyPress();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;
  const { milliseconds, running, toggleTimer, resetTimer } = useTimer();

  function newPrompt(language) {
    fetchPrompt(language);
    resetInput();
    resetTimer();
  }

  // side effect for language change
  useEffect(() => {
    newPrompt(language);
  }, []);

  // timer toggling side effect for when user first presses a key
  useEffect(() => {
    if (!running && input.keys[0].length > 0) {
      toggleTimer()
    } else if (lengths[lengths.length - 1]) {
      if (counter === lengths[lengths.length - 1][1] - 1)  {
        toggleTimer()
      }
    }
  }, [input]);

  // creates new event listener when component is unmounted (new prompt)
  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <div className="display">
      <Information 
        language={prompt.language}
        setLanguage={newPrompt}
        time={milliseconds}
      />
      <div className="codeContainer">
        <div className="line" />
        <div className="code">
          <Lines
            lines={codeLines}
            lengths={lengths}
            indexes={wrongIndexes}
            counter={counter}
          />
        </div>
      </div>
      <VirtualKeyboard />
    </div>
  );
};