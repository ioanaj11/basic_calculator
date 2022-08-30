//the 4 basic maths operations 
function add(num1, num2) {
	return num1+num2;
};

function subtract(num1, num2) {
	return num1-num2;
};

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    return num1/num2;
}

//performs the 4 basic math operations based on the operator and numbers input
function operate(operator, num1, num2){
    switch (operator){
        case "+": 
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "×":
            return multiply(num1, num2);
            break;
        case "÷":
            return divide(num1, num2);
    }
}

//initializes
let value=""; // a string which contains the number formed when the user clicks the different numbers on the calculator's screen
let numbers=[]; // an array holding the two numbers which are to be operated
let operator=""; // the mathematical operator

//ment to run when the user presses the "Delete" button
function deleteLast(str){
    str=str.substring(0, str.length-1);
    return str;
}

//the calculator's display is made up of two "screens". The lower screen displays the number formed prior to 
//performing the operation and the final result, once the operation was made
function displayDown(value){
    const displayDown=document.querySelector('.down');
    displayDown.textContent=value;
}

//the upper part of the display shows the first number of the operation and the operator input by the user
function displayUp(value){
    const displayUp=document.querySelector('.up');
    displayUp.textContent=value;
}

//accumulates the numbers selected by the user in a string, in order to form the number used in the operation
function getValue(num){
    value = value + num;
 }

//maximum number of decimals the calculator can work with is 9;
//this function removes the zeroes at the end of decimal numbers and 
//the "." in case the number is an Integer
function removeZero(str){
    if (str.indexOf(".")>0){
        let i=str.length-1;
        while ((str[i]==="0")&&(i>(str.indexOf(".")))){
            str=str.substring(0, i);
            i--;
        }};
    if (str.indexOf(".") === str.length-1) str=str.substring(0, str.length-1);
    return str;
}

//based on the class of the button pressed by the user, the calculator performs the necessary operations, displaying the results on the screen;
const container=document.querySelector(".container");
container.addEventListener('click', e => {
    switch (e.target.className){
        case "operator":
            if ((operator!="")&&(value!="")){
                numbers.push(value);
                displayUp(`${numbers[0]} ${operator} ${numbers[1]} =`);
                value=operate(operator, parseFloat(numbers[0]), parseFloat(numbers[1])).toString();
                numbers.splice(0, 2);
                displayDown(value);
            }
            if (value!=""){
                operator=e.target.textContent;
                numbers.push(value);
                displayUp(`${value} ${operator}`);
                value="";}
            break;
        case "number":
            if (value ==="0") value="";
            if (value ===".") value="0.";
            if (value.length <= 10){
                getValue(e.target.textContent);
                displayDown(value)}
            break;
        case "clearBtn": 
            value='';
            numbers=[];
            operator="";
            displayDown(0);
            displayUp("");
            break;
        case "deleteBtn":
            value=deleteLast(value);
            displayDown(value);
            break;
        case "dot":
            if (value.indexOf(".")<0) getValue(".");
            displayDown(value);
            break;
        case "equalBtn":
            if ((value!="")&&(operator!="")){
                numbers.push(value);
                displayUp(`${numbers[0]} ${operator} ${numbers[1]} =`)
                value=operate(operator, parseFloat(numbers[0]), parseFloat(numbers[1])).toFixed(9);
                value=removeZero(value);
                numbers.splice(0, 2);
                operator="";
                displayDown(value)}
    }
})