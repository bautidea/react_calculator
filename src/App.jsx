import { useReducer } from 'react';
import './styles.css';

const reducer = ({ currentOperand, previousOperand, operator }, action) => {
  switch (action.type) {
    case 'addNumber': {
      if (currentOperand)
        return {
          currentOperand: Number(`${currentOperand}${action.numberToAdd}`),
        };
      return { currentOperand: Number(action.numberToAdd) };
    }
  }
};

function App() {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  const handleNumberClick = (number) => {
    dispatch({
      type: 'addNumber',
      numberToAdd: number,
    });
  };

  return (
    <>
      <div className="calculator">
        <div className="output">
          <div className="previous-operand">
            {previousOperand} {operator}
          </div>
          <div className="current-operand">{currentOperand}</div>
        </div>
        <button className="span-two">AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="span-two">=</button>
      </div>
    </>
  );
}

export default App;
