let displayType = null;
let lastButton = null;
let operand1 = null;
let operand2 = null;
let operator = null;


const display = document.querySelector("#display");
let displayValue = display.textContent;

function clickButton(buttonClass, value){
  if(buttonClass=="number"){
      if(displayValue.length>=9) return;
      if(lastButton == "operator"){
        displayValue = value;
        operand2 = displayValue;
       }
      else if(lastButton == "="){
        clear();
        displayValue = value;
      }
      else {
        displayValue =  displayValue + value;
        operand2 = displayValue;
      }

      display.textContent = displayValue;
      displayType = "number";
      lastButton = "number";

  }
  else if (buttonClass=="operator") {
    if(displayType == "number"){
    if(operator==null){
      operand1 = displayValue;
      displayValue = value;
      display.textContent = displayValue;
      displayType = "operator";
      operator = value;
      }
    else{
      operand1 = operate(operator, operand1, operand2);
      displayValue = operand1;
      display.textContent = displayValue;
      operator = value;
      displayType = "number";
    }
    lastButton="operator";
    }
  }

  else if (value==="Clear")clear();

  else if (value==="+/-"){
    if(displayType==="number") {
      displayValue = displayValue * -1;
      display.textContent = displayValue;
      operand2 = displayValue;
    }
    lastButton=value;
  }

  else if (value=="%"){
    if(displayType=="number"){
      displayValue = divide(displayValue, 100);
      display.textContent = displayValue;
      operand2 = displayValue;
    }
    lastButton=value;
  }

  else if (value =="="){
    if (operator!=null){
    displayValue = operate(operator, operand1, operand2);
    console.log(operator);
    console.log(operand1);
    console.log(operand2);
    console.log(displayValue);
    display.textContent = displayValue;
    lastButton=value;
  }
  }

}


function clear(){
  displayValue = "";
  display.textContent = displayValue
  displayType = null;
  operand1 = null;
  operand2 = null;
  operator = null;
  lastButton = null;
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", ()=>{
      const value = button.textContent;
      const buttonClass = button.className;
      console.log(buttonClass);
      clickButton(buttonClass, value);
    });
});


function add(a,b){
  return +a + +b;
}

function sub(a,b){
  return a - b;
}

function mult(a, b){
  return a*b;
}

function divide(a,b){
  if (b==0) return "no";
  return a/b;
}


function operate(operator, a, b){
  switch(operator){
    case "+": return add(a,b); break;
    case "-": return sub(a,b); break;
    case "*": return mult(a,b); break;
    case "/": return divide(a,b); break;
  }
}
