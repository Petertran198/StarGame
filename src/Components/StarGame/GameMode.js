import React from 'react';
const GameMode = (props) => {
//In charge of selecting the mode to play
    const handleBtn = () =>{
        props.handleBtnShown();
        props.handleTime(props.time);

    }
    return (
        <div>
            <button className="btn btn-outline-light btn-lg m-3  animate__animated animate__rubberBand " onClick={handleBtn}>{props.modeText}</button>
        </div>
    )
}

export default GameMode
