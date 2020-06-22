import React from "react";

function About() {
  return (
    <div>
      <h3> The Rules of the Game: </h3>
      <ol>
        <li>
          A live cell with fewer than two live neighbours dies, as if by
          underpopulation
        </li>
        <li>
          A live cell surrounded by two or three live neighbours lives on to the
          next generation.
        </li>
        <li>
          A dead cell with exactly three live neighbours becomes a live cell, as
          if by reproduction
        </li>
        <li>
          A live cell surrounded by more than three live neighbours dies, as if
          by overpopulation.
        </li>
        <p></p>
      </ol>

      <h3> About the Algorithm: </h3>
    </div>
  );
}

export default About;
