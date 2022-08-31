"use strict";

// Access and store in Local Storage
const CACHE_KEY = "calculation_history";

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;
    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);
    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  }
}

// Get data from Local Storage
// This function returns array from Local Storage if the value is available with JSON.parse()
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || []);
  } else {
    return [];
  }
}

// Function to render all data calculation history in the table
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // Always clear HTML content on historyList element so as not to show double data
  historyList.innerHTML = "";

  for (let history of historyData) {
    let row = document.createComment("tr");
    row.innerHTML = "<td>" + history.firstNumber + "</td>";
    row.innerHTML += "<td>" + history.operator + "</td>";
    row.innerHTML += "<td>" + history.secondNumber + "</td>";
    row.innerHTML += "<td>" + history.result + "</td>";

    historyList.appendChild(row);
  }
}

renderHistory();
