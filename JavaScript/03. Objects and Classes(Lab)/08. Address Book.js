function addressBook(input) {
    let addressBook = {};

    for (let line of input) {
        let [name, address] = line.split(':')
        addressBook[name] = address;
    };

    let sortedNames = Object.keys(addressBook)
        .sort((nameA, nameB) => nameA.localeCompare(nameB));

    for (const name of sortedNames) {
        console.log(`${name} -> ${addressBook[name]}`);
    };
}

addressBook(['Tim:Doe Crossing',
'Bill:Nelson Place',
'Peter:Carlyle Ave',
'Bill:Ornery Rd'])