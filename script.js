
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    function updateDisplay(value) {
        display.textContent = value;
    }

    function calculate(a, op, b) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (b !== 0 ? (a / b).toString() : 'Error'); // Handle division by zero
            default: return '';
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                // Prevent multiple decimal points in the current input
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                updateDisplay(currentInput);
            } else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                updateDisplay('0');
            } else if (value === '=') {
                if (previousInput && operator) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    updateDisplay(currentInput);
                    previousInput = '';
                    operator = '';
                }
            } else { // Operator buttons
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            }
        });
    });
});
