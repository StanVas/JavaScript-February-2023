function pascalSplitter(text) {
    let output = '';
    for (const symbol of text) {
        const asciiCode = symbol.charCodeAt(0);
        if (65 <= asciiCode && asciiCode <= 90){
            if (output.length === 0){
                output += symbol;
            } else {
            output += ', ';
            output += symbol;
            }
        } else {
            output += symbol;
        };
    };
    console.log(output);
}

pascalSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan')