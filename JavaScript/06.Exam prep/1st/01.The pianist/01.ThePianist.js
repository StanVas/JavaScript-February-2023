function thePianist(input) {
    let piecesCount = input.splice(0, 1);
    let piecesArr = Array.from(input.splice(0, piecesCount));
    let pieces = {};

    for (const line of piecesArr) {
        let [piece, composer, key] = line.split('|');
        pieces[piece] = { composer, key };
    };

    for (const line of input) {
        let splitLine = line.split('|');
        const command = splitLine[0];
        const piece = splitLine[1];

        let pieceChecker = checkForPiece(piece);

        if (command === 'Stop') {
            for (const piece in pieces) {
                console.log(`${piece} -> Composer: ${pieces[piece].composer}, Key: ${pieces[piece].key}`)
            };
        } else if (command === 'Add') {
            if (pieceChecker) {
                console.log(`${piece} is already in the collection!`);
            } else {
                const composer = splitLine[2];
                const key = splitLine[3];
                pieces[piece] = { composer, key };
                console.log(`${piece} by ${composer} in ${key} added to the collection!`);
            };
        } else if (command === 'Remove') {
            if (pieceChecker) {
                delete pieces[piece];
                console.log(`Successfully removed ${piece}!`);
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            }
        } else if (command === 'ChangeKey') {
            if (pieceChecker) {
                pieces[piece].key = splitLine[2];
                console.log(`Changed the key of ${piece} to ${splitLine[2]}!`);
            } else {
                console.log(`Invalid operation! ${piece} does not exist in the collection.`);
            };
        };
    };

    function checkForPiece(checkPiece) {
        let result = pieces.hasOwnProperty(checkPiece);
        return result
    };
}

thePianist([
    '3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop'
])