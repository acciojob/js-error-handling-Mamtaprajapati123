// Define custom error classes
class OutOfRangeError extends Error {
  constructor(value) {
    super(`Expression should only consist of integers and +-/* characters and not ${value}`);
    this.name = this.constructor.name;
  }
}

class InvalidExprError extends Error {
  constructor() {
    super('Expression should not have an invalid combination of expression');
    this.name = this.constructor.name;
  }
}

// Define the evaluation function
function evalString(expression) {
  // Check for invalid combinations of operators
  if (/(\+\+|\-\-|\*\*|\/\*|\*\/|\/\+|\+\*|\-\*|\*\-)/.test(expression)) {
    throw new InvalidExprError();
  }

  // Check for invalid starting operator
  if (/^[\/*+]/.test(expression)) {
    throw new SyntaxError('Expression should not start with invalid operator');
  }

  // Check for invalid ending operator
  if (/[\/*+-]$/.test(expression)) {
    throw new SyntaxError('Expression should not end with invalid operator');
  }

  // Evaluate the expression
  return eval(expression);
}

// Handle form submission
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const expression = form.elements.expression.value.trim();

  try {
    const result = evalString(expression);
    document.getElementById('result').textContent = `Result: ${result}`;
  } catch (error) {
    document.getElementById('result').textContent = `Error: ${error.message}`;
  }
});
