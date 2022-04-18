import React, { useEffect } from "react";
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
  const { time, running, toggle, reset } = useTimer();

  function newPrompt(language) {
    fetchPrompt(language);
    resetInput();
    reset();
  }

  // side effect for language change
  useEffect(() => {
    newPrompt(language);
  }, []);

  // timer toggling side effect for when user first presses a key
  useEffect(() => {
    if (!running && input.keys[0].length > 0) {
      toggle();
    } else if (lengths[lengths.length - 1]) {
      if (counter === lengths[lengths.length - 1][1] - 1)  {
        toggle();
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
        time={time}
      />
      <div 
        className="codeContainer" 
        tabIndex={0} 
        onFocus={(event) => setFocus(true, event.target)} 
        onBlur={(event) => setFocus(false, event.target)}
      >
        <div className="line" />
        {input.focused && <div className="code">
          <Lines
            lines={codeLines}
            lengths={lengths}
            indexes={wrongIndexes}
            counter={counter}
          />
        </div>}
        {!input.focused && <p className="ch">Click here to see prompt.</p>}
      </div>
      <VirtualKeyboard />
    </div>
  );
};