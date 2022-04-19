import React, { useEffect } from "react";
import Prism from "prismjs";
import 'prismjs/themes/prism-solarizedlight.css'

export default function Code({ code, language }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="Code">
      <pre><code className={`language-${language}`}>{code}</code></pre>
    </div>
  ); 
};

// FOR TESTING
// const JSCode = `const App = props => {
//   return (
//     <div>
//       <h1> Prism JS </h1>
//       <div>Awesome Syntax Highlighter</div>
//     </div>
//   );
// };
// `;

// const htmlCode = `
//     <div>
//       <h1> PrismJS Tutorial </h1>
//       <p>
//       Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind.
//       </p>
//     </div>
// `;

// SYNTAX
{/* <div>
<Code code={JSCode} language="javascript" />
<Code code={htmlCode} language="html" />
</div> */}