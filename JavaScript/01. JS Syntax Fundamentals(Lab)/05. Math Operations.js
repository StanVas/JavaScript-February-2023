function mathOperations(num1, num2, operator) {
    switch (operator) {
        case '+':
            console.log(num1 + num2);
        break;
        case '-':
            console.log(num1 - num2);
        break;
        case '*':
            console.log(num1 * num2);
        break;
        case '/':
            console.log(num1 / num2);
        break;
        case '%':
            console.log(num1 % num2);
        break;
        case '**':
            console.log(num1 ** num2);
    }
}

mathOperations(3, 5.5, '*')