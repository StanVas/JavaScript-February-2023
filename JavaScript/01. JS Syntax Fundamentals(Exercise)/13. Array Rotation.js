function arrRotation(numbers, rotations){
    rotations %= numbers.length;

    for (let i = 0; i < rotations; i++) {
        let firstNum = numbers.shift();
        numbers.push(firstNum);
    }

    console.log(numbers.join(' '))
}

arrRotation(
    [51, 47, 32, 61, 21], 2
);

arrRotation(
    [32, 21, 61, 1], 4
);

arrRotation(
    [2, 4, 15, 31], 5
);