// function stringSubstring(word, text) {
//     let wordLowerCase = word.toLowerCase();
//     let textLowerCase = text.toLowerCase();
    
//     if (textLowerCase.includes(wordLowerCase)){
//         console.log(word)
//     } else {
//         console.log(`${word} not found!`)
//     }
// }
// working but judge don't like it

function stringSubstring(word, text) {
    let wordLowerCase = word.toLowerCase();
    let textArr = text.split(' ');
    
    for (const wordInText of textArr) {
        if (wordLowerCase == wordInText.toLowerCase()){
            return word
        }
    }
    return `${word} not found!`
}



console.log(stringSubstring('javascript', 'JavaScript is the best programming language'))
console.log(stringSubstring('python', 'JavaScript is the best programming language'))
// stringSubstring('javascript', 'JavaScript is the best programming language')
// stringSubstring('python', 'JavaScript is the best programming language')