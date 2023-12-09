import React from 'react';
import { ACTIONS } from '../App';

const DigitButton = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, numberToAdd: digit })}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
