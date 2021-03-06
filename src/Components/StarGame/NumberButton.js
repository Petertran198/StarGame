import React from 'react';

//Holds the values of the colors of the buttons
const colors = {
    available: "lightgreen",
    used: "lightgray",
    wrong: "red",
    canidate: "lightblue"
}

const NumberButton = (props) => {
    const statusColor = {
        backgroundColor: colors[props.status] 
    }
    return(
        <button className="number" style={statusColor} onClick={()=> props.onNumberClick(props.number, props.status)}>{props.number}</button>
    )
}


export default NumberButton;