import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'

import './Player.scss';

export default function Player(props) {
  const [carPosition, setCarPosition] = useState(0);
  const { position, progress, speed, errors, carColor, nickname } = props;

  function nth(n) {
    return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"
  };

  useEffect(() => {
    setCarPosition((progress * 100 * 0.55) + 11.5);
  }, [progress]);

  return (
    <div className="player-card">
      <div className="track">
        <div className="player" style={{ left: `${carPosition}%`, position: 'absolute', color: `${carColor}` }}>
          <label>{`${nickname || "..."}`}</label>
          <FontAwesomeIcon icon={faCarSide} className="car" />
        </div>
      </div>
      <div className="player-stats">
        <span>{position + nth(position)}</span>
        <span>{`Speed: ${speed}`}</span>
        <span>{`Errors: ${errors}`}</span>
      </div>
    </div>
  );
}