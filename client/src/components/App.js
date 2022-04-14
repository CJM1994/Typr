import React from "react";

import Sidebar from "./Sidebar";
import Display from "./Display";

import "./App.scss";

function App() {
  return (
    <main className="layout">
      <div className="container">
        <Display />
        <Sidebar />
      </div>
    </main>
  );
}

export default App;