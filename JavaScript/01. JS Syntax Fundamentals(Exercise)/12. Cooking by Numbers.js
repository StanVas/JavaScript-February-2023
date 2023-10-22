function cookingByNumbers(number, ...operations) {
    let currentNum = number

    for (let operator of operations) {
        switch (operator) {
            case 'chop':
                currentNum /= 2;
                console.log(currentNum);
                break;

            case 'dice':
                currentNum = Math.sqrt(currentNum);
                console.log(currentNum);
                break;

            case 'spice':
                currentNum += 1;
                console.log(currentNum);
                break;

            case 'bake':
                currentNum *= 3;
                console.log(currentNum);
                break;

            case 'fillet':
                currentNum -= currentNum * 0.2;
                console.log(currentNum);
                break;
        }
    }
}

cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop')
cookingByNumbers('9', 'dice', 'spice', 'chop', 'bake', 'fillet')