import React from "react";

//Passing in grid props from Grid component
function Cell({ r, c, toggleCellState, cellState }) {
  return (
    // returns the individual cell (box)
    <div
      style={{
        border: "dotted 1px black",
        width: 20,
        height: 20,
        // Never coming alive here when click but comes alive in animation 
        background: cellState === 0 ? "white" : "black",
      }}
      onClick={toggleCellState(r, c)}
    />
  );
}

export default Cell;
