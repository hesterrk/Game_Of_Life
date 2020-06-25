import React from "react";

function Controls({ play, clearGrid, togglePlayState, grid, setGrid }) {
  
  function randomPresetOne() {
    const rows = [];
    for (let i = 0; i < 25; i++) {
      //initialise the values with random 0's and 1's
      //Math.random() function returns a float/random number in the range 0 to less than 1
      const nestedCols = Array.from(new Array(25), () => {
        return Math.random() > 0.9 ? 1 : 0;
      });
      rows.push(nestedCols);
    }
    setGrid(rows);
    return grid;
  }

  function randomPresetTwo() {
    const rows = [];
    for (let i = 0; i < 25; i++) {
      //initialise the values with random 0's and 1's
      //Math.random() function returns a float/random number in the range 0 to less than 1
      const nestedCols = Array.from(new Array(25), () => {
        return Math.random() > 0.6 ? 1 : 0;
      });
      rows.push(nestedCols);
    }
    setGrid(rows);
    return grid;
  }

  return (
    <div>
      <button onClick={togglePlayState}>{play ? "stop" : "play"}</button>
      {/* // Reset state to empty grid */}
      <button onClick={clearGrid}>Clear</button>

      {/* Create premade living and dead cells (sample cell configurations the user can load and run)  */}
      <button onClick={() => randomPresetOne()}>Preset 1</button>

      <button onClick={() => randomPresetTwo()}>Preset 2</button>
      {/* <button> The Glider Scenario </button> */}
    </div>
  );
}

export default Controls;
