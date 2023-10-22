function sortNames(namesArr) {
    let sortedNames = [...namesArr]
    .sort((aName, bName) => aName.localeCompare(bName))
    .map((el, index) => `${index + 1}.${el}`)
    .join('\n')
    console.log(sortedNames);
}

sortNames(["John", "Bob", "Christina", "Ema"])