import React, { useEffect, useState } from "react";
import axios from "axios";

import "./Display.scss";

import Block from "./Block";
import VirtualKeyboard from "./VirtualKeyboard";

export default function Display() {
  const [prompt, setPrompt] = useState({
    code: "",
    language: "JS"
  });
  
  function setLanguage(category) {
    setPrompt((prev) => ({ ...prev, category }));
  }

  useEffect(() => {
    axios.get(`prompts/${prompt.language}`)
      .then((res) => {
        console.log(res);
        setPrompt((prev) => ({ ...prev, prompt: res.data[0] }));
      })
  }, [prompt.language]);

  console.log(prompt.code);

  return(
    <div className="display">
      <select onChange={(event) => setLanguage(event.target.value)}>
        <option value="JS ">Javascript</option>
        <option value="Python">Python</option>
      </select>
      <Block text={prompt.code} />
      <VirtualKeyboard />
    </div>
  )
};