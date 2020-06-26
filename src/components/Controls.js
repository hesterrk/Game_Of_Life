import React from "react";

function Controls({
  play,
  clearGrid,
  togglePlayState,
  grid,
  setGrid,
  changeColour,
  setChangeColour,
  beacon,
  glider,
  pulsar
}) {
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
      <button onClick={togglePlayState}>{play ? "Stop" : "Play"}</button>
      {/* // Reset state to empty grid */}
      <button onClick={clearGrid}>Clear</button>

      {/* Create premade living and dead cells (sample cell configurations the user can load and run)  */}
      <button onClick={() => randomPresetOne()}>Random 1</button>

      <button onClick={() => randomPresetTwo()}>Random 2</button>

      <button onClick={beacon}> Beacon Preset </button>
      <button onClick={glider}> Glider Preset</button>
      <button onClick={pulsar}> Pulsar Preset</button>

      <label>
        <input
          type="checkbox"
          value={changeColour}
          onChange={() => setChangeColour(!changeColour)}
        />
        Colour Me!
      </label>
    </div>
  );
}

export default Controls;
