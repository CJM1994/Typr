import React from "react";

import Line from "./Line";

export default function Lines(props) {
  const { lines, line, lengths, indexes, counter } = props;
  const codeBlock = [];

  for (let i = 0; i < lines.length; i++) {
    codeBlock.push(<Line 
      key={i}
      text={lines[i]}
      start={lengths[i][0]}
      wrong={indexes}
      index={counter}
      line={line === i}
    />);
  }

  return (
    <>
      {codeBlock}
    </>
  );
};