import React from "react";

import "./SidebarButton.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faArrowTrendUp, faQuestion, faTrophy, faUserGroup } from '@fortawesome/free-solid-svg-icons'

export default function SidebarButton(props) {
  const { onClick, text } = props;

  return (<>
      <button className="sideButton" onClick={() => onClick(text)}>
        {text === "Practice" && <FontAwesomeIcon icon={faKeyboard} className="icon" />}
        {text === "Profile" && <FontAwesomeIcon icon={faArrowTrendUp} className="icon" />}
        {text === "Help" && <FontAwesomeIcon icon={faQuestion} className="icon" />}
        {text === "High Scores" && <FontAwesomeIcon icon={faTrophy} className="icon" />}
        {text === "Multiplayer" && <FontAwesomeIcon icon={faUserGroup} className="icon" />}
        <span>{props.text}</span>
      </button>
    </>
  );
};