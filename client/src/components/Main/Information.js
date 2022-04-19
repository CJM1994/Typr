import React from "react";

import "./Information.scss"

import Button from "./Button";

export default function Information(props) {
  const { category, language, setLanguage, time, stats } = props;
  const languages = ["Javascript", "Python", "Ruby"];

  const date = new Date(null);
  date.setMilliseconds(time);

  const buttons = languages.map((el) => {
    return (
      <Button
        key={languages.indexOf(el)}
        language={el}
        highlight={language === el}
        onClick={() => setLanguage(el)}
      />
    );
  })

  return (
    <article className="information">
      <span className="info">{`WPM: ${Math.round(stats.wordsPerMin)} | Accuracy: ${Math.round(stats.accuracy * 1000) / 10}% | Score: ${Math.round(stats.score)}`}</span>
      <div className="info">
        <span>Language:</span>
        {buttons}
      </div>
      <span className="info">Category: {category.charAt(0).toUpperCase() + category.toLowerCase().slice(1)}</span>
      <span className="info">Time: {date.toISOString().substr(14, 8)}</span>
    </article>
  );
};