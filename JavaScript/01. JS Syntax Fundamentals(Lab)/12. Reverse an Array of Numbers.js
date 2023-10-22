function reversedArr(num, arr) {
    let result = [];

    for (let i=0; i <= num - 1; i++) {
        result.push(arr[i]);
    };

    console.log(result.reverse().join(' '));
}

reversedArr(3, [10, 20, 30, 40, 50])
reversedArr(4, [-1, 20, 99, 5])
reversedArr(2, [66, 43, 75, 89, 47])