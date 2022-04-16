import React from "react";

import Block from "./Block";
import Keyboard from "./Keyboard";

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
      <Keyboard />
    </div>
  )
};