import React from "react";
import Cell from "./Cell";

function Grid({ grid, toggleCellState }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(25, 22px)` }}>
        {grid.map((row, r_i) =>
          row.map((col, col_i) => (
            // returns the individual cell component (box)
            <Cell
              key={`${r_i}+${col_i}`}
              r={r_i}
              c={col_i}
              toggleCellState={toggleCellState}
              cellposition={grid[r_i][col_i]}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
