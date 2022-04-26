import React from "react";
import classNames from "classnames";

import "./ServerSelect.scss";

export default function Servers(props) {
  const { servers, joinServer } = props;
  
  const buttons = servers.map((el) => {

    return (
      <button 
        onClick={() => joinServer("server" + el.value)} 
        value={el.value}
        className="serverButton"
      >
        <div>
          <span>{`Server ${el.value}`}</span>
          {/* <span>{`${el.players}/4`}</span> */}
        </div>
      </button>
    );
  });

  return (
    <>
      {buttons}
    </>
  );
};