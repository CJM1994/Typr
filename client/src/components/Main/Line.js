import React from "react";
import classNames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import "./Line.scss";

export default function Line(props) {
  const { text, start, end, wrong, index, onLine, line } = props;
  // const line = [];
  // let lineClasses;

  // for (let i = 0; i < text.length; i++) {
  //   lineClasses = classNames("ch", {
  //     "ch--wrong": wrong.includes(i + start)
  //   });

  //   if (i === index - start) {
  //     line.push(<div className="ticker" key={i} />);
  //   }

  //   line.push(<p className={lineClasses} key={i + lineClasses}>{text[i]}</p>);
  // }

  function getIndex(line, lineIndex, charIndex) {
    let index = charIndex + start;

    for (let i = 0; i < lineIndex; i++) {
      index += line[i].content.length;
    }

    return index;
  }

  return (
    <Highlight  {...defaultProps} theme={theme} code={text} language="js">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        tokens.map((line, i) => (
          <pre {...getLineProps({ line, key: i })} className="lineContainer">
            {(index === start && props.line === true) && <div className="ticker" />}
            {line.map((token, key) => {
              return (token.content.split("").map((ch, j) => {
                const chClasses = classNames("ch", {
                  "ch--wrong": wrong.includes(getIndex(line, key, j))
                });

                return (<>
                  <span {...getTokenProps({ token: { ...token, content: ch}, key: (key + 1) * (j + 1) })} className={chClasses} />
                  {(index - 1 === getIndex(line, key, j) && props.line === true) && <div className="ticker" />}
                </>);
              }));
            })}
          </pre>
        ))
      )}
    </Highlight>
  );
};