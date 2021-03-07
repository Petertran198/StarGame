import React, { useState } from 'react';
import GameMode from './GameMode';
import StarGame from './StarGame';
import './GameBoard.css';

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
        <div className="gameBoard">
            <h1 className="text-center pt-3">Welcome to the StarGame</h1>
            <div className ="btn-flex-container">
                {
                isBtnShown ? gameModes.map((mode) =>( 
                    <GameMode 
                        key={mode.modeText}
                        modeText={mode.modeText}
                        time={mode.Time}
                        handleBtnShown={handleBtnShown}
                        handleTime={handleTime}
                    />))
                    : <StarGame time={time}/> 
                }

            </div>
        </div>
    )
}

export default GameBoard
