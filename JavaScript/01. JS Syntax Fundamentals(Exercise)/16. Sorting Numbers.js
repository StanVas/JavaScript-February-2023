function sortNums(numbers) {
    let sortedNums = [...numbers].sort((aNum, bNum) => aNum - bNum)
    let outputNums = []

    for (let i = 0; i < numbers.length; i++) {
        if (i % 2 === 0){
            outputNums.push(sortedNums.shift())
        } else {
            outputNums.push(sortedNums.pop())
        }
    }

    return outputNums
}

sortNums([1, 65, 3, 52, 48, 63, 31, -3, 18, 56])