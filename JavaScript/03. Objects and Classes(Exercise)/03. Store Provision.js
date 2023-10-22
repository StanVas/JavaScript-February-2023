function storeProvision(firstInput, secondInput) {
    let productsObj = {};

    for (let i = 0; i < firstInput.length; i+=2) {
        productsObj[firstInput[i]] = Number(firstInput[i + 1]);
    };

    for (let i = 0; i < secondInput.length; i+=2) {
        if (productsObj.hasOwnProperty(secondInput[i])){
            productsObj[secondInput[i]] = Number(secondInput[i + 1]) + productsObj[secondInput[i]];
        } else {
            productsObj[secondInput[i]] = secondInput[i + 1];
        };  
    };

    const output = Object.entries(productsObj)
        .forEach(([key, value]) => console.log(`${key} -> ${value}`));
}


storeProvision([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
    ],
    [
    'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ])