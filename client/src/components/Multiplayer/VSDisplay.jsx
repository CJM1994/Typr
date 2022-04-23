import React, { useEffect } from "react";

import "./VSDisplay.scss"
import "../Main/Information.scss";

import Player from "./Player";

export default function VSDisplay(props) {

  const { gameState } = props;

  useEffect(() => {

    console.log('Player1', gameState.player1);
    console.log('Player2', gameState.player2);
    console.log('Player3', gameState.player3);
    console.log('Player4', gameState.player4);

  }, [gameState]);

  return (
    <div className="mp-display">
      <div className='players'>
        <Player
          position={gameState?.player1?.position}
          progress={gameState?.player1?.progress}
          speed={gameState?.player1?.counter}
          errors={gameState?.player1?.errors}
          carColor='blue'
        />
        <Player
          position={gameState?.player2?.position}
          progress={gameState?.player2?.progress}
          speed={gameState?.player2?.counter}
          errors={gameState?.player2?.errors}
          carColor='red'
        />
        <Player
          position={gameState?.player3?.position}
          progress={gameState?.player3?.progress}
          speed={gameState?.player3?.counter}
          errors={gameState?.player3?.errors}
          carColor='green'
        />
        <Player
          position={gameState?.player4?.position}
          progress={gameState?.player4?.progress}
          speed={gameState?.player4?.counter}
          errors={gameState?.player4?.errors}
          carColor='orange'
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