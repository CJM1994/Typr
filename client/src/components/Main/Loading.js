import React from "react";
import "./Loading.scss";
export default function Loading(props) {
  return (
    <>
      <div className="center">
        <div className="lds-hourglass"></div>
        <h2>Loading...</h2>
      </div>
    </>
  );
};