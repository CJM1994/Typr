import React, { useEffect } from "react";
import classNames from "classnames";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";

import "./Display.scss";

import Information from "./Information";
import Lines from "./Lines";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  // deconstructing objects
  const { prompt, input, lengths, fetchPrompt, resetInput, handleKeypress , setFocus } = useKeyPress();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;
  const { time, running, toggleTimer, resetTimer } = useTimer();

  const codeClasses = classNames("code", {
    "code--blur": !input.focused
  });

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
    if (!running && (input.keys[0].length > 0 || input.queue !== null)) {
      toggleTimer();
    } else if (lengths[lengths.length - 1]) {
      if (counter === lengths[lengths.length - 1][1] - 1)  {
        toggleTimer();

        // push to db: # of wrong chars, time, prompt.words
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

  function toggleFocus() {
    setFocus(!input.focused);
    if (input.keys[0].length > 0 || input.queue !== null) {
      toggleTimer();  
    }
  }

  console.log(codeLines);

  return (
    <div className="display">
      <Information 
        language={prompt.language}
        setLanguage={newPrompt}
        time={time}
      />
      <div 
        className="codeContainer" 
        tabIndex={0} 
        onFocus={() => toggleFocus()} 
        onBlur={() => toggleFocus()}
      >
        <div className="codeSideline" />
        <div className={codeClasses}>
          <Lines
            lines={codeLines}
            lengths={lengths}
            indexes={wrongIndexes}
            counter={counter}
          />
        </div>
          {!input.focused && <div className="overlay">
            <span className="indicator">Click here to see prompt!</span>
          </div>}
      </div>
      <VirtualKeyboard />
    </div>
  );
};