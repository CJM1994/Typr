import React, { usestats, useEffect } from "react";
import './NotLoggedIn.scss';

export default function NotLoggedIn(props) {
  return (
    <div className="text-block">
      <h2>Sign in to view your progress!</h2>
      <p className="text">To track your progress we recommend you to register!</p>
    </div>
  );
}