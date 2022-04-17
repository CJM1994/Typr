import React from "react";

import "./Information.scss"

import Button from "./Button";

export default function Information(props) {
  // => pass user info into props and use it to display their stats
  // => pass prompt info into props
  // => render buttons dynamically from an array of languages
  const { language, setLanguage, time } = props;
  const languages = ["JS", "Python", "Ruby"];
  const date = new Date(null);
  date.setMilliseconds(time);

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
      <div className="info">
        <span>Language:</span>
        {buttons}
      </div>
      <span className="info">{"Category: <props.category>"}</span>
      <span className="info">Time: {date.toISOString().substr(14, 8)}</span>
    </article>
  );
};