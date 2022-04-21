import React, {useContext} from "react";
import SidebarButton from "./SidebarButton";
import Login from "../User/Login"
import Logout from "../User/Logout"
import SignedIn from "../User/SignedIn";
import { UserContext } from "../App";

import "./Sidebar.scss"

export default function Sidebar(props) {
  const { setView } = props;
  return (
    <section className="sidebar">
      <Login/>
      <SignedIn/>
      <SidebarButton href="/" text="Practice" onClick={setView} />
      <SidebarButton href="/profile" text="Profile" onClick={setView} />
      <SidebarButton href="/help" text="Help" onClick={setView} />
      <SidebarButton href="/leaderboards" text="High Scores" onClick={setView} />
      <SidebarButton href="/multiplayer" text="Multiplayer" onClick={setView} />
      <Logout/>
    </section>
  );
};