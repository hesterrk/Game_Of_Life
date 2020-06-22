import React from "react";
import produce from "immer";

//Passing in grid props from Grid component
function Cell({ grid, setGrid }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(25, 22px)` }}>
      {grid.map((row, r_i) =>
        row.map((col, col_i) => (
          // returns the individual cell (box)
          <div
            key={`${r_i}+${col_i}`}
            style={{
              border: "dotted 1px black",
              width: 20,
              height: 20,
              background: grid[r_i][col_i] === 0 ? "white" : "black",
            }}
            onClick={() => {
              //Toggling each cell in the grid's own state
              //Using produce to prevent the mutation of the original grid state, instead we create a copy and change this copy in order to change and toggle the state
              const toggleGrid = produce(grid, (copyGridState) => {
                //assigning our copy state to value of our original state, whether the cell is alive or dead
                copyGridState[r_i][col_i] = grid[r_i][col_i] === 0 ? 1 : 0;
              });
              setGrid(toggleGrid);
            }}
          />
        ))
      )}
    </div>
  );
}

export default Cell;
