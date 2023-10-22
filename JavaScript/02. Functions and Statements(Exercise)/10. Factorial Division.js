// solution without recursion
// function factorialDivision(firstNum, secondNum) {
//     let result = 1;

//     for (let i = firstNum; i > 0; i--) {
//         result *= i;
//     };

//     console.log((result / secondNum).toFixed(2))
// }

// and with recursion
function factorialDivision(firstNum, secondNum){
    function getFactorialRecursion(num) {
        if (num === 1) {
            return num;
        };

        return num * getFactorialRecursion(num - 1);
    };

    result = getFactorialRecursion(firstNum);
    console.log((getFactorialRecursion(firstNum) / getFactorialRecursion(secondNum)).toFixed(2));
}

factorialDivision(5, 2)
factorialDivision(6, 2)