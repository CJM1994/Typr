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
          position={gameState?.player1?.position || 0}
          progress={gameState?.player1?.progress || 0}
          speed={gameState?.player1?.counter || 0}
          errors={gameState?.player1?.errors || 0}
          carColor='blue'
        />
        <Player
          position={gameState?.player2?.position || 0}
          progress={gameState?.player2?.progress || 0}
          speed={gameState?.player2?.counter || 0}
          errors={gameState?.player2?.errors || 0}
          carColor='red'
        />
        <Player
          position={gameState?.player3?.position || 0}
          progress={gameState?.player3?.progress || 0}
          speed={gameState?.player3?.counter || 0}
          errors={gameState?.player3?.errors || 0}
          carColor='green'
        />
        <Player
          position={gameState?.player4?.position || 0}
          progress={gameState?.player4?.progress || 0}
          speed={gameState?.player4?.counter || 0}
          errors={gameState?.player4?.errors || 0}
          carColor='orange'
        />
      </div>
      <article className="information information--mp">
        <span className="info">{`Language: <Javascript>`}</span>
        <span className="info">{`Category: <All>`}</span>
        <span className="info">{`Time: <time>`}</span>
      </article>
    </div>
  );
};