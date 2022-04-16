import React, { useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";

import "./Display.scss";

import Information from "./Information";
import Lines from "./Lines";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  // deconstructing objects
  const { prompt, input, lengths, newPrompt, handleKeypress, resetInput, setLanguage } = useKeyPress();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;

  // side effect for language change
  useEffect(() => {
    newPrompt(language);
    resetInput();
  }, [language]);

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
        setLanguage={setLanguage}
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