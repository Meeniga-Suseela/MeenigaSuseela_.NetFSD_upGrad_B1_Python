// js/utils.js

//const { yieldExpression } = require("@babel/types");
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
// Save data to localStorage
function saveToLocalStorage(key, value) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}


// Retrieve data from localStorage
function getFromLocalStorage(key) {
  if (typeof localStorage !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
}


// Calculate quiz score percentage
function calculateScore(questions, userAnswers) {
  let score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) score++;
  });
  return Math.round((score / questions.length) * 100);
}

// Calculate percentage (used for testing)
function calculatePercentage(score, total) {
  return Math.round((score / total) * 100);
}

// Calculate grade based on percentage
function calculateGrade(percentage) {
  if (percentage >= 85) return "A";
  if (percentage >= 70) return "B";
  if (percentage >= 50) return "C";
  if (percentage >= 35) return "D";
  return "F";
}

// Determine pass/fail
function isPass(percentage) {
  return percentage >= 50;
}

// Generate performance message
function getPerformanceMessage(percentage) {
  switch (true) {
    case percentage >= 90:
      return "Excellent work!";
    case percentage >= 70:
      return "Good job!";
    case percentage >= 50:
      return "You can do better!";
    default:
      return "Please try again!";
  }
}

// Export functions for Jest
if (typeof module !== "undefined") {
  module.exports = {
    saveToLocalStorage,
    getFromLocalStorage,
    calculateScore,
    getPerformanceMessage,
    calculatePercentage,
    calculateGrade,
    isPass
  };
}
