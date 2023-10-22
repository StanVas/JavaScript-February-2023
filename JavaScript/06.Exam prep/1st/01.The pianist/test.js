function thePianist(input) {
    const numberOfPieces = input.splice(0, 1);
    let piecesArr = input.splice(0, numberOfPieces);
    let piecesObj = {};

    for (const item of piecesArr) {
        let currentPiece = item.split('|');
        let piece = currentPiece[0];
        let composer = currentPiece[1];
        let key = currentPiece[2];
        piecesObj[piece] = {composer, key};
    };

    for (const line of input) {
        let lineSplit = line.split('|');
        let command = lineSplit[0];

        if (command === 'Stop') {
            break;
        };

        let piece = lineSplit[1];

        if (command === 'Add') {
            if (piecesObj.hasOwnProperty(piece)) {
                console.log(`${piece} is already in the collection!`)
            } else {
                let composer = lineSplit[2];
                let key = lineSplit[3];

                piecesObj[piece] = {composer, key}
                console.log(`${piece} by ${composer} in ${key} added to the collection!`)
            };
        } else if (command === 'ChangeKey') {
            let newKey = lineSplit[2];
            if (!piecesObj.hasOwnProperty(piece)){
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            } else {
                piecesObj[piece].key = newKey;
                console.log(`Changed the key of ${piece} to ${newKey}!`)
            };
        } else if (command === 'Remove') {
            if (!piecesObj.hasOwnProperty(piece)) {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`)
            } else {
                delete piecesObj[piece];
                console.log(`Successfully removed ${piece}!`)
            };
        };
    };

    for (const key in piecesObj) {
        console.log(`${key} -> Composer: ${piecesObj[key].composer}, Key: ${piecesObj[key].key}`)
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