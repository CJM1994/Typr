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
      <Logout/>
      <SidebarButton text="Practice" onClick={setView} />
      <SidebarButton text="Multiplayer" onClick={setView} />
      <SidebarButton text="Profile" onClick={setView} />
      <SidebarButton text="High Scores" onClick={setView} />
      <SidebarButton text="Help" onClick={setView} />
      <SignedIn/>
      <img src="https://cdn.discordapp.com/attachments/955930052036558879/966114918036307978/My_project4.png" />
    </section>
  );
};