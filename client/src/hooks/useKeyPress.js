import { useState } from "react";
import axios from "axios";
import { getIndexes } from "../helpers/helpers";

export default function useKeyPress() {
  // state for keeping track of code block text and language
  const [prompt, setPrompt] = useState({
    codeLines: "",
    language: "JS"
  });

  const initialInput = {
    keys: [""],
    counter: 0,
    indent: 0,
    wrongIndexes: [],
    queue: null
  };

  // state for keeping track of user keypresses
  const [input, setInput] = useState(initialInput);

  // returns input to its initial state
  function resetInput() {
    setInput(initialInput);
  }

  // function for retrieving a prompt from db
  //  -> add randomization of res.data index
  function newPrompt(language) {
    axios.get(`prompts/${language}`)
      .then((res) => {
        setPrompt((prev) => ({ 
          codeLines: res.data[res.data.length - 1].codeBlock.split("\n").map((el) => [...el, "\n"]),
          language
        }));
      });
  };

  // simpler variables
  const lines = prompt.codeLines;
  // array containing the index endpoints of each line in the code snippet
  const lengths = getIndexes(lines);

  // callback for event listener
  function handleKeypress(event) {
    // updates input when a key is pressed
    setInput((prev) =>  {
      // descriptive variables
      const { counter, wrongIndexes, keys } = prev;
      const currentLine = keys.length - 1;
      const currentIndexOnLine = [counter - lengths[currentLine][0]];
      
      // if user presses correct key
      if (event.key === lines[currentLine][currentIndexOnLine]) {
        if (prev.queue !== null) wrongIndexes.push(prev.queue);

        return {
          keys: [...keys.slice(0, currentLine), keys[currentLine] + event.key],
          counter: counter + 1,
          indent: prev.indent + (event.key === "{" ? 1 : 0),
          wrongIndexes,
          queue: null
        };
      // if user presses enter when needed
      } else if (event.keyCode === 13 && lines[currentLine][currentIndexOnLine] === "\n") {
        // updates indent in input state if the first character in the next line is a closing bracket
        const indent = prev.indent - (lines[keys.length][(prev.indent - 1 > 0 ? prev.indent - 1 : 0) * 2] === "}" ? 1 : 0);
  
        return {
          ...prev,
          keys: [...keys, "" + "  ".repeat(indent)],
          counter: counter + 1 + 2 * indent,
          wrongIndexes,
          queue: null
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

  return {
    prompt,
    lengths,
    input,
    handleKeypress,
    newPrompt,
    resetInput
  };
};