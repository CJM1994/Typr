import React, { useState, useEffect } from "react";
import './Player.scss';

export default function Player(props) {

  const [carPosition, setCarPosition] = useState(0);
  const { position, progress, speed, errors } = props;

  useEffect(() => {
    setCarPosition(progress * 100);
  }, [progress]);


  return (
    <div className="player-card">
      <div className="car" style={{ left: `${carPosition}%`}}>
        <svg height="100" width="100">
          <circle cx="50" cy="50" r="30" fill="yellow" />
        </svg>
      </div>
      <span>Randomly Generate User</span>

      <section>
        <div className="user-stats">
          <span> Position: {position} </span>
          <span> Progress: {progress}</span>
          <span> Speed:{speed}</span>
          <span> Error:{errors}</span>
        </div>
      </section>
    </div>
  );

}