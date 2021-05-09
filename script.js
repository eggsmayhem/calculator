const calculator = {
    displayValue:'0',
    firstOperand:null,
    waitingForSecondOperand:false,
    operator:null
};

/*
const keys = document.querySelector('.keys');
keys.addEventListener('click',  (e) => {
    const {target} = e;
    //above is equivalent to const target=e.target, except we are using destructuring assignment 
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    } 
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('clear')) {
        clear();
        updateDisplay();
        return;
    } 
    inputDigit(target.value);
    updateDisplay();
});
*/
const keys = document.querySelector('.keys');
keys.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case 'calculate':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'clear':
            clear();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputDigit(value);
            }
    }
    updateDisplay();
});

function updateDisplay() {
    const display = document.querySelector('.display');
    //does above not need to specify that it's the *output* of the display we're after?
    //above selects HTML element called display 
    display.value = calculator.displayValue; 
}

updateDisplay();

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false; 
    } else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    //above we are destructuring a certain property of the calculator object 
    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand ===true) {
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    }
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

//below function is for when you are performing an operation after entering in the first operand
//it seems you can use the destructured keys to access an object, but need to use traditional dot notation to actually change the properties of an object (calculator)
function handleOperator(nextOperator) {
     const { firstOperand, displayValue, operator } = calculator;
     const inputValue = parseFloat(displayValue);
     if (firstOperand == null && !isNaN(inputValue)) {
         calculator.firstOperand = inputValue;
     } else if (operator) {
         const result = calculate(firstOperand, inputValue, operator);
         calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
         calculator.firstOperand=result;
     }
     calculator.waitingForSecondOperand = true;
     calculator.operator = nextOperator;
     //displayValue = '0'; //this line is mine 
     console.log(calculator);
}

//below is my function
/*function calculate(){
    const { firstOperand, displayValue, operator, waitingForSecondOperand } = calculator;
    if (firstOperand ===null) {
        return;
    }
}*/ 


function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    }
    else if (operator === '-') {
        return firstOperand - secondOperand;
    }
    else if (operator === '*') {
        return firstOperand * secondOperand;
    }
    else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function clear() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}