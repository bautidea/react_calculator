import React from 'react';
import { ACTIONS } from '../App';

const OperatorButton = ({ operator, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          selectedOperator: operator,
        })
      }
    >
      {operator}
    </button>
  );
};

export default OperatorButton;
