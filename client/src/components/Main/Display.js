import React from "react";

import Block from "./Block";
import Keyboard from "./Keyboard";

import "./Display.scss";

export default function Display() {
  const code = "const files = [ 'foo.txt ', '.bar', '   ', 'baz.foo' ];\n\
  let filePaths = [];\n\
  \n\
  for (let file of files) {\n\
    const fileName = file.trim();\n\
    if(fileName) {\n\
      const filePath = `~/cool_app/${fileName}`;\n\
      filePaths.push(filePath);\n\
    }\n\
  }";

  return(
    <div className="display">
      <Block text={code} />
      <Keyboard />
    </div>
  )
};