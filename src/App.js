import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import About from './components/About'

function App() {
  return (
    <div className="App">
      <h1> Welcome To Conway's Game Of Life </h1>
      <Controls />
      <Grid />
      <About/>
      
    </div>
  );
}

export default App;
