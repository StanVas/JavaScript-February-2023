function findSpecialWord(text) {
    let textArr = text.split(" ");
    let specialWords = [];

    textArr.forEach(element => {
        if (element.startsWith('#') && element.length > 1 && checkWord(element)) {
            specialWords.push(element.slice(1));
        };
    });

    function checkWord(myWord) {
        let myWordToLowerCase = myWord.toLowerCase().slice(1);

        for (chr of myWordToLowerCase) {
            isValid = true;
    
            let asciiNum = chr.charCodeAt(chr);
            if (!(97 <= asciiNum && asciiNum <= 122)) {
                isValid = false;
                break;
            };
        };

        return isValid;
    };

    console.log(specialWords.join('\n'));
}

// findSpecialWord('Nowadays everyone uses # to tag a #special word in #socialMedia')
findSpecialWord('The symbol # is known #variously in English-speaking #regions as the #number sign')