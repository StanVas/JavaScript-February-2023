function shoppingList(input) {
    let products = input.splice(0, 1);
    let productsArr = products[0].split('!');

    for (const line of input) {
        let currentLine = line.split(' ');
        let command = currentLine[0];

        if (command === 'Go') {

        } else if (command === 'Urgent') {
            let product = currentLine[1];
            if (!checkForProduct(product)) {
                productsArr.unshift(product);
            };
        } else if (command === 'Unnecessary') {
            let product = currentLine[1];
            if (checkForProduct(product)) {
                let toRemove = productsArr.indexOf(product);
                productsArr.splice(toRemove, 1);
            };
        } else if (command === 'Correct') {
            let oldProduct = currentLine[1];
            let newProduct = currentLine[2];
            if (checkForProduct(oldProduct)) {
                let toChange = productsArr.indexOf(oldProduct);
                productsArr.splice(toChange, 1);
                productsArr.splice(toChange, 0, newProduct);
            };
        } else if (command === 'Rearrange') {
            let product = currentLine[1];
            if (checkForProduct(product)) {
                let toSwitch = productsArr.indexOf(product);
                let itemToSwitch = productsArr[toSwitch];
                productsArr.push(itemToSwitch);
                productsArr.splice(toSwitch, 1);
            };
        };
    };

    function checkForProduct(productToCheck) {
        let result = productsArr.includes(productToCheck);
        return result;
    };

    console.log(productsArr.join(', '));
}

shoppingList([
    "Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Grapes",
    "Correct Tomatoes Potatoes",
    "Go Shopping!"
])

shoppingList([
    "Tomatoes!Potatoes!Bread",
    "Unnecessary Milk",
    "Urgent Tomatoes",
    "Go Shopping!"
])