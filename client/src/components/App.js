import React, { useState } from "react";

import "./App.scss";

import Sidebar from "./Sidebar/Sidebar";
import Display from "./Main/Display";
import Profile from './Profile/Profile';
import Leaderboard from "./Leaderboard/Leaderboard";
import User from "./User/User";
import Help from "./Help/Help";

function App() {
  const [view, setView] = useState("Practice");

  return (
    <main className="layout">
      <div className="container">
        {view === "Login" && <User />}
        {view === "Practice" && <Display />}
        {view === "Profile" && <Profile />}
        {view === "High Scores" && <Leaderboard />}
        {view === "Help" && <Help />}
        {view === "Multiplayer" && <Display />}
        <Sidebar setView={setView} />
      </div>
    </main>
  );
}

export default App;