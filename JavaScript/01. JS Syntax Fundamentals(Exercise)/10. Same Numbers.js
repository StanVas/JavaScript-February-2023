function sameNumbers (number){
    let digits = number.toString().split('').map(iNum => parseInt(iNum, 10));

    let result = 0;
    let fstNum = digits[0]
    let outcome = true

    for (let num of digits) {
        result += num;
        if (num != fstNum){
            outcome = false
        };
    };

    // digits.forEach((num) => {
    //     result += num
    // });
    console.log(outcome)
    console.log(result);
}


sameNumbers(2222222)
sameNumbers(1234)