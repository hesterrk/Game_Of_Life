import React from "react";

//Passing in grid props from Grid component
function Cell({ r, c, toggleCellState, cellState, changeColour, getRandomColor }) {
  return (
    // returns the individual cell (box)
    <div
      style={{
        border: "dotted 1px black",
        width: 20,
        height: 20,
        background: cellState  ? changeColour ? getRandomColor() : "black" : "white",

        
      }}
      onClick={toggleCellState(r, c)}
    />
  );
}

export default Cell;
