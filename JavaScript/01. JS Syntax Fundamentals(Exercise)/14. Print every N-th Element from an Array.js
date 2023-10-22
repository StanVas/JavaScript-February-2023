function printNthElement(numbers, step) {
    let output = []

    for (let i = 0; i < numbers.length; i += step) {
        output.push(numbers[i]);
    }

    return output
}

printNthElement(['dsa', 'asd', 'test', 'tset'], 2)
printNthElement(['5', '20', '31', '4', '20'], 2)
printNthElement(['1', '2', '3', '4', '5'], 6)