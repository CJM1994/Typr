import React, { createContext, useState } from "react";

import "./App.scss";

import Sidebar from "./Sidebar/Sidebar";
import Display from "./Main/Display";
import Profile from './Profile/Profile';
import Leaderboard from "./Leaderboard/Leaderboard";
import Multiplayer from "./Multiplayer/Multiplayer";
import Help from "./Help/Help";
import Loading from "./Main/Loading";
import { useAuth0 } from "@auth0/auth0-react";
export const UserContext = createContext({});

function App() {
  const [view, setView] = useState("Practice");
  const userProps = useAuth0();

  if (userProps.isLoading) return <Loading />;

  return (
    <main className="layout">
      <UserContext.Provider value={{ userProps }}>
        <div className="container">
          {view === "Practice" && <Display />}
          {view === "Profile" && <Profile />}
          {view === "High Scores" && <Leaderboard />}
          {view === "Help" && <Help />}
          {view === "Multiplayer" && <Multiplayer />}
          <Sidebar setView={setView} />
        </div>
      </UserContext.Provider>
    </main>
  );
}

export default App;