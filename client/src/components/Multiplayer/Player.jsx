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
      <img src="https://cdn.discordapp.com/attachments/955930052036558879/966850723553869904/dc4okbX9i.png" width="100"/>

      </div>
      <section>

      <span>Randomly Generate User</span>
        <div className="user-stats">
          <span> Position: {position} </span>
          <span> Progress: {progress}</span>
          <span> Speed: {speed}</span>
          <span> Error: {errors}</span>
        </div>
      </section>
    </div>


  );

}