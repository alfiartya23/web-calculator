"use strict";

const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  isWaitForSecondNumber: false,
};

// Update display for number
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// Function for clear button
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.isWaitForSecondNumber = false;
}

// Show the number to the display screen
// and prevent zero number at the begining
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// Operator Function
function handleOperator(operator) {
  if (!calculator.isWaitForSecondNumber) {
    calculator.operator = operator;
    calculator.isWaitForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // reassign display number value, so for the next number starts from the begining
    calculator.displayNumber = "0";
  } else {
    alert("You have assign the operator!");
  }
}

// Inverese Number Function, make any number into negative
function inverseNumber() {
  // when the number is 0, the inverse calculation will not work
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

// Perform calculation to get the result
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // Object that will use as an argument in putHistory()
  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result,
  };
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

// Add event for all the button and display it to the display screen
const buttons = document.querySelectorAll(".button");

// Loop to add the event for each button
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    // target to each element
    const target = event.target;

    // Implement the clear button
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    // Implament the inverse operation
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    // Implement the equal operation
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    // Implement the handle operator "+" "-"
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
