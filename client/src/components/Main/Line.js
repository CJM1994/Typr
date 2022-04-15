import React from "react";

import "./Line.scss";

export default function Line(props) {
  const { text, start, end, index} = props;

  return (
    <pre className="lineContainer">
      {(index >= start && index <= end) && <>
        <p>{text.slice(0, index - start)}</p>
        <div className="ticker" />
        <p>{text.slice(index - start, text.length)}</p>
      </>}
      {(index < start || index > end) && <p>{text}</p>}
    </pre>
  );
};