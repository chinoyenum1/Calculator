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



//Nubmber keys listener event code
for (let number of numberButtons) {
    expression.value = ``;
    number.addEventListener('click', ()=>{ 
        result.value += number.value;
        expression.value += number.value
    });
}

//Operands event code
for (const operator of operators) {
    operator.addEventListener('click', ()=>{
        expression.value = `${result.value} ${operator.value} `;
        if (expressionList.length == 0) {
            expressionList.push(`${result.value}`);
        } 
        expressionList.push(`${operator.value}`);
        result.value = ``;
        dot.disabled = false;
    });
}

//calculation of the operation
equals.addEventListener('click', ()=>{
    expressionList.push(result.value);
    let firstNumber = Number(expressionList[0])
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
            answer = 'Err'
            break;
    }

    result.value = answer;
    if(answer !== 'Err') {
        expressionList = [answer];
    }else{
        expressionList = [];
        expression.value = answer;
        result.value = ``;
    }
    console.log(expressionList)
});

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

//clear button function
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
    let val = result.value;
    var newstr = val.replace(val[val.length - 1], "");
    result.value = newstr;
    expression.value = newstr;
    
});

//dot button function
dot.addEventListener('click', ()=>{
    dot.disabled = true;   
});

plusMinus.addEventListener('click', ()=>{
    if (result.value[0] !== '-') {
        result.value = `-${result.value}`;
        expression.value = result.value;
    } else {
        result.value = `${result.value}`;
    }
    
    
});