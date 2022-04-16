import React, { useEffect } from "react";
import useKeyPress from "../../hooks/useKeyPress";

import "./Display.scss";

import Lines from "./Lines";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  // deconstructing objects
  const { prompt, input, lengths, newPrompt, handleKeypress, resetInput } = useKeyPress();
  const { codeLines, language } = prompt;
  const { wrongIndexes, counter } = input;

  // side effect for language change
  useEffect(() => {
    newPrompt(language);
    resetInput();
  }, [language]);

  // creates new event listener when component is unmounted
  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  return (
    <div className="display">
      <select onChange={(event) => newPrompt(event.target.value)}>
        <option value="JS ">Javascript</option>
        <option value="Python">Python</option>
      </select>
      <div className="codeContainer">
        <Lines
          lines={codeLines}
          lengths={lengths}
          indexes={wrongIndexes}
          counter={counter}
        />
      </div>
      <VirtualKeyboard />
    </div>
  );
};