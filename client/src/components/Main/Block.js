import React, { useState, useEffect } from "react";

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
  const { text } = props;
  const [input, setInput] = useState({
    keys: [""],
    counter: 0,
    indent: 0,
    wrongIndexes: [],
    queue: null
  });

  const lines = text.split("\n").map((el) => {
    const newEl = el.split("");
    newEl.push("\n");
    return newEl;
  });
  const lineLengths = getIndexes(lines);

  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      setInput((prev) =>  {
        const wrongIndexes = [...prev.wrongIndexes];
        if (prev.queue !== null) wrongIndexes.push(prev.queue);

        if (event.key === lines[prev.keys.length - 1][prev.counter - lineLengths[prev.keys.length - 1][0]]) {
          return {
            ...prev,
            keys: [...prev.keys.slice(0, prev.keys.length - 1), prev.keys[prev.keys.length - 1] + event.key],
            counter: prev.counter + 1,
            indent: prev.indent + (event.key === "{" ? 1 : 0),
            wrongIndexes,
            queue: null
          };
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
        } else if (!prev.wrongIndexes.includes(prev.counter) ) {
          return { ...prev, queue: prev.counter };
        } else {
          return { ...prev }
        }
      });
    });
  }, []);

  console.log(input);

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