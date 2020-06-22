import React from "react";

function Grid() {
  // Creating data structure: an row array with nested column arrays

  function createDataStructure(rowsNum, colsNum) {
    //Creating main row one-dimensional array which holds nested column arrays
      //Each element in our row array will be an array (a column array)
      const rows = [];
      
    // For each row element in our rows array, we need the same number of columns
    for (let i = 0; i < rowsNum; i++) {
      console.log(rowsNum[i], "hi");
      // Creating a nested column array for each row element (25)
      // For each column array its getting the same length (25) and initialised withh 0's as we want our cells to be dead by default
      const nestedCols = Array.from(new Array(colsNum), () => {
        return 0;
      });
        // Adding our nested column arrays to our rows array 
        rows.push(nestedCols);

    
    }
      // Return the 2-dimensional array 

      return rows

  }

  return <div></div>;
}

export default Grid;
