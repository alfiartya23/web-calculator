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

// Add event for all the button and display it to the display screen
const buttons = document.querySelectorAll(".button");

// Loop to add the event
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    // target to each element
    const target = event.target;

    inputDigit(target.innerText);
    updateDisplay();
  });
}
