import React, { useState, useEffect } from "react";

import "./Block.scss";

import Line from "./Line";

export default function Block(props) {
  const { text } = props;
  const [input, setInput] = useState({
    keys: [""],
    counter: 0
  });
  const lines = text.split("\n");

  useEffect(() => {
    document.addEventListener("keypress", (event) => {
      if (event.which !== 13) {
        setInput((prev) =>  ({
          keys: [...prev.keys.slice(0, prev.keys.length - 1), prev.keys[prev.keys.length - 1] + event.key],
          counter: prev.counter + 1
        }));
      }
    });

    document.addEventListener("keydown", (event) => {
      const key = event.which;

      if (key === 8) {
        setInput((prev) =>  {
          if (prev[prev.length - 1] === "" && prev.length > 1) {
            return {
              keys: [...prev.keys.slice(0, prev.keys.length - 1)],
              counter: prev.counter - (prev.counter - 1 < 0 ? 0 : 1)
            };
          } else {
            return {
              keys: [...prev.keys.slice(0, prev.keys.length - 1), prev.keys[prev.keys.length - 1].slice(0, -1)],
              counter: prev.counter - (prev.counter - 1 < 0 ? 0 : 1)
            };
          }
        });
      } else if (key === 13) {
        setInput((prev) =>  ({
          keys: [...prev.keys, ""],
          counter: prev.counter + 1
        }));
      }
    });
  }, []);

  const getIndexes = (arr) => {
    let lengths = [];
    
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        lengths.push([0, arr[i].length])
      } else {
        lengths.push([lengths[i - 1][1] + 1, arr[i].length + lengths[i - 1][1]])
      }
    }

    return lengths
  };

  const codeBlock = [];
  const lineLengths = getIndexes(lines);

  for (let i = 0; i < lines.length; i++) {

    codeBlock.push(<Line 
      key={i}
      text={lines[i]}
      start={lineLengths[i][0]}
      end={lineLengths[i][1]}
      index={input.counter}
    />);
  }

  console.log(input);
  console.log(lineLengths)

  return (
    <pre className="codeContainer">
      {codeBlock}
    </pre>
  );
};