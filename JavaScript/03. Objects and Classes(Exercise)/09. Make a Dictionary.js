function makeDict(jsonInput) {
    let outputDict = {};

    for (const line of jsonInput) {
        let obj = JSON.parse(line);
        for (const key in obj) {
            outputDict[key] = obj[key];
        };     
    };

    let sortable = [];
    for (const key in outputDict) {
        sortable.push([key, outputDict[key]]);
    };

    sortable.sort(function(a,b){
        return a[0].localeCompare(b[0]);
    });

    sortable.forEach(e => {
        console.log(`Term: ${e[0]} => Definition: ${e[1]}`);
    });
}

makeDict([
    '{"Coffee":"1111A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
])