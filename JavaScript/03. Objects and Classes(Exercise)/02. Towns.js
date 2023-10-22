function townsParser(input) {
    let townsInfo = [];

    for (const line of input) {
        let [town, latitude, longitude] = line.split(' | ')
        let townObj = {town, latitude: Number(latitude).toFixed(2), longitude: Number(longitude).toFixed(2)};
        townsInfo.push(townObj)
    }

    for (const town of townsInfo) {
        console.log(town)
    }
}

// // from the lab/exercise - one line
// function townsParser(input) {
//     input
//     .map((line) => line.split(' | '))
//     .map(([town, latitude, longitude]) => ({ town, latitude: Number(latitude).toFixed(2), longitude: Number(longitude).toFixed(2)}))
//     .forEach((townObj) => console.log(townObj))
// }

townsParser(['Sofia | 42.696552 | 23.32601',
'Beijing | 39.913818 | 116.363625']
)