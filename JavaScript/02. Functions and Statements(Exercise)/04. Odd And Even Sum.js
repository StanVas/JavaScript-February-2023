function oddEvenSum(num) {
    let oddSum = 0;
    let evenSum = 0;

    let digits = num.toString().split('').map(iNum => parseInt(iNum, 10));
    
    let oddEven = digits.forEach(element => {
        element % 2 === 0 ? evenSum += element : oddSum += element;
    });

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
}

oddEvenSum(1000435)
oddEvenSum(3495892137259234)

// let num = 123456;
// let digits = num.toString().split('').map(iNum => parseInt(iNum, 10));
// console.log(digits);