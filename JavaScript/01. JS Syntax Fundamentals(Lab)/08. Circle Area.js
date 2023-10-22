function calculateArea(input) {
    checkInput = typeof (input);
    if (checkInput != 'number') {
        console.log(`We can not calculate the circle area, because we receive a ${checkInput}.`)
    } else {
        circleArea = Math.PI * input**2
        console.log(circleArea.toFixed(2))
    }
}


calculateArea(true)
