import React from "react";

import "./Block.scss";

export default function Block(props) {
  const { text } = props;

  return (
    <div>
      <pre>
        <p>{text}</p>
      </pre>
    </div>
  );
};