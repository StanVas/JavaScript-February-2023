function thePianist(input) {
    const numberOfPieces = input.splice(0, 1);
    let piecesArr = input.splice(0, numberOfPieces);
    let commandsArr = input;

    let piecesObj = {};

    for (const line of piecesArr) {
        let [piece, composer, key] = line.split('|');
        piecesObj[piece] = {composer, key};
    };
    
    for (const line of commandsArr) {
        if (line[0] === 'S') {
            for (const piece in piecesObj) {
                console.log(`${piece} -> Composer: ${piecesObj[piece].composer}, Key: ${piecesObj[piece].key}`)
            };

            // "{Piece} -> Composer: {composer}, Key: {key}"
        } else {
            if (line[0] === 'A') {
                let [_command, piece, composer, key] = line.split('|');
                if (piecesObj.hasOwnProperty(piece)) {
                    console.log(`${piece} is already in the collection!`)
                } else {
                    piecesObj[piece] = {composer, key};
                    console.log(`${piece} by ${composer} in ${key} added to the collection!`)
                };
            } else if (line[0] === 'R') {
                let [_command, piece] = line.split('|');
                if (!piecesObj.hasOwnProperty(piece)) {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`)
                } else {
                    delete piecesObj[piece];
                    console.log(`Successfully removed ${piece}!`)
                };
            } else if (line[0] === 'C') {
                let [_command, piece, newKey] = line.split('|');
                if (!piecesObj.hasOwnProperty(piece)) {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`)
                } else {
                    piecesObj[piece].key = newKey;
                    console.log(`Changed the key of ${piece} to ${newKey}!`);
                };
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