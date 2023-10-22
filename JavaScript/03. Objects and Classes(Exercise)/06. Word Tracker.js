function wordsTracker(input) {
    let [firstWord, secondWord] = input.shift().split(' ');
    let occurrencesFirstWord = 0;
    let occurrencesSecondWord = 0;

    for (const word of input) {
        if (word === firstWord) {
            occurrencesFirstWord += 1;
        } else if (word === secondWord) {
            occurrencesSecondWord += 1;
        };
    };

    let output = {};
    output[firstWord] = occurrencesFirstWord;
    output[secondWord] = occurrencesSecondWord;
    // let sortedOutput = output.sort((occursA, occursB) => occursB.occurrences - occursA.occurrences);
    let sortedOutput = Object.entries(output)
      .sort((wordA, wordB) => {
        let [_nameA, countA] = wordA;
        let [_nameB, countB] = wordB;
        
        return countB - countA;
      })

    for (const [word, count] of sortedOutput) {
        console.log(`${word} - ${count}`);
    };
}

wordsTracker([
    'this sentence',
    'In', 'this', 'sentence', 'you', 'have', 'to', 'count', 'the', 'occurrences', 'of', 'the', 'words', 'this', 'and', 'sentence', 'because', 'this', 'is', 'your', 'task'
])

wordsTracker([
    'is the',
    'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence'
])