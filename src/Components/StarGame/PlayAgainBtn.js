import React from 'react'

export const PlayAgainBtn = (props) => {
    return (
        <div className="game-done">
            <button className="message" onClick={props.newGame}>Play Again</button>
        </div>
    )
}


export default PlayAgainBtn;