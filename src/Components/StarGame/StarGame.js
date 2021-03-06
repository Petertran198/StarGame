import React, { useState, useEffect } from 'react';
import NumberButton from "./NumberButton";
import StarIcon from "./StarIcon";
import './StarGame.css';
import PlayAgainBtn from './PlayAgainBtn';

const StarGame = (props) => {
    //stars holds a random number of stars as state 
    //setStars holds the function to change that state
    const [stars, setStars] = useState(utils.random(1,9)); 
    // this state is in charge of keeping track of the amount of avaliable numbers left to be the answer
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    //canidate numbers are the  numbers being added to see if it equals the amount of stars shown in the game.
    const [canidateNums, setCanidateNums] = useState([0]);
    const [timeLeftInSeconds, setTimeLeftInSeconds ]  = useState(props.time);
    const isGameOver = availableNums.length === 0 || timeLeftInSeconds == 0; 

    const chooseNewMode = () =>{
      window.location.reload();
      return false;
    }

    useEffect(() => {
      let timerId
      if(timeLeftInSeconds > 0){
          timerId = setTimeout(() => {
          setTimeLeftInSeconds(timeLeftInSeconds - 1)
        }, 1000);
      }
      return () => {
        clearTimeout(timerId)
      }
    })


    //check to see if the isNotCanidateNums array is greater then the amount of stars
    //if the total of isNotCanidateNums is greater than the number of stars then the answer is wrong
    const isNotCanidateNums = utils.sum(canidateNums) > stars;
    //This will return a status code for each num depending if it is used, wrong, canidate, etc 
    //We then use the return value to change the color of the button to its correct status
    const checkNumStatus = (num) =>{
        if (!availableNums.includes(num)) {
            return "used";
        }
        if(canidateNums.includes(num)){
          return isNotCanidateNums ? "wrong": "canidate"
        }
        return 'available';
    }    

    const newGame = () =>{
      setAvailableNums(utils.range(1,9));
      setCanidateNums([]);
      setStars(utils.random(1,9));
      setTimeLeftInSeconds(props.time)
    }

    const selectTimeForGame = (time) =>{
      setTimeLeftInSeconds(time);
    }

    const onNumberClick = (btnNum, currStatus) =>{
    //called when using clicks on the number button
    //in charge of recieving the number clicked and then changing it to the correct status 
    //If number is used just return so u can't click on it 
      if(currStatus === "used"){
        return;
      }
      // Container to keep track of the new Canidate keys
      let newCanidateKeys; 
      //check to see if key status is avialable
      if(currStatus === 'available'){
        newCanidateKeys = [...canidateNums, btnNum];
      } else  {
        //if btnStatus is not "avilable" it can only be wrong or canidate because our first condition checks to see if btnNum is USED and if it is return  
        newCanidateKeys = canidateNums.filter(num => num != btnNum);
      }
        //check to see if the sum of the canidate keys are not equal to the sum of stars
        if(utils.sum(newCanidateKeys) !== stars){
          setCanidateNums(newCanidateKeys)
        } else {
          const noUsedNums = availableNums.filter((num) => !newCanidateKeys.includes(num));
          setAvailableNums(noUsedNums);
          setCanidateNums([]);
          setStars(utils.randomSumIn(noUsedNums, 9));
        }
    }

    return (
        <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {
              isGameOver ? <PlayAgainBtn newGame={newGame}/> :
              utils.range(1,stars).map((s)=>{
                return <StarIcon key={s}/>
              })
            }         
          </div>
          <div className="right">
            {
              utils.range(1,9).map(num => {
              return (<NumberButton
                         number={num}
                         key={num}
                         status={checkNumStatus(num)}
                         onNumberClick={onNumberClick}
                         />)
              })
            }
          </div>
        </div>
        <div className="timer">Time Remaining: {timeLeftInSeconds} </div>
        <button onClick={chooseNewMode}>Switch Mode</button>
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