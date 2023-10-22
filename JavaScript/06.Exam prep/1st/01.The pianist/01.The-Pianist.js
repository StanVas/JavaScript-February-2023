function thePianist(inputArr) {
    let piecesCount = Number(inputArr.shift());
    let operations = inputArr.slice(piecesCount);
    let pieces = {};

    for (let index = 0; index < piecesCount; index++) {
        let [piece, composer, key] = inputArr[index].split('|');
        pieces[piece] = {composer, key};
    };
    
    for (let index = 0; index < operations.length; index++) {
        let currentOperation = operations[index].split('|');
        let command = currentOperation[0];
        if (command === 'Add'){
            let piece = currentOperation[1];
            let composer = currentOperation[2];
            let key = currentOperation[3];
            if (!pieces.hasOwnProperty(piece)){
                pieces[piece] = {composer, key};
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);
            } else {
                console.log(`${piece} is already in the collection!`);
            };
        } else if (command === 'Remove'){
            let piece = currentOperation[1];
            if (pieces.hasOwnProperty(piece)){
                delete pieces[piece];
                console.log(`Successfully removed ${piece}!`);
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            };
        } else if (command === 'ChangeKey'){
            let piece = currentOperation[1];
            let newKey = currentOperation[2];
            if (pieces.hasOwnProperty(piece)){
                pieces[piece].key = newKey;
                console.log(`Changed the key of ${piece} to ${newKey}!`)
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            };
        } else if (command === 'Stop'){
            for (const piece in pieces) {
                console.log(`${piece} -> Composer: ${pieces[piece].composer}, Key: ${pieces[piece].key}`)
            };
        };
    }; 
}


thePianist([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
])