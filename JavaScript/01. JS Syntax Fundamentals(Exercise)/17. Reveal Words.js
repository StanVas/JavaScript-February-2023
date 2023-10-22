function revealWords(words, text) {
    let wordsToReveal = words.split(', ');
    let textArr = text.split(' ');
    let output = []

    for (str of textArr){
        if (str.startsWith('*')) {
            for (el of wordsToReveal) {
                if (el.length === str.length){
                    output.push(el)
                }
            }
        } else {
            output.push(str)
        }
    }

    console.log(output.join(' '))
}




// revealWords('great', 'softuni is ***** place for learning new programming languages')

revealWords('great, learning', 'softuni is ***** place for ******** new programming languages')