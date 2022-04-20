import React from "react";
import classNames from "classnames";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

import "./Line.scss";

export default function Line(props) {
  const { text, start, end, wrong, index, onLine } = props;
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
    <pre className="lineContainer">
      <Highlight  {...defaultProps} theme={theme} code={text} language="js">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
              {(index - start === 0 && onLine) && <div className="ticker" />}
                {line.map((token, key) => {
                  return (token.content.split("").map((ch, j) => {
                    return (<>
                      {index === getIndex(line, key, j) && <div className="ticker" />}
                      <span {...getTokenProps({ token: { ...token, content: ch}, key: (key + 1) * (j + 1) })} />
                    </>);
                  }));
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </pre>
  );
};