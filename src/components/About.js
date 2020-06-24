import React from "react";

function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '50%', padding: '1rem', margin: 'auto', background: '#D7DDE8', marginTop: '20px'}}>
      <h3> The Rules of the Game: </h3>
      <ul>
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
        </ul>
        </div>
      <div style={{width: '50%', padding: '1rem', margin: 'auto', background: '#D7DDE8', marginTop: '20px'}}>
      <h3> About the Algorithm: </h3>
      <p>
        The creator of this game, John Conway was an important mathematician
        who made numerous of important contributions throughout his life to the
        subject. The Game of Life is a program that simulates a two dimensional
        cellular automaton. Each cell is its own entity which can either be dead
        or alive -- white or black, respectively. A cell has its own
        neighbourhood, which is defined by the eight cells around it. The change
        in the cell's state is determined by its neighbourhood. The idea of
        generations is simply how the cell and the cell's neighbours change
        after each frame of the animation. A cell does not die or live until the
        end of the frame/generation.
      </p>

      <p>
        This Algorithm involves two key concepts. First being
        'Turing-completeness', whcih means a system of data-manipulation rules
        that can be used to simulate any Turing machine. The second being
        'Deterministic', where the Algorithm's resulting behaviour, which is the
        generational change, is entirely determined by its initial state and
        inputs. The game does not exibit random behaviour, the cells state and
        neighbouring state (which is determined by the above rules) determine
        how the generations evolve over time.
        </p>
        </div>
    </div>
  );
}

export default About;
