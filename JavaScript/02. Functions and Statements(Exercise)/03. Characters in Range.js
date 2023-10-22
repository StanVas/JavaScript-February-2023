function chrInRange(fstChr, secChr){
    let fstChrCode = fstChr.charCodeAt(0);
    let secChrCode = secChr.charCodeAt(0);
    let result = [];

    if (fstChrCode < secChrCode) {
        for (let i = fstChrCode + 1; i < secChrCode; i++) {
            result.push(String.fromCharCode(i));
        }
    } else {
        for (let i = secChrCode + 1; i < fstChrCode; i++) {
            result.push(String.fromCharCode(i));
        };
    };

    console.log(result.join(' '));
}

chrInRange('a', 'd')
chrInRange('C', 'd')