import React from "react";
import styled from "styled-components";
import LetterKey from "./LetterKey";

import { colors, contentWidth } from "./GlobalStyles";

const Keyboard = ({abc, usedLetters, handleGuess}) => (
   
  <Wrapper>
    { abc.map((letter) => {
     let isDisabled = usedLetters.includes(letter)
     return <LetterKey key={letter} letter={letter} isDisabled={isDisabled} handleGuess={handleGuess}/>  
    })
    }
  </Wrapper>
);

const Wrapper = styled.div`
  background: ${colors.yellow};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px 12px;
  max-width: ${contentWidth};
  min-width: 320px;
`;

export default Keyboard;
