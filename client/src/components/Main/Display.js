import React, { useEffect, useState } from "react";

import "./Display.scss";

import Block from "./Block";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  const [language, setLanguage] = useState("JS");

  return (
    <div className="display">
      <select onChange={(event) => setLanguage(event.target.value)}>
        <option value="JS ">Javascript</option>
        <option value="Python">Python</option>
      </select>
      <Block
        text={prompt.code}
        language={language}
      />
      <VirtualKeyboard />
    </div>
  );
};