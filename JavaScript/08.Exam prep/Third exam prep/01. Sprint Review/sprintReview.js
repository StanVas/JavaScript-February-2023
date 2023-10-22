function solve(input) {
    const num = input.splice(0, 1);
    let board = input.splice(0, num);
    let boardObj = {};
    for (const line of board) {
        let [assignee, taskId, title, status, estimatedPoints] = line.split(':');

        if (!boardObj.hasOwnProperty(assignee)) {
            boardObj[assignee] = [];
        };

        boardObj[assignee].push({ taskId, title, status, estimatedPoints });
    };

    for (const commandLine of input) {
        let lineSplit = commandLine.split(':');
        let command = lineSplit[0];
        let assignee = lineSplit[1];

        if (command == 'Add New') {
            let taskId = lineSplit[2];
            let title = lineSplit[3];
            let status = lineSplit[4];
            let estimatedPoints = lineSplit[5];

            if (boardObj.hasOwnProperty(assignee)) {
                boardObj[assignee].push({ taskId, title, status, estimatedPoints });
            } else {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            };
        } else if (command === 'Change Status') {
            let taskId = lineSplit[2];
            let newStatus = lineSplit[3];

            if (!boardObj.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                let checkId = false;

                for (const task of boardObj[assignee]) {
                    if (task.taskId === taskId) {
                        checkId = true;
                        task.status = newStatus;
                    };
                };

                if (!checkId) {
                    console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
                };
            };
        } else if (command === 'Remove Task') {
            let index = Number(lineSplit[2]);

            if (!boardObj.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else if (boardObj[assignee].length <= index) {
                console.log("Index is out of range!");
            } else {
                boardObj[assignee].splice(index, 1);
            };
        };
    };

    let toDoPoints = 0;
    let inProgressPoints = 0;
    let codeReviewPoints = 0;
    let donePoints = 0;

    for (const key in boardObj) {
        for (const iterator of boardObj[key]) {
            if (iterator.status === 'ToDo') {
                toDoPoints = toDoPoints + Number(iterator.estimatedPoints);
            } else if (iterator.status === 'In Progress') {
                inProgressPoints = inProgressPoints + Number(iterator.estimatedPoints);
            } else if (iterator.status === 'Code Review') {
                codeReviewPoints = codeReviewPoints + Number(iterator.estimatedPoints);
            } else if (iterator.status === 'Done') {
                donePoints = donePoints + Number(iterator.estimatedPoints);
            };
        };
    };

    console.log(`ToDo: ${toDoPoints}pts`);
    console.log(`In Progress: ${inProgressPoints}pts`);
    console.log(`Code Review: ${codeReviewPoints}pts`);
    console.log(`Done Points: ${donePoints}pts`);

    if (donePoints >= (toDoPoints + codeReviewPoints + toDoPoints)) {
        console.log('Sprint was successful!');
    } else {
        console.log('Sprint was unsuccessful...');
    };
};

solve([
    '5',
    'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
    'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
    'Peter:BOP-1211:POC:Code Review:5',
    'Georgi:BOP-1212:Investigation Task:Done:2',
    'Mariya:BOP-1213:New Account Page:In Progress:13',
    'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
    'Change Status:Peter:BOP-1290:ToDo',
    'Remove Task:Mariya:1',
    'Remove Task:Joro:1',
])

solve([
    '4',
    'Kiril:BOP-1213:Fix Typo:Done:1',
    'Peter:BOP-1214:New Products Page:In Progress:2',
    'Mariya:BOP-1215:Setup Routing:ToDo:8',
    'Georgi:BOP-1216:Add Business Card:Code Review:3',
    'Add New:Sam:BOP-1237:Testing Home Page:Done:3',
    'Change Status:Georgi:BOP-1216:Done',
    'Change Status:Will:BOP-1212:In Progress',
    'Remove Task:Georgi:3',
    'Change Status:Mariya:BOP-1215:Done',
])

