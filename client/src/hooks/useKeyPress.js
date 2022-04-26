import { useState } from "react";
import axios from "axios";
import { getIndexes } from "../helpers/helpers";

export default function useKeyPress() {
  // state for keeping track of code block text and language
  const [prompt, setPrompt] = useState({
    codeLines: "",
    language: "Javascript",
    category: ""
  });

  const initialInput = {
    keys: [""],
    counter: 0,
    indent: 0,
    wrongIndexes: [],
    queue: null,
    focused: false,
    end: false,
    line: 0
  };

  // state for keeping track of user keypresses
  const [input, setInput] = useState(initialInput);

  // returns input to its initial state
  function resetInput() {
    setInput(initialInput);
  };

  function setFocus(focus) {
    setInput((prev) => ({ ...prev, focused: focus }));
  };
  
  function endInput() {
    setInput((prev) => ({ ...prev, end: true }));
  };

  // function for retrieving a prompt from db
  function fetchPrompt(language) {
    axios.get(`https://code-typr.herokuapp.com/prompts/${language}`)
      .then((res) => {
        setPrompt((prev) => {
          const index = Math.floor(Math.random() * res.data.length);

          return {
            codeLines: res.data[index].codeBlock.split("\n"),
            language,
            category: res.data[index].category
          };
        });
      });
  };

  // simpler variables
  const lines = prompt.codeLines;
  // array containing the index endpoints of each line in the code snippet
  const lengths = getIndexes(lines);

  // callback for event listener
  function handleKeypress(event) {
    // updates input when a key is pressed
    if (input.focused && input.counter !== lengths[lengths.length - 1][1] && !input.end) {
      setInput((prev) =>  {
        // descriptive variables
        const { counter, wrongIndexes, keys } = prev;
        const currentLine = prev.line;
        const currentIndexOnLine = counter - lengths[currentLine][0];
        
        // if user presses correct key
        if (event.key === lines[currentLine][currentIndexOnLine]) {
          if (prev.queue !== null) wrongIndexes.push(prev.queue);

          return {
            ...prev,
            keys: [...keys.slice(0, currentLine), keys[currentLine] + event.key],
            counter: counter + 1,
            indent: prev.indent,
            wrongIndexes,
            queue: null
          };
        // if user presses enter when needed
        } else if (event.keyCode === 13 && lengths[currentLine][0] + currentIndexOnLine === lengths[currentLine][1]) {
          const indent = (lines[currentLine + 1].search(/\S/) / 2 < 0) ? prev.indent : lines[currentLine + 1].search(/\S/) / 2;
    
          return {
            ...prev,
            keys: [...keys, "" + "  ".repeat(indent)],
            counter: counter + 2 * indent,
            indent,
            wrongIndexes,
            queue: null,
            line: prev.line + 1
          };
        // if user presses an incorrect key for the first time
        } else if (!wrongIndexes.includes(counter)) {
          return { ...prev, queue: counter };
        // if user presses an incorrect key
        } else {
          return { ...prev }
        }
      });
    }
  }

  return {
    prompt,
    lengths,
    input,
    handleKeypress,
    fetchPrompt,
    resetInput,
    setFocus,
    endInput,
    setPrompt
  };
};