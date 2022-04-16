import React from "react";
import classNames from "classnames";

import "./Line.scss";

export default function Line(props) {
  const { text, start, index, wrong } = props;
  const line = [];
  let lineClasses;

  for (let i = 0; i < text.length; i++) {
    lineClasses = classNames("ch", {
      "ch--wrong": wrong.includes(i + start)
    });

    if (i === index - start) {
      line.push(<div className="ticker" />);
    }

    line.push(<p className={lineClasses}>{text[i]}</p>)
  }

  return (
    <pre className="lineContainer">
      {line}
    </pre>
  );
};