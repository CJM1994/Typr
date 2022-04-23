import React from "react";

import "./Profile.scss";

export default function NotLoggedIn(props) {
  return (
    <section className="profile">
      <article className="welcome">
        <h1>Sign in to view your progress!</h1>
        <p className="text">To track your progress we recommend you to register!</p>
      </article>
    </section>
  );
}