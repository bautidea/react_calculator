import { useReducer } from 'react';
import './styles.css';
import DigitButton from './components/DigitButton';
import OperatorButton from './components/OperatorButton';

export const ACTIONS = {
  ADD_DIGIT: 'addDigit',
  DELETE_DIGIT: 'delDigit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'operation',
  EVALUATE: 'evaluate',
};

const reducer = (state, action) => {
  // Declaring function to check if there is an operator in the 'previousOperator'.
  // If there is an operator it means that a result is being shown, and then it can be modified.
  const checkIfOperator = () => {
    if (!state.previousOperand) return false;

    const operatorsToCheck = ['/', '*', '-', '+'];
    return operatorsToCheck.some((operator) =>
      state.previousOperand.includes(operator)
    );
  };

  const evaluateResult = () => {
    const result = eval(
      `${state.previousOperand} ${state.operator} ${state.currentOperand}`
    );

    if (Number.isNaN(result) || !Number.isFinite(result)) return 'Error';
    return String(result);
  };

  switch (action.type) {
    case ACTIONS.ADD_DIGIT: {
      // If currentOperand contains a '.' already i return the state as it is.
      if (action.numberToAdd === '.') {
        if (state.currentOperand.includes('.')) return state;

        if (state.currentOperand.length === 0)
          return { ...state, currentOperand: `0${action.numberToAdd}` };
      }

      if (action.numberToAdd === '0' && state.currentOperand === '0')
        return state;

      if (checkIfOperator() && !state.operator)
        return {
          ...state,
          currentOperand: action.numberToAdd,
          previousOperand: '',
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.numberToAdd}`,
      };
    }

    case ACTIONS.DELETE_DIGIT: {
      if (checkIfOperator()) return state;

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }

    case ACTIONS.CLEAR: {
      return initialState;
    }

    case ACTIONS.CHOOSE_OPERATION: {
      if (!state.currentOperand) {
        //  If there is a previousOperand and an operator then the operation can be changed.
        if (state.previousOperand && state.operator) {
          return {
            ...state,
            operator: action.selectedOperator,
          };
          // Else we cant modify the operation.
        } else return state;
      }

      if (state.currentOperand === '.' || state.currentOperand === 'Error')
        return state;

      return {
        previousOperand:
          (!checkIfOperator() || state.previousOperand.startsWith('-')) &&
          state.operator
            ? evaluateResult()
            : state.currentOperand,
        operator: action.selectedOperator,
        currentOperand: '',
      };
    }

    case ACTIONS.EVALUATE: {
      if (
        !state.currentOperand ||
        state.currentOperand === '.' ||
        !state.operator
      )
        return state;

      return {
        currentOperand: evaluateResult(),
        operator: '',
        previousOperand: `${state.previousOperand} ${state.operator} ${state.currentOperand}`,
      };
    }
    default:
      return state;
  }
};

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operator: '',
};

function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <>
      <div className="calculator">
        <div className="output">
          <div className="previous-operand">
            {previousOperand} {operator}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>

        <button
          className="span-two"
          onClick={() => dispatch({ type: 'clear' })}
        >
          AC
        </button>

        <button onClick={() => dispatch({ type: 'delDigit' })}>DEL</button>

        <OperatorButton operator={'/'} dispatch={dispatch} />

        <DigitButton digit={'7'} dispatch={dispatch} />

        <DigitButton digit={'8'} dispatch={dispatch} />

        <DigitButton digit={'9'} dispatch={dispatch} />

        <OperatorButton operator={'*'} dispatch={dispatch} />

        <DigitButton digit={'4'} dispatch={dispatch} />

        <DigitButton digit={'5'} dispatch={dispatch} />

        <DigitButton digit={'6'} dispatch={dispatch} />

        <OperatorButton operator={'+'} dispatch={dispatch} />

        <DigitButton digit={'1'} dispatch={dispatch} />

        <DigitButton digit={'2'} dispatch={dispatch} />

        <DigitButton digit={'3'} dispatch={dispatch} />

        <OperatorButton operator={'-'} dispatch={dispatch} />

        <DigitButton digit={'0'} dispatch={dispatch} />

        <DigitButton digit={'.'} dispatch={dispatch} />

        <button
          className="span-two"
          onClick={() => dispatch({ type: 'evaluate' })}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;
