import React, { useEffect, useState } from "react";

function Controls() {
  // Start the game state
  const [play, setPlay] = useState(false);

  return (
    <div>
      <button onClick={() => setPlay(!play)}>{play ? "play" : "stop"}</button>
    </div>
  );
}

export default Controls;
