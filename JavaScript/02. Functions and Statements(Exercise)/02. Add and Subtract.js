function addAndSubtract(...numbers){
    function sum() {
        return numbers[0] + numbers[1]
    }
    
    function subtract(num) {
        return num - numbers[2]
    }

    return subtract(sum())
}

console.log(
    addAndSubtract(23, 6, 10)
)
