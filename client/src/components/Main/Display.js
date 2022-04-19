import React, { useEffect } from "react";
import classNames from "classnames";
import useKeyPress from "../../hooks/useKeyPress";
import useTimer from "../../hooks/useTimer";
import axios from "axios";

import "./Display.scss";

import Information from "./Information";
import Lines from "./Lines";
import VirtualKeyboard from "./VirtualKeyboard";
import { calculateScore } from '../../helpers/helpers';

export default function Display() {
  // deconstructing objects
  const { prompt, input, lengths, fetchPrompt, resetInput, handleKeypress, setFocus, endInput } = useKeyPress();
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

  useEffect(() => {
    if (input.end) {
      let totalChars = 0;
      let totalWords = 0;

      for (const line of codeLines) {
        totalChars += line.length;
        totalWords += line.join('').split(' ').length;
      }

      const minutes = time / 60000;
      const wordsPerMin = (totalWords / minutes);
      const accuracy = (totalChars - input.wrongIndexes.length) / totalChars;
      const email = `test4@test.test`;
      axios.patch(`user/${email}`, {
        attemptScore: calculateScore(wordsPerMin, accuracy),
        statistics: {
          accuracy: accuracy,
          wordsPerMin: wordsPerMin,
          timeSpent: time, 
          totalChars: totalChars
        }
      })
        .then((res) => {
        });
    }
  }, [input.end]);

  // creates new event listener when component is unmounted (new prompt)
  useEffect(() => {
    document.addEventListener("keypress", handleKeypress);
    return () => {
      document.removeEventListener("keypress", handleKeypress);
    };
  }, [handleKeypress]);

  function toggleFocus() {
    setFocus(!input.focused);
    if ((input.keys[0].length > 0 || input.queue !== null) && !input.end) {
      toggleTimer(!input.focused);
    }
  }

  return (
    <div className="display">
      <Information
        category={prompt.category}
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