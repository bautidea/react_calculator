import { useReducer } from 'react';
import './styles.css';

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
    return result;
  };

  switch (action.type) {
    case 'addDigit': {
      if (checkIfOperator() && !state.operator)
        return {
          ...state,
          currentOperand: `${action.numberToAdd}`,
          previousOperand: '',
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.numberToAdd}`,
      };
    }

    case 'delDigit': {
      if (checkIfOperator()) return { ...state };

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    }

    case 'clear': {
      return {
        currentOperand: '',
        previousOperand: '',
        operator: '',
      };
    }

    case 'operation': {
      if (!state.currentOperand) {
        //  If there is a previousOperand and an operator then the operation can be changed.
        if (state.previousOperand && state.operator) {
          return {
            ...state,
            operator: action.selectedOperator,
          };
          // Else we cant modify the operation.
        } else return { ...state };
      }

      if (state.currentOperand === '.' || state.currentOperand === 'Error')
        return { ...state };

      return {
        previousOperand:
          !checkIfOperator() && state.operator
            ? `${evaluateResult()}`
            : `${state.currentOperand}`,
        operator: action.selectedOperator,
        currentOperand: '',
      };
    }

    case 'evaluate': {
      if (
        !state.currentOperand ||
        state.currentOperand === '.' ||
        !state.operator
      )
        return { ...state };

      console.log(evaluateResult());
      return {
        currentOperand: `${evaluateResult()}`,
        operator: '',
        previousOperand: `${state.previousOperand} ${state.operator} ${state.currentOperand}`,
      };
    }
    default:
      return state;
  }
};

function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
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

        <button
          onClick={() => dispatch({ type: 'operation', selectedOperator: '/' })}
        >
          ÷
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 7 })}>
          7
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 8 })}>
          8
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 9 })}>
          9
        </button>

        <button
          onClick={() => dispatch({ type: 'operation', selectedOperator: '*' })}
        >
          *
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 4 })}>
          4
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 5 })}>
          5
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 6 })}>
          6
        </button>

        <button
          onClick={() => dispatch({ type: 'operation', selectedOperator: '+' })}
        >
          +
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 1 })}>
          1
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 2 })}>
          2
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 3 })}>
          3
        </button>

        <button
          onClick={() => dispatch({ type: 'operation', selectedOperator: '-' })}
        >
          -
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 0 })}>
          0
        </button>

        <button
          onClick={() => {
            dispatch({ type: 'addDigit', numberToAdd: '.' });
          }}
        >
          .
        </button>

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
