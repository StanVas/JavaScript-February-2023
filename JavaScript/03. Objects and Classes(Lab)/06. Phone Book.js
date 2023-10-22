function phoneBook(input) {
    let phoneObj = {};

    for (const line of input) {
        let [name, phoneNumber] = line.split(" ");
        phoneObj[name] = phoneNumber;
    };

    for (const key in phoneObj) {
        console.log(`${key} -> ${phoneObj[key]}`)
    };
}


phoneBook(['Tim 0834212554',
'Peter 0877547887',
'Bill 0896543112',
'Tim 0876566344'])