import React, { useState } from "react";

import Block from "./Block";
import Keyboard from "./Keyboard";

import "./Display.scss";

export default function Display() {
  const code = 'const animals = ["Cat", "Dog", "Rat"];\n\
\n\
for (const animals of animals) {\n\
  console.log(animal);\n\
}';

  return(
    <div className="display">
      <Block text={code} />
      <Keyboard />
    </div>
  )
};