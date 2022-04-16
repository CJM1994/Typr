import React from "react";
import { storiesOf } from "@storybook/react";

import Sidebar from "../components/Sidebar/Sidebar";
import Block from "../components/Main/Block";

storiesOf("Sidebar", module)
  .addParameters({
    backgrounds: [{ name: "light", value: "#EFE7E4", default: true }]
  })
  .add("Sample", () => (
    <Sidebar />
  ));

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

storiesOf("Code Block", module)
  .addParameters({
    backgrounds: [{ name: "light", value: "#EFE7E4", default: true }]
  })
  .add("Sample", () => (
    <Block text={code} />
  ));