import React, { useState, useRef } from "react";
import "./App.css";
import Grid from "./components/Grid";
// import Controls from "./components/Controls";
import About from "./components/About";

function App() {
  // Creating data structure: an row array with nested column arrays

  function createDataStructure(rowsNum, colsNum) {
    //Creating main row one-dimensional array which holds nested column arrays
    //Each element in our row array will be an array (a column array)
    const rows = [];

    // For each row element in our rows array, we need the same number of columns
    for (let i = 0; i < rowsNum; i++) {
      // Creating a nested column array for each row element (25)
      // For each column array its getting the same length (25) and initialised withh 0's as we want our cells to be dead by default
      for (let j = 0; j < colsNum; j++) {
        let nestedCols = [i][j];
        console.log(nestedCols);
        // Adding our nested column arrays to our rows array
        rows.push(nestedCols);
      }
    }
    // Return the 2-dimensional array
    return rows;
  }

  // 25 x 25 dimension
  const twoDGrid = createDataStructure(25, 25);

  //Grid state
  const [grid, setGrid] = useState(twoDGrid);
  console.log(grid)

  // Start the game/animation state
  const [play, setPlay] = useState(false);

  // useRef hook: is a mutable object that persists a value across multiple re-renderings
  //it has a 'current' property which allows us to read, write and change its value (without re-rendering the component)
  // We are basing the animation on the user clicking 'start/stop' which is our play state, this will happen multiple times, but our function only runs once, so we want the latest value of our 'play' state (otherwise function doesnt keep up to date with what the current value of our play state is)
  // We also want to store the latest state of our grid state in ref, so with each animation, it gets the latest state that its at
  //So we are storing the current value of our state in ref, and accessing the value using the hook's current property

  const gridRef = useRef(grid);
  gridRef.current = grid;
  const playingRef = useRef(play);
  playingRef.current = play;

  // For Clear button: creating an empty grid
  // Pass this down

  function clearGrid(e) {
    e.preventDefault();
    let rows = [];
    for (let i = 0; i < 25; i++) {
      // Creating a nested column array for each row element (25)
      // For each column array its getting the same length (25) and initialised withh 0's as we want our cells to be dead by default
      for (let j = 0; j < 25; j++) {
        let nestedCols = [i][j];
        console.log(nestedCols);
        // Adding our nested column arrays to our rows array
        rows.push(nestedCols);
      }
    }
    setGrid(rows)
    return grid
  }


// Deals with edge cases: the cells on edge of grid that dont have some neighbours aka rows above row[0] and column[0] and after row 25 (index 24)
function getGSquare(i, j) {
  if (i < 0 || j < 0) {
    return null;
  }
  if (i > 24 || j > 24) {
    return null;
  }

  return gridRef.current[i][j];
} 










  return (
    <div
      className="App"
      style={{
        border: "2px solid green",
        width: "100vw",
        height: "100vh",
        animation: "stretch",
        animationDuration: "2s",
        animationTimingFunction: "ease-out",
        animationDirection: "alternate",
        animationDelay: "0s",
        backgroundColor: "#2C5364",
      }}
    >
      <h1> Welcome To Conway's Game Of Life </h1>

      {/* <Controls
        play={play}
        clearGrid={clearGrid}
      /> */}
      <Grid grid={grid}/>

      <About />
    </div>
  );
}

export default App;
