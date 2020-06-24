import React from "react";

//Passing in grid props from Grid component
function Cell({ r, c, toggle, cellpos }) {
  return (
          // returns the individual cell (box)
          <div
      style={{
        border: "dotted 1px black",
        width: 20,
        height: 20,
        background: cellpos === 0 ? "white" : "black",
      }}
      onClick={toggle(r, c)}
          />
      
     
   
  );
}

export default Cell;
