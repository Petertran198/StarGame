import React from 'react';
import StarGame from './StarGame'

const GameMode = (props) => {
//In charge of selecting the mode to play
    const handleBtn = () =>{
        props.handleBtnShown();
        props.handleTime(props.time);

    }
    return (
        <div>
            <button onClick={handleBtn}>{props.modeText}</button>
        </div>
    )
}

export default GameMode
