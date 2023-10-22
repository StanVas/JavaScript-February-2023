function censorWords(text, word){
    let censoredText = text;

    while (censoredText.includes(word)){
        censoredText = censoredText.replace(word, '*'.repeat(word.length));
    };
    
    console.log(censoredText);
}


censorWords('A small sentence with some words', 'small')
censorWords('Find the hidden word', 'hidden')