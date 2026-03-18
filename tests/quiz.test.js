// tests/quiz.test.js

const { calculatePercentage, calculateGrade, isPass } = require("../js/utils");

// Test 1: Percentage calculation
test("percentage calculation", () => {
  expect(calculatePercentage(4, 5)).toBe(80);
});

// Test 2: Grade calculation
test("grade calculation", () => {
  expect(calculateGrade(85)).toBe("A");
  expect(calculateGrade(72)).toBe("B");
  expect(calculateGrade(55)).toBe("C");
  expect(calculateGrade(40)).toBe("D");
});

// Test 3: Pass / Fail logic
test("pass/fail logic", () => {
  expect(isPass(30)).toBe(false);
  expect(isPass(50)).toBe(true);
  expect(isPass(75)).toBe(true);
});
