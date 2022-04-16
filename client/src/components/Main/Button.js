import React from "react";
import classNames from "classnames";

import "./Button.scss";

export default function Button(props) {
  const { language, highlight, onClick } = props;
  const buttonClasses = classNames("button", {
    "button--highlighted": highlight === true
  })

  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
    >
      {language}
    </button>
  )
}