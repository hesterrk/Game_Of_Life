import React, { useEffect, useState } from "react";

function Controls() {

    // Start the game state
    const [play, setPlay] = useState(false)




    return <div>
        <button onClick={() => setPlay(!play)}>Play</button>

    </div>

}


export default Controls