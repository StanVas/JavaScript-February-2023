function printAndSum(start, end) {
    let result = 0;
    let resultArr = [];
    for (let i = start; i < end + 1; i++) {
        result += i;
        resultArr.push(i)
    };
    console.log(resultArr.join(' '))
    console.log(`Sum: ${result}`)
}

printAndSum(5, 10)