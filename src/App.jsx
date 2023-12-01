import { useReducer } from 'react';
import './styles.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'addDigit': {
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${action.numberToAdd}`,
      };
    }

    case 'delDigit': {
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
      if (!state.currentOperand) return { ...state };
      return {
        operator: action.selectedOperator,
        previousOperand: `${state.currentOperand}`,
        currentOperand: '',
      };
    }

    case 'evaluate': {
      if (!state.currentOperand || !state.operator) return { ...state };

      const result = eval(
        `${state.previousOperand} ${state.operator} ${state.currentOperand}`
      );

      return {
        previousOperand: `${state.previousOperand} ${state.operator} ${state.currentOperand}`,
        operator: '',
        currentOperand: result,
      };
    }
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
          onClick={() => dispatch({ type: 'operation', selectedOperator: '/' })}
        >
          -
        </button>

        <button onClick={() => dispatch({ type: 'addDigit', numberToAdd: 0 })}>
          0
        </button>

        <button
          onClick={() => dispatch({ type: 'addDigit', numberToAdd: '.' })}
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
