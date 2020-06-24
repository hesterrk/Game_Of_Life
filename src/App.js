import React from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import About from './components/About'

function App() {
  return (
    <div className="App" style={{border: '2px solid green', width: '100vw', height: '100vh', animation: 'stretch', animationDuration: '2s', animationTimingFunction:'ease-out', animationDirection: 'alternate', animationDelay: '0s', backgroundColor: '#2C5364' }}>
      <h1> Welcome To Conway's Game Of Life </h1>
      <Controls />
      <Grid />
      <About/>
      
    </div>
  );
}

export default App;
