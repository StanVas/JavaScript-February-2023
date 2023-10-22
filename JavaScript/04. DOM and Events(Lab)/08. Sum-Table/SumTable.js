function sumTable() {
    const currentTable = document.getElementsByTagName('table')[0];
    let rows = Array.from(currentTable.querySelectorAll('tr'));
    let totalSum = 0;

    for (let i = 1; i < rows.length - 1; i++) {
        const [_firstChild, secondChild] = rows[i].children;
        totalSum += Number(secondChild.textContent);
    };
    
    const sumOutput = document.getElementById('sum');
    sumOutput.textContent = totalSum.toFixed(2);
}

// function sumTable() {
//     const table = document.querySelectorAll('td')
//     let sum = document.getElementById('sum')

//     let total_sum = 0

//     for (let i = 0; i < table.length - 1; i++) {
//         if (i % 2 !== 0) {
//             total_sum += parseFloat(table[i].innerText)
//         }
//     }
//     sum.innerText = total_sum.toFixed(2)

// }