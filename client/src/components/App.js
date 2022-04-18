import React, { useState } from "react";

import "./App.scss";

import Sidebar from "./Sidebar/Sidebar";
import Display from "./Main/Display";
import Profile from './Profile/Profile';
import Leaderboard from "./Leaderboard/Leaderboard";

function App() {
  const [view, setView] = useState("Practice");

  return (
    <main className="layout">
      <div className="container">
        {view === "Practice" && <Display />}
        {view === "Profile" && <Profile />}
        {view === "High Scores" && <Leaderboard />}
        <Sidebar setView={setView} />
      </div>
    </main>
  );
}

export default App;