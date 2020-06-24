import React, { useEffect, useState, useRef } from "react";
import { useAnimationFrame } from './animeHook'

function Controls({ play, clearGrid }) {
  // Start the game state
  const [play, setPlay] = useState(false);


  const startingRef = useRef(play);
  //Assign the current value of play state to current property of the hook
  startingRef.current = play;
  const gridRef = useRef();
  gridRef.current = grid;

  // // Deals with edge cases: the cells on edge of grid that dont have some neighbours aka rows above row[0] and column[0] and after row 25 (index 24)
  // function getGSquare(i, j) {
  //   if (i < 0 || j < 0) {
  //     return null;
  //   }
  //   if (i > 24 || j > 24) {
  //     return null;
  //   }

  //   return grid[i][j];
  // }

  const runGame = (timestamp) => {
    //This function doesn't run if the start button hasnt been clicked
    if (startingRef.current === false) {
      return false;
    }
    // The logic which determines our animation: state of cell and neighbours state
    //  Iterating over our grid: for each cell we check neighbours state
    //  This function will produce a new grid each generation
    // https://css-tricks.com/using-requestanimationframe-with-react-hooks/
    //const newGenGrid = produce(grid, (draftGState) => {
    
    const newGrid = gridRef.current.map(r => r.map(v => v))
    
    //row
    for (let i = 0; i < 25; i++) {
      //column
      for (let j = 0; j < 25; j++) {
        //Cell neighbours: N, W, E, S, NW, NE, SE, SW --> (top, bottom, left, right and all diagnols)

        // By default the cell has 0 neighbours
        let cellNeighbours = 0;

        //N
        if (getGSquare(i - 1, j) === 1) {
          cellNeighbours += 1;
        }
        // S
        if (getGSquare(i + 1, j) === 1) {
          cellNeighbours += 1;
        }
        // NW
        if (getGSquare(i - 1, j - 1) === 1) {
          cellNeighbours += 1;
        }
        // W
        if (getGSquare(i, j - 1) === 1) {
          cellNeighbours += 1;
        }
        // SW
        if (getGSquare(i + 1, j - 1) === 1) {
          cellNeighbours += 1;
        }
        // NE
        if (getGSquare(i - 1, j + 1) === 1) {
          cellNeighbours += 1;
        }
        // E
        if (getGSquare(i, j + 1) === 1) {
          cellNeighbours += 1;
        }
        // // SE
        if (getGSquare(i + 1, j + 1) === 1) {
          cellNeighbours += 1;
        }

        // Applying the game rules here
        // 1. live cell has less than 2 neighbours it dies(underpop) 2. or more than 3 it dies (overpop)
        
        if (gridRef.current[i][j] === 1 && (cellNeighbours < 2 || cellNeighbours > 3)) {
          // Want to kill our current cell (whatever position that cell is at)
          //We kill it by assinging it back to 0
          newGrid[i][j] = 0;
        }
        //if the cell is dead, and has exactly 3 neighbors, its alive = 1
        if (gridRef.current[i][j] === 0 && cellNeighbours === 3) {
          // Want to change its state to bring it alive
          newGrid[i][j] = 1;
        }
        console.log(gridRef.current[i][j], newGrid[i][j])
      }
    }
  //});
    //Update state with draft state (changes to generation)
    setGrid(newGrid);
    gridRef.current = newGrid
    console.log('what')
    return false
    //animProgress(timestamp);
    // requestAnimationFrame(runGame);

    /*if (startingRef.current === true) {
      requestAnimationFrame(runGame)
    }*/
  };

  // useEffect: animation func runs everytime play is true
  /*useEffect(() => {
    return () => cancelAnimationFrame(startingRef.current);
  }, [play]);*/


  
  useAnimationFrame(runGame)

  // // For Clear button: creating an empty grid
  // function clearGrid() {
  //   const rows = [];
  //   for (let i = 0; i < 25; i++) {
  //     const nestedCols = Array.from(new Array(25), () => {
  //       return 0;
  //     });
  //     rows.push(nestedCols);
  //   }
  //   setGrid(rows);
  //   return grid;
  // }

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
      <button
        onClick={(e) => {
          e.preventDefault();
          setPlay((play) => !play);
          // setPlay(!play);
          // if (!play) {
          //     startingRef.current = true;
          //     requestAnimationFrame(runGame);
          // }
        }}
      >
        {play ? "stop" : "play"}
      </button>
      {/* // Reset state to empty grid */}
      <button onClick={() => clearGrid()}>Clear</button>

      {/* Create premade living and dead cells (sample cell configurations the user can load and run)  */}
      <button onClick={() => randomPresetOne()}>Preset 1</button>

      <button onClick={() => randomPresetTwo()}>Preset 2</button>
    </div>
  );
}

export default Controls;

