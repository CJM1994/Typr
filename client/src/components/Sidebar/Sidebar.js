import React from "react";

import SidebarButton from "./SidebarButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

import "./Sidebar.scss"

export default function Sidebar() {
  return (
    <section className="sidebar">
      <a className="login" href="/login">
        <FontAwesomeIcon icon={faSmile} size="3x" />
        <span>Sign In</span>
      </a>
      <SidebarButton href="/" text="Practice" />
      <SidebarButton href="/profile" text="Profile" />
      <SidebarButton href="/help" text="Help" />
      <SidebarButton href="/leaderboards" text="High Scores" />
      <SidebarButton href="/multiplayer" text="Multiplayer" />
    </section>
  );
};