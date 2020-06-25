import React from "react";
import Cell from "./Cell";

function Grid({ grid, toggleCellState, changeColour, getRandomColor }) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(25, 22px)`, boxShadow: '5px 10px 18px #171515' }}>
        {grid.map((row, r_i) =>
          row.map((col, col_i) => (
            // returns the individual cell component (box)
            <Cell
              key={`${r_i}+${col_i}`}
              r={r_i}
              c={col_i}
              toggleCellState={toggleCellState}
              cellState={grid[r_i][col_i]}
              changeColour={changeColour}
              getRandomColor={getRandomColor}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Grid;
