

export default function VSDisplay(props) { // how many player

  const {player1, player2} = props;

  return (
    <div>
      <p>Player 1: {player1.connected}, Progress: {player1.progress}</p>
      <p>Player 2: {player2.connected}, Progress: {player2.progress}</p>
    </div>
  )

}