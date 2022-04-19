let numberButtons = Array.from(document.querySelectorAll('.number'));
let expression = document.querySelector('#expression');
let result = document.querySelector('#result');
let operators = document.querySelectorAll('.operator');
let equals = document.querySelector('#equal');
let clear = document.querySelector('#clear');
let clearAll = document.querySelector('#clear-all');
let dot = document.querySelector('#dot');
let del = document.querySelector('#delete');
let plusMinus = document.querySelector('#plus-minus');
let expressionList = [];
let numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let operatorKeys = ["/", "x", "-", "+"];



//Nubmber keys listener event code
for (let number of numberButtons) {
    //expression.value = ``;
    number.addEventListener('click', ()=>{ 
        inputNumbers(number.value);
    });
}

function inputNumbers(number) {
    result.value += number;
    expression.value += number;
}


//keyboard listener events
document.addEventListener('keydown', (e)=>{
    if(numKeys.indexOf(e.key) !== -1)
    inputNumbers(e.key);
    if (operatorKeys.indexOf(e.key) !== -1) {
        inputOperator(e.key);
    }
    if (e.key === "Enter") {
        calculateExpression()
    }
    if (e.key === ".") {
        inputDot()
    }
    if (e.key === "Backspace") {
        deleteNumber();
    }
    if (e.key === "Escape" || e.key === "Delete") {
        clearScreen();
    }
})



//Operands event code
for (const operator of operators) {
    operator.addEventListener('click', ()=>{
        inputOperator(operator.value);
    });
}

function inputOperator(operator) {
    expression.value = `${result.value} ${operator} `;
    if (expressionList.length == 0) {
        expressionList.push(`${result.value}`);
    }
    expressionList.push(`${operator}`);
    result.value = ``;
    dot.disabled = false;
    operator.disabled = false;
}

//calculation of the operation
equals.addEventListener('click', ()=>{
    calculateExpression();
});

function calculateExpression() {
    expressionList.push(result.value);
    let firstNumber = Number(expressionList[0]);
    let secondNumber = Number(expressionList[2]);
    let answer = '';

    switch (expressionList[1]) {
        case '+':
            answer = addition(firstNumber, secondNumber);
            break;
        case '-':
            answer = subtraction(firstNumber, secondNumber);
            break;
        case 'x':
            answer = multiplication(firstNumber, secondNumber);
            break;
        case '/':
            answer = division(firstNumber, secondNumber);
            break;
        default:
            answer = 'Err';
            break;
    }

    result.value = answer;
    if (answer !== 'Err') {
        expressionList = [answer];
    } else {
        expressionList = [];
        expression.value = answer;
        result.value = ``;
    }
    console.log(expressionList);
}

function addition(number1, number2) {
    let ans = number1 + number2;
    return isFloat(ans)? ans = ans.toFixed(2): ans = ans;
}

function subtraction(number1, number2) {
    let ans = number1 - number2;
    return isFloat(ans)? ans = ans.toFixed(2): ans = ans;
}

function multiplication(number1, number2) {
    let ans = number1 * number2;
    return isFloat(ans)? ans = ans.toFixed(2): ans = ans;
}

function division(number1, number2) {
    if (number2 == 0) {
        return 'Err';
    } else {
        let ans = number1 / number2;
        return isFloat(ans)? ans = ans.toFixed(2): ans = ans;
    }
}

function isFloat(arg) {
    if (typeof arg === 'number' && !Number.isNaN(arg) && !Number.isInteger(arg)) {
        return true;
    }
    return false;
}

//clear button function
clear.addEventListener('click', ()=>{
    clearScreen();
});

//clearAll button function
clearAll.addEventListener('click', ()=>{
    clearScreen();
});

function clearScreen() {
    expression.value = ``;
    result.value = ``;
    expressionList = [];
    
}

//delete button function
del.addEventListener('click', ()=>{
    deleteNumber();
});

function deleteNumber() {
    let val = result.value;
    var newstr = val.replace(val[val.length - 1], "");
    result.value = newstr;
    expression.value = newstr;
}

//dot button function
dot.addEventListener('click', ()=>{
    inputDot();   
});

function inputDot() {
    dot.disabled = true;
}

//plus/minus button function
plusMinus.addEventListener('click', ()=>{
    if (result.value != '') {
        result.value = result.value * -1;
        expression.value = result.value;
    } else {
        result.value = '-';
        expression.value = result.value;
    }
});




