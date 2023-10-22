function thePianist(input) {
    let number = input.splice(0, 1);
    let numberOfPieces = Number(number[0]);

    let piecesInput = input.splice(0, numberOfPieces);
    let piecesObj = {};

    for (const line of piecesInput) {
        let [piece, composer, key] = line.split('|');
        piecesObj[piece] = {composer, key};
    };

    function checkForPiece(somePiece) {
        if (piecesObj.hasOwnProperty(somePiece)) {
            return true;
        };
        return false;
    };

    for (const line of input) {
        let currentLine = line.split('|');
        let command = currentLine[0];
        
        if (command === 'Stop') {
            for (const item in piecesObj) {
                console.log(`${item} -> Composer: ${piecesObj[item].composer}, Key: ${piecesObj[item].key}`);
            };
        } else {
            let piece = currentLine[1];

            if (command === 'Add') {
                if (!checkForPiece(piece)) {
                    let composer = currentLine[2];
                    let key = currentLine[3];
                    piecesObj[piece] = {composer, key};
                    console.log(`${piece} by ${composer} in ${key} added to the collection!`);
                } else {
                    console.log(`${piece} is already in the collection!`)
                };
            } else if (command === 'Remove') {
                if (checkForPiece(piece)) {
                    delete piecesObj[piece];
                    console.log(`Successfully removed ${piece}!`);
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
                };
            } else if (command === 'ChangeKey') {
                if (checkForPiece(piece)) {
                    let newKey = currentLine[2];
                    piecesObj[piece].key = newKey;
                    console.log(`Changed the key of ${piece} to ${newKey}!`)
                } else {
                    console.log(`Invalid operation! ${piece} does not exist in the collection.`);
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

thePianist([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
])