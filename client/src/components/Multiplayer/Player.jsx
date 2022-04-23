import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

import './Player.scss';

export default function Player(props) {
  const [carPosition, setCarPosition] = useState(0);
  const { position, progress, speed, errors } = props;

  useEffect(() => {
    setCarPosition(progress * 2400);
  }, [progress]);


  return (
    <div className="player-card">
      <div className="track">
        <div className="player" style={{ left: `${carPosition}%`, "-webkit-transform": `translate(${carPosition}%, 0%)` }}>
          <label>{`<user>`}</label>
          <FontAwesomeIcon icon={faCarSide} className="car" />
        </div>
      </div>
      <div className="player-stats">
        <span>{"#st"}</span>
        <span>{"WPM: <wpm>"}</span>
        <span>{"Errors: <errors>"}</span>
      </div>
    </div>
  );
}