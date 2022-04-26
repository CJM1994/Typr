import React, { useEffect } from "react";

import "./VSDisplay.scss"
import "../Main/Information.scss";

import Player from "./Player";

export default function VSDisplay(props) {

  const { gameState, time } = props;

  const date = new Date(null);
  date.setMilliseconds(time);

  useEffect(() => {

  }, [gameState]);

  return (
    <div className="mp-display">
      <div className='players'>
        <Player
          nickname={gameState?.player1?.nickname}
          position={gameState?.player1?.position || 1}
          progress={gameState?.player1?.progress || 0}
          speed={gameState?.player1?.counter || 0}
          errors={gameState?.player1?.errors || 0}
          carColor='blue'
        />
        <Player
          nickname={gameState?.player2?.nickname}
          position={gameState?.player2?.position || 1}
          progress={gameState?.player2?.progress || 0}
          speed={gameState?.player2?.counter || 0}
          errors={gameState?.player2?.errors || 0}
          carColor='red'
        />
        <Player
          nickname={gameState?.player3?.nickname}
          position={gameState?.player3?.position || 1}
          progress={gameState?.player3?.progress || 0}
          speed={gameState?.player3?.counter || 0}
          errors={gameState?.player3?.errors || 0}
          carColor='green'
        />
        <Player
          nickname={gameState?.player4?.nickname}
          position={gameState?.player4?.position || 1}
          progress={gameState?.player4?.progress || 0}
          speed={gameState?.player4?.counter || 0}
          errors={gameState?.player4?.errors || 0}
          carColor='orange'
        />
      </div>
      <article className="information information--mp">
        <span className="info">{`Language: ${props.language || "..."}`}</span>
        <span className="info">{`Category: ${props.category || "..."}`}</span>
        <span className="info">{`Time: ${date.toISOString().substr(14, 8)}`}</span>
      </article>
    </div>
  );
};