import { useState } from "react";
import { SpinnerCircularFixed } from 'spinners-react';
import Servers from "./Servers";

import "./ServerSelect.scss";

export default function ServerSelect(props) {
  const [serverChoice, setServerChoice] = useState('server1');
  const [loading, setLoading] = useState(false);
  const { onClick } = props;

  return (
    <>
      {loading === false &&
        <div className="servers">
          <select name="server" onChange={(event) => setServerChoice(event.target.value)}>
            <option value="server1">Server 1</option>
            <option value="server2">Server 2</option>
            <option value="server3">Server 3</option>
            <option value="server4">Server 4</option>
            <option value="server5">Server 5</option>
            <option value="server6">Server 6</option>
            <option value="server7">Server 7</option>
            <option value="server8">Server 8</option>
            <option value="server9">Server 9</option>
            <option value="server1o">Server 10</option>
          </select >
          <button onClick={() => {
            onClick(serverChoice);
            setLoading(true);
          }} className="button button--highlighted">
            Join Server
          </button>
        </div>}

      {loading === true && <SpinnerCircularFixed
        size={100}
        thickness={100}
        speed={100}
        color="rgba(0, 0, 0, 1)"
        secondaryColor="rgba(0, 0, 0, 0.44)"
      />}
    </>
  )

}