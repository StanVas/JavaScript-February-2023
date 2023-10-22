function createMatrix(number){
    new Array(number)
    .fill(new Array(number)
    .fill(number))
    .forEach(row => console.log(row.join(' ')));
}


createMatrix(3)

// new Array(4).fill(new Array(4).fill(4))
// new Array(4).fill(new Array(4).fill(4)).forEach(row => console.log(row.join(' ')))