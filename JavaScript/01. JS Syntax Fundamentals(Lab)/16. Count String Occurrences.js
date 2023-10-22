function countOccurrences(text, word) {
    let counter = 0;
    let textToCheck = text.split(" ");

    for (i = 0; i <= textToCheck.length; i++){
        if (textToCheck[i] === word){
            counter += 1;
        }
    }

    console.log(counter);
}

countOccurrences('This is a word and it also is a sentence', 'is')
countOccurrences('softuni is great place for learning new programming languages', 'softuni')