function perfectNumber(number) {
    let sumDivisors = 0;
    let divisorsRange = Math.floor(number / 2);
    
    for (let i = 1; i < divisorsRange + 1; i++) {
        if (number % i === 0){
            sumDivisors += i;
        };
    };
    
    if (sumDivisors == number) {
        console.log('We have a perfect number!');
    } else {
        console.log('It\'s not so perfect.');
    };
}


perfectNumber(6)
perfectNumber(28)
perfectNumber(1236498)