function employees(input) {
    let employeesId = {};

    for (const employee of input) {
        employeesId[employee] = employee.length;
    };

    for (const key in employeesId) {
        console.log(`Name: ${key} -- Personal Number: ${employeesId[key]}`);
    };
}

// from the lab/exercise - one line
// function employees(input) {
//     Object.entries(
//         input.reduce((data, employee) => {
//             data[employee] = employee.length;
//             return data;
//         }, {})
//     ).forEach(([employee, length]) => {
//         console.log(`Name: ${employee} -- Personal Number: ${length}`)
//     })
// }


employees([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
    ])
