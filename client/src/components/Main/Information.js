import React from "react";

import "./Information.scss"

import Button from "./Button";

export default function Information(props) {
  // => pass user info into props and use it to display their stats
  // => pass prompt info into props
  // => render buttons dynamically from an array of languages
  const { language, setLanguage } = props;
  const languages = ["JS", "Python", "Ruby"];

  const buttons = languages.map((el) => {
    return (
      <Button
        language={el}
        highlight={language === el}
        onClick={() => setLanguage(el)}
      />
    );
  })

  return (
    <article className="information">
      <span className="info">{"Speed: <speed> Accuracy: <accuracy> Score: <score>"}</span>
      {/* <span className="info">{"Language: <props.language>"}</span> */}
      <div className="info">
        <span>Language:</span>
        {buttons}
      </div>
      <span className="info">{"Category: <props.category>"}</span>
    </article>
  );
};