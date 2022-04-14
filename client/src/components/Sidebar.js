import React from "react";

import SidebarButton from "./SidebarButton";

import "./Sidebar.scss"

export default function Sidebar() {
  return (
    <section className="sidebar">
      <SidebarButton href="/" text="Practice" />
      <SidebarButton href="/profile" text="Profile" />
      <SidebarButton href="/test" text="Typing Test" />
      <SidebarButton href="/help" text="Help" />
      <SidebarButton href="/leaderboards" text="High Scores" />
      <SidebarButton href="/multiplayer" text="Multiplayer" />
      <SidebarButton href="/layouts" text="Layout" />
      <SidebarButton href="/tools" text="Text Tools" />
    </section>
  );
};