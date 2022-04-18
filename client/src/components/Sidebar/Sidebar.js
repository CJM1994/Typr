import React from "react";

import SidebarButton from "./SidebarButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

import "./Sidebar.scss"

export default function Sidebar(props) {
  const { setView } = props;

  return (
    <section className="sidebar">
      <a className="login" href="/login">
        <FontAwesomeIcon icon={faSmile} size="3x" />
        <span>Sign In</span>
      </a>
      <SidebarButton href="/" text="Practice" onClick={setView} />
      <SidebarButton href="/profile" text="Profile" onClick={setView} />
      <SidebarButton href="/help" text="Help" onClick={setView} />
      <SidebarButton href="/leaderboards" text="High Scores" onClick={setView} />
      <SidebarButton href="/multiplayer" text="Multiplayer" onClick={setView} />
    </section>
  );
};