import React, { useState } from 'react';
import GameMode from './GameMode';
import StarGame from './StarGame';

const GameBoard = () => {
    // in charge of keepingtrack if the buttons are shown or not
    const [isBtnShown, setIsBtnShown] = useState(true);
    // in charge of keeping track of the time for the StarGame
    const [time, setTime] = useState(10);

    // Levels of Game
    const gameModes = [
        {modeText: "Easy", Time: 16},
        {modeText: "Medium", Time: 12},
        {modeText: "Hard", Time: 6},
    ];

    //function needed to pass time of each button back up to use as time in <StarGame/>
    const handleTime = (time) =>{
        setTime(time)
    }

    //function needed to pass data that the btn has been clicked back up. If btn has been slected there is no point of still showing it 
    const handleBtnShown = () =>{
        setIsBtnShown(false);
    }

    return (
        <div>
            <h1>Welcome to the StarGame</h1>
            {
              isBtnShown ? gameModes.map((mode) =>( 
                <GameMode
                     modeText={mode.modeText}
                     time={mode.Time}
                     handleBtnShown={handleBtnShown}
                     handleTime={handleTime}
                />))
                : <StarGame time={time}/> 
            }
            

        </div>
    )
}

export default GameBoard
