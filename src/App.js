import React, { useState, useRef } from "react";
import "./App.css";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import About from "./components/About";
import { useAnimationFrame } from "./components/animeHook";
import produce from "immer";

function App() {
  // Creating data structure: an row array with nested column arrays

  function createDataStructure(rowsNum, colsNum) {
    //Creating main row one-dimensional array which holds nested column arrays
    const rows = [];

    for (let i = 0; i < rowsNum; i++) {
      //Each element in our row array will be an array (a column array)
      rows[i] = [];
      // Creating a nested column array for each row element (25)
      for (let j = 0; j < colsNum; j++) {
        //assign value to 0 by default as cell is dead to start with
        rows[i][j] = 0;
      }
    }
    // Return the 2-dimensional array
    return rows;
  }

  // 25 x 25 dimension
  const twoDGrid = createDataStructure(25, 25);

  //Grid state
  const [grid, setGrid] = useState(twoDGrid);
  // console.log(grid);

  // Start the game/animation state
  const [play, setPlay] = useState(false);

  // useRef hook: is a mutable object that persists a value across multiple re-renderings
  //it has a 'current' property which allows us to read, write and change its value (without re-rendering the component)
  // We are basing the animation on the user clicking 'start/stop' which is our play state, this will happen multiple times, but our function only runs once, so we want the latest value of our 'play' state (otherwise function doesnt keep up to date with what the current value of our play state is)
  // We also want to store the latest state of our grid state in ref, so with each animation, it gets the latest state that its at
  //So we are storing the current value of our state in ref, and accessing the value using the hook's current property

  const gridRef = useRef(grid);
  gridRef.current = grid;
  const playingRef = useRef(play);
  //Assign the current value of play state to current property of the hook
  playingRef.current = play;

  // Generation state --> changes with animation, need to increment it each time animation runs
  const [gen, setGen] = useState(0);

  // Make cells random color state
  const [changeColour, setChangeColour] = useState(false);

  //Random cell colour generator
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Clear button: creating an empty grid
  function clearGrid(e) {
    e.preventDefault();
    const rows = [];

    for (let i = 0; i < 25; i++) {
      //Each element in our row array will be an array (a column array)
      rows[i] = [];
      // Creating a nested column array for each row element (25)
      for (let j = 0; j < 25; j++) {
        //assign value to 0 by default as cell is dead to start with
        rows[i][j] = 0;
      }
    }
    setGrid(rows);
    setGen(0);
    return grid;
  }

  // Deals with edge cases: the cells on edge of grid that dont have some neighbours aka rows above row[0] and column[0] and after row 25 (index 24)
  function getGSquare(i, j) {
    if (i < 0 || j < 0) {
      return null;
    }
    if (i > 24 || j > 24) {
      return null;
    }

    return gridRef.current[i][j];
  }

  // Toggle Play state for controls component
  function togglePlayState(e) {
    e.preventDefault();
    setPlay(!play);
  }

  const toggleCellState = (r, c) => (e) => {
    e.preventDefault();

    const newGrid = produce(grid, (draftGrid) => {
      draftGrid[r][c] = grid[r][c] === 0 ? 1 : 0;
    });

    setGrid(newGrid);
    return grid;

    // setGrid(oldGrid => {
    //   const newGrid = JSON.parse(JSON.stringify(oldGrid));
    //   newGrid[r][c] = (newGrid[r][c] === 1 ? 0 : 1);
    //   gridRef.current = newGrid;
    //   return newGrid
    // })
  };

  // Animation Logic function, animation runs accordingly
  // The logic which determines our animation: state of cell and neighbours state
  //  Iterating over our grid: for each cell we check neighbours state
  //  This function will produce a new grid each generation
  const runGame = () => {
    //This function doesn't run if the start button hasnt been clicked
    if (playingRef.current === false) {
      return false;
    }

    const newGrid = gridRef.current.map((r) => r.map((v) => v));
    // Change in generation
    let genChange = false;

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

        if (
          gridRef.current[i][j] === 1 &&
          (cellNeighbours < 2 || cellNeighbours > 3)
        ) {
          // Want to kill our current cell (whatever position that cell is at)
          //We kill it by assinging it back to 0
          newGrid[i][j] = 0;
          genChange = true;
        }
        //if the cell is dead, and has exactly 3 neighbors, its alive = 1
        if (gridRef.current[i][j] === 0 && cellNeighbours === 3) {
          // Want to change its state to bring it alive
          newGrid[i][j] = 1;
          genChange = true;
        }
      }
      // console.log(newGrid)
    }

    // Each animation frame updates generation if changes to generation
    // refresh
    if (genChange) {
      setGen((prevGen) => (prevGen += 1));
    }

    //Update state with draft state (changes to generation)
    setGrid(newGrid);
    gridRef.current = newGrid;
  };

  // Calling animation hook with runGame as cb to run the animation
  useAnimationFrame(runGame);

  return (
    <div
      className="App"
      style={{
        width: "auto",
        height: "auto",
        animation: "stretch",
        animationDuration: "2s",
        animationTimingFunction: "ease-out",
        animationDirection: "alternate",
        animationDelay: "0s",
        backgroundColor: "#2C5364",
      }}
    >
      <h1> Welcome To Conway's Game Of Life </h1>

      <Controls
        play={play}
        clearGrid={clearGrid}
        togglePlayState={togglePlayState}
        grid={grid}
        setGrid={setGrid}
        changeColour={changeColour}
        setChangeColour={setChangeColour}
      />

      <h3> Generation: {gen}</h3>
      <Grid
        grid={grid}
        toggleCellState={toggleCellState}
        changeColour={changeColour}
        getRandomColor={getRandomColor}
      />

      <About />
    </div>
  );
}

export default App;
