import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Block.scss";

import Line from "./Line";

const getIndexes = (arr) => {
  let lengths = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      lengths.push([0, arr[i].length])
    } else {
      lengths.push([lengths[i - 1][1], arr[i].length + lengths[i - 1][1]])
    }
  }

  return lengths
};

export default function Block(props) {
  const [prompt, setPrompt] = useState({
    code: "",
    language: props.language
  });

  const [input, setInput] = useState({
    keys: [""], // ["", ""]
    counter: 0, // keys.length
    indent: 0, // 1 indent = 1 tab
    wrongIndexes: [], // incorrect keypresses
    queue: null // to be added ot wrongIndexes for visual purposes
  });

  useEffect(() => {
    axios.get(`prompts/${prompt.language}`)
      .then((res) => {
        setPrompt((prev) => ({ ...prev, code: res.data[res.data.length - 1].codeBlock.split("\n") }));
      });
  }, [prompt.language]);

  const lines = prompt.code;
  const lineLengths = getIndexes(lines);
  
  useEffect(() => {
    // listens to keypress events (uses the variables it was working with at intialization)
    document.addEventListener("keypress", (event) => {
      // everytime key is pressed:
      setInput((prev) =>  {
        // new array containing previous wrongIndex
        const wrongIndexes = [...prev.wrongIndexes];
        if (prev.queue !== null) wrongIndexes.push(prev.queue);

        // debugging:
        // console.log(`comparing ${event.key} === ${lines[prev.keys.length - 1]}`);
        // [prev.counter - lineLengths[prev.keys.length - 1][0] + 2]
        // console.log("inside", prompt.code);
        // console.log(`            === lines[${prev.keys.length - 1}][${prev.counter - lineLengths[prev.keys.length - 1][0]}]`);

        // correct key is pressed
        if (event.key === lines[prev.keys.length - 1][prev.counter - lineLengths[prev.keys.length - 1][0]]) {
          return {
            ...prev,
            keys: [...prev.keys.slice(0, prev.keys.length - 1), prev.keys[prev.keys.length - 1] + event.key],
            counter: prev.counter + 1,
            indent: prev.indent + (event.key === "{" ? 1 : 0),
            wrongIndexes,
            queue: null
          };
        // if user presses enter
        // lines[prev.keys.length - 1][prev.counter - lineLengths[prev.keys.length - 1][0]]
        //   => first ch on next line accounting for indents
        } else if (event.keyCode === 13 && lines[prev.keys.length - 1][prev.counter - lineLengths[prev.keys.length - 1][0]] === "\n") {
          const indent = prev.indent - (lines[prev.keys.length][0 + (prev.indent - 1 > 0 ? prev.indent - 1 : 0) * 2] === "}" ? 1 : 0);

          return {
            ...prev,
            keys: [...prev.keys, "" + "  ".repeat(indent)],
            counter: prev.counter + 1 + 2 * indent,
            indent,
            wrongIndexes,
            queue: null
          };
        // if wrongly pressed index is already in wrong array
        } else if (!prev.wrongIndexes.includes(prev.counter)) {
          return { ...prev, queue: prev.counter };
        } else {
          return { ...prev }
        }
      });
    });
  }, []);

  const codeBlock = [];

  for (let i = 0; i < lines.length; i++) {
    codeBlock.push(<Line 
      key={i}
      text={lines[i]}
      start={lineLengths[i][0]}
      wrong={input.wrongIndexes}
      index={input.counter}
    />);
  }

  return (
    <pre className="codeContainer">
      {codeBlock}
    </pre>
  );
};