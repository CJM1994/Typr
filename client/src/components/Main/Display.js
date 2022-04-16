import React from "react";

import Block from "./Block";
import VirtualKeyboard from "./VirtualKeyboard";

import "./Display.scss";

export default function Display() {
  const code = 'const animals = [];\n\
\n\
for (const animal of animals) {\n\
  console.log(animal);\n\
  doSomething(animal);\n\
}';

  return(
    <div className="display">
      <Block text={code} />
      <VirtualKeyboard />
    </div>
  )
};