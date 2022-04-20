import React from "react";
import SidebarButton from "./SidebarButton";
import Login from "../User/Login"
import Logout from "../User/Logout"

import "./Sidebar.scss"

export default function Sidebar(props) {
  const { setView } = props;
  return (
    <section className="sidebar">
      <Login/>
      <Logout/>
      <SidebarButton href="/" text="Practice" onClick={setView} />
      <SidebarButton href="/profile" text="Profile" onClick={setView} />
      <SidebarButton href="/help" text="Help" onClick={setView} />
      <SidebarButton href="/leaderboards" text="High Scores" onClick={setView} />
      <SidebarButton href="/multiplayer" text="Multiplayer" onClick={setView} />
    </section>
  );
};