import React from 'react';


const NumberButton = (props) => {

    return(
        <button className="number" style={{backgroundColor: colors[props.status] }} >{props.number}</button>
    )
}

//Holds the values of the colors of the buttons
const colors = {
    available: "lightgreen",
    used: "lightgray",
    wrong: "red",
    canidate: "lightblue"
  }
export default NumberButton;