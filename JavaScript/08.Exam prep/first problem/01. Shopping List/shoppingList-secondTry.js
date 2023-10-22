function shoppingList(input) {
    let products = input.splice(0, 1);
    let productsArr = products[0].split('!')
    
    for (const line of input) {
        let currentLine = line.split(' ');
        let command = currentLine[0];
        let product = currentLine[1];

        if (command === 'Urgent') {
            if (!checkForProduct(product)) {
                productsArr.unshift(product)  
            };
        } else if (command === 'Unnecessary') {
            if (checkForProduct(product)) {
                let index = productsArr.indexOf(product);
                productsArr.splice(index, 1);
            };
        } else if (command === 'Correct') {
            if (checkForProduct(product)) {
                let newProduct = currentLine[2];
                let index = productsArr.indexOf(product);
                productsArr[index] = newProduct;
            };
        } else if (command === 'Rearrange') {
            if (checkForProduct(product)) {
                let index = productsArr.indexOf(product);
                let switchProduct = productsArr.splice(index, 1); 
                productsArr.push(switchProduct[0]);
            };
        } else if (command === 'Go') {
            console.log(productsArr.join(', '));
        };
    };

    function checkForProduct (someProduct) {
        let result = productsArr.find(product => product === someProduct)

        if (result === someProduct) {
            return true;
        };

        return false;
    };
}

shoppingList(([
    "Milk!Pepper!Salt!Water!Banana",
    "Urgent Salt",
    "Unnecessary Grapes",
    "Correct Pepper Onion",
    "Rearrange Grapes",
    "Correct Tomatoes Potatoes",
    "Go Shopping!"
]))

shoppingList(([
    "Tomatoes!Potatoes!Bread",
    "Unnecessary Milk",
    "Urgent Tomatoes",
    "Go Shopping!"
]))