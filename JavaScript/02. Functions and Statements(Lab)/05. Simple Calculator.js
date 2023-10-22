function simpleCalculator(numOne, numTwo, operator){
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => a / b;

    const operationMap = {
        add,
        subtract,
        multiply,
        divide
    }

    return operationMap[operator](numOne, numTwo)
}

console.log(simpleCalculator(40, 8, 'divide'))
console.log(simpleCalculator(5, 5, 'multiply'))
console.log(simpleCalculator(12, 18, 'add'))
console.log(simpleCalculator(22, 11, 'subtract'))
