import React from 'react';

import './Gameover.scss';

export default function Gameover(props) {
  return (
    <div className='gameover-card'>
      <h1>Game Over!</h1>
      <h2>Winner: {props.winner}</h2>
      <span>
        <button type='button' onClick={()=> props.setMode("choosing")}>Return To Lobby</button>
      </span>
    </div>
  );
}