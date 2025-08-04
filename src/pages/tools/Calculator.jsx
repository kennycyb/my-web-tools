import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handleToggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="calculator">
      <div className="tool-header">
        <h1>Calculator</h1>
        <p>Perform basic mathematical calculations</p>
      </div>

      <div className="calculator-container">
        <div className="calculator-display">
          <div className="display-value">{display}</div>
        </div>

        <div className="calculator-buttons">
          <button className="btn btn-function" onClick={clear}>C</button>
          <button className="btn btn-function" onClick={handleToggleSign}>±</button>
          <button className="btn btn-function" onClick={handlePercentage}>%</button>
          <button className="btn btn-operator" onClick={() => performOperation('÷')}>÷</button>

          <button className="btn btn-number" onClick={() => inputNumber(7)}>7</button>
          <button className="btn btn-number" onClick={() => inputNumber(8)}>8</button>
          <button className="btn btn-number" onClick={() => inputNumber(9)}>9</button>
          <button className="btn btn-operator" onClick={() => performOperation('×')}>×</button>

          <button className="btn btn-number" onClick={() => inputNumber(4)}>4</button>
          <button className="btn btn-number" onClick={() => inputNumber(5)}>5</button>
          <button className="btn btn-number" onClick={() => inputNumber(6)}>6</button>
          <button className="btn btn-operator" onClick={() => performOperation('-')}>-</button>

          <button className="btn btn-number" onClick={() => inputNumber(1)}>1</button>
          <button className="btn btn-number" onClick={() => inputNumber(2)}>2</button>
          <button className="btn btn-number" onClick={() => inputNumber(3)}>3</button>
          <button className="btn btn-operator" onClick={() => performOperation('+')}>+</button>

          <button className="btn btn-number btn-zero" onClick={() => inputNumber(0)}>0</button>
          <button className="btn btn-number" onClick={inputDecimal}>.</button>
          <button className="btn btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
