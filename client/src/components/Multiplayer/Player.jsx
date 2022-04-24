import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from "../App";

import './Player.scss';

export default function Player(props) {
  const { userProps } = useContext(UserContext);
  const [carPosition, setCarPosition] = useState(0);
  const { user_id, position, progress, speed, errors, carColor } = props;

  useEffect(() => {
    setCarPosition(progress * 2400);
  }, [progress]);
  
  return (
    <div className="player-card">
      <div className="track">
        <div className="player" style={{ left: `${carPosition}%`, '-webkit-transform': `translate(${carPosition}%, 0%)`, color: `${carColor}` }}>
          <label>{user_id}</label>
          <FontAwesomeIcon icon={faCarSide} className="car" />
        </div>
      </div>
      <div className="player-stats">
        <span>{`Position: ${position}`}</span>
        <span>{`Speed: ${speed}`}</span>
        <span>{`Errors: ${errors}`}</span>
      </div>
    </div>
  );
}