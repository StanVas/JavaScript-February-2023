function shoppingList(inputArr) {
    let commands = inputArr.slice(1, inputArr.length);
    let products = inputArr[0].split('!');
    
    for (const line of commands) {
        let currentLine = line.split(' ');
        let command = currentLine[0];
        let item = currentLine[1];

        if (command === 'Go'){
            console.log(products.join(', '))
        } else if (command === 'Urgent'){
            if (!products.includes(item)) {
                products.unshift(item);
            };
        } else if (command === 'Unnecessary') {
            if (products.includes(item)) {
                let itemIndex = products.indexOf(item);
                products.splice(itemIndex, 1);
            };
        } else if (command === 'Correct') {
            let newItem = currentLine[2];

            if (products.includes(item)) {
                let itemIndex = products.indexOf(item);
                products[itemIndex] = newItem; 
            };
        } else if (command === 'Rearrange') {
            if (products.includes(item)) {
                let itemIndex = products.indexOf(item);
                let currentProduct = products.splice(itemIndex, 1)[0];
                products.push(currentProduct);
            };
        };
    };
}

shoppingList(["Tomatoes!Potatoes!Bread",
"Unnecessary Milk",
"Urgent Tomatoes",
"Go Shopping!"])

shoppingList(["Milk!Pepper!Salt!Water!Banana",
"Urgent Salt",
"Unnecessary Grapes",
"Correct Pepper Onion",
"Rearrange Grapes",
"Correct Tomatoes Potatoes",
"Go Shopping!"])