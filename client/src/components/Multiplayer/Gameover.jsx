import React, { useState, useEffect } from 'react';

import './Player.scss';

export default function Gameover(props) {
  return (
    <div className='gameover-card'>
      <h1>Game Over</h1>
      <h2>Winner: {props.winner}</h2>
      <span>
        <button type='button' onClick={()=> props.setWait('lobby')}>Return to lobby</button>
      </span>
    </div>
  );
}
