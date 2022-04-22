import Player from './Player';
import { useEffect } from 'react';

export default function VSDisplay(props) {

  const { gameState } = props;

  useEffect(() => {

    console.log('Player1', gameState.player1);
    console.log('Player2', gameState.player2);

  }, [gameState]);

  return (
    <div>
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
  );

}