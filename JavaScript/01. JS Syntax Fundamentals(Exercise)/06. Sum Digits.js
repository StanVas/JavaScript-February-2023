function sumDigits(numbers) {
    let result = 0;

    let digits = numbers.toString().split('').map(iNum => parseInt(iNum, 10));

    digits.forEach((num) => {
        result += num
    });

    console.log(result)
}

sumDigits(245678)
