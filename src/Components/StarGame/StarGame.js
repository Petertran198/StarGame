import React, { useState, useEffect } from 'react';
import NumberButton from "./NumberButton";
import StarIcon from "./StarIcon";
import './StarGame.css';
import PlayAgainBtn from './PlayAgainBtn';
import PreviousScore from './PreviousScore';

const StarGame = (props) => {
    //stars holds a random number of stars as state 
    //setStars holds the function to change that state
    const [stars, setStars] = useState(utils.random(1,9)); 
    // this state is in charge of keeping track of the amount of avaliable numbers left to be the answer
    const [availableNums, setAvailableNums] = useState(utils.range(1,9));
    //canidate numbers are the  numbers being added to see if it equals the amount of stars shown in the game.
    const [canidateNums, setCanidateNums] = useState([0]);
    //hold the state of the game's timer in seconds 
    const [timeLeftInSeconds, setTimeLeftInSeconds ]  = useState(props.time);
    const isGameOver = availableNums.length === 0 || timeLeftInSeconds === 0; 

    //Refresh page therefore remounting all components to get back to choose game mode btn
    const chooseNewMode = () =>{
      window.location.reload();
      return false;
    }


    //What it is doing here is call the setTimeout function once when the component renders. The setTimeout function will decrease the seconds by 1 continuosly making a loop
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

    //Reset state to play again
    const newGame = () =>{
      setAvailableNums(utils.range(1,9));
      setCanidateNums([]);
      setStars(utils.random(1,9));
      setTimeLeftInSeconds(props.time)
    }

    //called when using clicks on the number button
    //in charge of recieving the number clicked and then changing it to the correct status
    const onNumberClick = (btnNum, currStatus) =>{
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
        newCanidateKeys = canidateNums.filter(num => num !== btnNum);
      }
      //if the total amount or the new canidates so far doesn't sum up to the amount of stars 
      //then that means we dont have the correct answer yet so just mark it as a canidate        
      if(utils.sum(newCanidateKeys) !== stars){
          setCanidateNums(newCanidateKeys)
        } else {
        //else if the new canidates does equal to the amount of stars then we got it correct 
        // and we got to mark it as used and reset the canidate array so we can play another round
        // if canidate array is NOT reset the old data will be included when we play another round          
          const noUsedNums = availableNums.filter((num) => !newCanidateKeys.includes(num));
          setAvailableNums(noUsedNums);
          setCanidateNums([]);
          //We also got to redraw the number of star to start another round
          // randomSumIn takes 2 arguments 1 the array of available number and 2 the  number of stars u can display
          // this function allows us to randomly select a AVAILABLE num in our array up to 9 stars max 
          setStars(utils.randomSumIn(noUsedNums, 9));
        }
    }

    return (
        <div className="game ">
        <div className="help text-light">
          Pick 1 or more numbers that sum to the number of stars 
        </div>
        {isGameOver &&  <PreviousScore score={Math.abs(availableNums.length - 9)}/> }
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
        <div className={`timer ${timeLeftInSeconds > 5 ? 'text-light':'text-danger'}`}>Time Remaining: {timeLeftInSeconds} </div>
        <button  className="btn btn-outline-light mt-1 btn-block" onClick={chooseNewMode}>Switch Mode</button>
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