import React from "react";

import "./App.scss";

import Sidebar from "./Sidebar/Sidebar";
import Display from "./Main/Display";

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
