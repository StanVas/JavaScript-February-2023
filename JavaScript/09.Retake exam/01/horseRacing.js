function solve(input) {
    let horses = input.splice(0, 1);
    let horsesArr = horses[0].split('|');

    for (const line of input) {
        let lineSplit = line.split(' ');
        let command = lineSplit[0];

        if (command === 'Finish') {
            console.log(horsesArr.join('->'));
            console.log(`The winner is: ${horsesArr[horsesArr.length - 1]}`);
            return;
        } else if (command === 'Retake') {
            let overtakingHorse = lineSplit[1];
            let overtakenHorse = lineSplit[2];

            let overtakingIndex = horsesArr.indexOf(overtakingHorse);
            let overtakenIndex = horsesArr.indexOf(overtakenHorse);

            if (overtakingIndex < overtakenIndex) {
                [horsesArr[overtakingIndex], horsesArr[overtakenIndex]] = [horsesArr[overtakenIndex], horsesArr[overtakingIndex]];
                console.log(`${overtakingHorse} retakes ${overtakenHorse}.`)
            };
        } else if (command === 'Trouble') {
            let troubleHorse = lineSplit[1];
            let dropIndex = horsesArr.indexOf(troubleHorse);

            if (dropIndex > 0) {
                [horsesArr[dropIndex - 1], horsesArr[dropIndex]] = [horsesArr[dropIndex], horsesArr[dropIndex - 1]];
                console.log(`Trouble for ${troubleHorse} - drops one position.`)
            };
        } else if (command === 'Rage') {
            let rageHorse = lineSplit[1];
            let rageIndex = horsesArr.indexOf(rageHorse);

            if (rageIndex + 2 === horsesArr.length) {
                [horsesArr[rageIndex], horsesArr[horsesArr.length - 1]] = [horsesArr[horsesArr.length - 1], horsesArr[rageIndex]];
            } else if (rageIndex + 2 < horsesArr.length) {
                [horsesArr[rageIndex], horsesArr[rageIndex + 1], horsesArr[rageIndex + 2]] = [horsesArr[rageIndex + 1], horsesArr[rageIndex + 2], horsesArr[rageIndex]];
            };

            console.log(`${rageHorse} rages 2 positions ahead.`)
        } else if (command === 'Miracle') {
            let horseMiracle = horsesArr.splice(0, 1);
            horsesArr.push(horseMiracle[0]);
            console.log(`What a miracle - ${horseMiracle} becomes first.`);
        };
    };
}

// solve([
//     'Bella|Alexia|Sugar',
//     'Retake Alexia Sugar',
//     'Rage Bella',
//     'Trouble Bella',
//     'Finish'
// ])

// solve([
//     'Onyx|Domino|Sugar|Fiona',
//     'Trouble Onyx',
//     'Retake Onyx Sugar',
//     'Rage Domino',
//     'Miracle',
//     'Finish'
// ])

solve([
    'Fancy|Lilly',
    'Retake Lilly Fancy',
    'Trouble Lilly',
    'Trouble Lilly',
    'Finish',
    'Rage Lilly'
])