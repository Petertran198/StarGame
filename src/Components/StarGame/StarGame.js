import React, { useState, useEffect } from 'react';
import NumberButton from "./NumberButton";
import './StarGame.css';

const StarGame = () => {
      //stars holds a randome number of stars as state 
    //setStars holds the function to change that state
    const [stars, setStars] = useState(utils.random(1,9)); 
    // this state is in charge of keeping track of the amount of avaliable numbers left to be the answer
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    //canidate numbers are the  numbers being added to see if it equals the amount of stars shown in the game.
    const [canidateNums, setCanidateNums] = useState([0]);

    return (
        <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            
          <div className="star" ></div>            
          <div className="star" ></div>            
          <div className="star" ></div>            
          </div>
          <div className="right">
            {
              utils.range(1,9).map((num) => {
              return <NumberButton number={num}/>
            })
            }
          </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
      </div>
    )
}

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0),

  // create an array of numbers between min and max (edges included)
  // {length: max-min +1 } creates the array with specifed number of indexes that are undefined
  //Then it runs a map function on said indexes using (value)[Undefined] and indexKey as the current index postion
  // it then saves the index postion as value for that spot in the array postion (min + indexKey)
  // Ex Array.from({length: 2}, (v,i) => i);      // returns 0,1
  range: (min, max) => Array.from({ length: max - min + 1 }, (value, indexKey) => min + indexKey),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => { // arr = [1,2,3], max = 6 
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  },
};

export default StarGame;