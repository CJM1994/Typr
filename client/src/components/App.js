import React from "react";

import "./App.scss";

import Sidebar from "./Sidebar/Sidebar";
import Display from "./Main/Display";
import Profile from './Profile/Profile';
import Leaderboard from "./Leaderboard/Leaderboard";

function App() {

  return (
    <main className="layout">
      <div className="container">
        <Profile />
        <Sidebar />
      </div>
    </main>
  );
}

export default App;
