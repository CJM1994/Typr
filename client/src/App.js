import "./App.css";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    testResponse: "hi",
  });

  useEffect(() => {
    axios.get("/test").then((res) => {
      setState({ testResponse: res.data });
      console.log(res.data);
    });
  }, []);

  return <div className="App">Response = {state.testResponse}</div>;
}

export default App;
