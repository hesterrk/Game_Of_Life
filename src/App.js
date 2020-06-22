import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="App">
      <h1> Welcome To Conway's Game Of Life </h1>
      <Grid />
    </div>
  );
}

export default App;
