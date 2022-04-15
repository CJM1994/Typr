import React from "react";

import Sidebar from "./Sidebar";
import Display from "./Display";
import VirtualKeyboard from "./VirtualKeyboard";

import "./App.scss";

function App() {
  return (
    <main className="layout">
      <div className="container">
        <Display />
        <VirtualKeyboard id="virtual-keyboard" />
      </div>
      <Sidebar />
    </main>
  );
}

export default App;
