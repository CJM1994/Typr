import React, { useEffect } from "react";

import "./VSDisplay.scss"
import "../Main/Information.scss";

import Player from "./Player";

export default function VSDisplay(props) {

  const { gameState } = props;

  useEffect(() => {

    console.log('Player1', gameState.player1);
    console.log('Player2', gameState.player2);

  }, [gameState]);

  return (
    <div className="mp-display">
      <div className='players'>
        <Player
          position={gameState?.player1?.position}
          progress={gameState?.player1?.progress}
          speed={gameState?.player1?.speed}
          errors={gameState?.player1?.errors}
        />
        <Player
          position={gameState?.player2?.position}
          progress={gameState?.player2?.progress}
          speed={gameState?.player2?.speed}
          errors={gameState?.player2?.errors}
        />
      </div>
      <article className="information information--mp">
        <span className="info">{`Language: <language>`}</span>
        <span className="info">{`Category: <category>`}</span>
        <span className="info">{`Time: <time>`}</span>
      </article>
    </div>
  );
}