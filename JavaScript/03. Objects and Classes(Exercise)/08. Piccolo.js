function piccolo(input) {
    let parkingLot = [];

    for (let line of input) {
        let [command, numPlate] = line.split(', ');

        if (command === 'IN' && !parkingLot.includes(numPlate)) {
            parkingLot.push(numPlate);        
        } else if (command === 'OUT' && parkingLot.includes(numPlate)){
            let carIndex = parkingLot.indexOf(numPlate);
            parkingLot.splice(carIndex, 1)
        };
    };
    
    if (parkingLot.length === 0){
        console.log("Parking Lot is Empty");
    } else {
        let sortedCarNums = parkingLot.sort((a, b) => a.localeCompare(b));
        console.log(sortedCarNums.join('\n'));
    };
}

// piccolo(['IN, CA2844AA',
//     'IN, CA1234TA',
//     'OUT, CA2844AA',
//     'IN, CA9999TT',
//     'IN, CA2866HI',
//     'OUT, CA1234TA',
//     'IN, CA2844AA',
//     'OUT, CA2866HI',
//     'IN, CA9876HH',
//     'IN, CA2822UU'])

piccolo(['IN, CA2844AA',
    'IN, CA1234TA',
    'OUT, CA2844AA',
    'OUT, CA1234TA'])