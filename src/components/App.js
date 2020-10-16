import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
//import GameOverModal from "./GameOverModal";

import * as w from '../data/words.json';
import * as l from '../data/letters.json';

import { colors, contentWidth } from "./GlobalStyles";
import { useState } from "react";
const initialGameState = { started: false, over: false, win: false };

const App = () => {

  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "" ,revealed: []});
  const [startLabel, setStartLabel] = useState('Start')
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const words = w.default;
  const letters = l.default;
  const getNewWord = (generate = false) =>{
    if(word.str === "" || generate){
        let newWord = words[Math.floor(Math.random() * words.length)];
        setWord({...word, str: newWord, revealed: Array(newWord.length).fill(" ")});
    }
    
  }

  const handleReset = () =>{
    getNewWord(true)
    setWrongGuesses([])
    setUsedLetters([])

  }

  const getAllIndexes = (arr, val) => {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const handleEndGame = (win) => {
  setGame({...game, over: true, win: win});
  alert(`Game Over! You ${win ? "win" : "lose"}`);
};

const watchGameProgress = (arr) =>{
  
  let wordstr = word.str.split("").sort().join("")
  
  if(arr.length === word.revealed.length){
    let win = arr.sort().join("") === wordstr ? true : false;
    if(win){
      handleEndGame(win)
    }
  } else if(arr.length === 10){
    handleEndGame(false)
  }
}

  const handleGuess = (ltr) => {
    
    let indices = getAllIndexes(word.str, ltr)
    if(indices.length === 0){
      let usedLtrs = [...wrongGuesses, ltr]
      setWrongGuesses(usedLtrs)
      setUsedLetters([...usedLetters, ltr]) 
      watchGameProgress(usedLtrs)
    } else{
      let revealed2 = [...word.revealed]
      indices.forEach(idx => revealed2.splice(idx,1,ltr))
      setWord({...word, revealed: [...revealed2] })
      let usedLtrs2 = [...usedLetters, ...Array(indices.length).fill(ltr)]
      
      setUsedLetters(usedLtrs2) 
      watchGameProgress(revealed2)
    } 
    
  };
  const handleStart = () => {
    if(word.str === ""){
      getNewWord();
    }
    if(startLabel === 'Continue' || startLabel === "Start"){
      setStartLabel('Pause')
    } else {setStartLabel('Continue')}

    setGame({ ...game, started: !game.started });
  };
  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
      <Button onClickFunc={handleStart}>{startLabel}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
      <>
        <Container>
          <Deadman />
          <RightColumn>
            <DeadLetters letters={wrongGuesses}/>
            <TheWord secretWord={word}/>
          </RightColumn>
        </Container>
        <Keyboard abc={letters} usedLetters={usedLetters} handleGuess={handleGuess}/>
      </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
