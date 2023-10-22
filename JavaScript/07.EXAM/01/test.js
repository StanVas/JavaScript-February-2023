function sprintReview(input) {
    const numberOfTasks = input.splice(0, 1);
    let tasksArr = input.splice(0, numberOfTasks);
    let tasksObj = {};

    for (const task of tasksArr) {
        let currentLine = task.split(':');
        let assignee = currentLine[0];
        let taskId = currentLine[1];
        let title = currentLine[2];
        let status = currentLine[3];
        let estimatedPoints = currentLine[4];

        if (!(tasksObj.hasOwnProperty(assignee))) {
            tasksObj[assignee] = [];
        };

        tasksObj[assignee].push({ taskId, title, status, estimatedPoints });
    };

    for (const line of input) {
        let lineSplit = line.split(':');
        let command = lineSplit[0];
        let assignee = lineSplit[1];

        if (command === 'Add New') {
            let taskId = lineSplit[2];
            let title = lineSplit[3];
            let status = lineSplit[4];
            let estimatedPoints = lineSplit[5];

            if (!(tasksObj.hasOwnProperty(assignee))) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                tasksObj[assignee].push({ taskId, title, status, estimatedPoints });
            };

        } else if (command === 'Change Status') {
            let currentTaskId = lineSplit[2];
            let currentStatus = lineSplit[3];

            if (!(tasksObj.hasOwnProperty(assignee))) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else {
                let condition = false;

                for (const task of tasksObj[assignee]) {
                    if (task.taskId === currentTaskId) {
                        task.status = currentStatus;
                        condition = true;
                    };
                };

                if (!condition) {
                    console.log(`Task with ID ${currentTaskId} does not exist for ${assignee}!`);
                };
            };
        } else if (command === 'Remove Task') {
            let index = lineSplit[2];

            if (!(tasksObj.hasOwnProperty(assignee))) {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            } else if (tasksObj[assignee].length <= index) {
                console.log("Index is out of range!")
            } else {
                tasksObj[assignee].splice(index, 1);
            };
        };
    };

    let toDoPoints = 0;
    let inProgressPoints = 0;
    let codeReviewPoints = 0;
    let donePoints = 0;

    for (const assignee in tasksObj) {
        for (const task of tasksObj[assignee]) {
            if (task.status === 'ToDo') {
                toDoPoints = toDoPoints + Number(task.estimatedPoints);
            } else if (task.status === 'In Progress') {
                inProgressPoints = inProgressPoints + Number(task.estimatedPoints);
            } else if (task.status === 'Code Review') {
                codeReviewPoints = codeReviewPoints + Number(task.estimatedPoints);
            } else if (task.status === 'Done') {
                donePoints = donePoints + Number(task.estimatedPoints);
            };
        };
    };

    console.log(`ToDo: ${toDoPoints}pts`);
    console.log(`In Progress: ${inProgressPoints}pts`);
    console.log(`Code Review: ${codeReviewPoints}pts`);
    console.log(`Done Points: ${donePoints}pts`);

    if (donePoints < (toDoPoints + inProgressPoints + codeReviewPoints)) {
        console.log('Sprint was unsuccessful...')
    } else {
        console.log('Sprint was successful!')
    };
}

// sprintReview([
//     '5',
//     'Kiril:BOP-1209:Fix Minor Bug:ToDo:3',
//     'Mariya:BOP-1210:Fix Major Bug:In Progress:3',
//     'Peter:BOP-1211:POC:Code Review:5',
//     'Georgi:BOP-1212:Investigation Task:Done:2',
//     'Mariya:BOP-1213:New Account Page:In Progress:13',
//     'Add New:Kiril:BOP-1217:Add Info Page:In Progress:5',
//     'Change Status:Peter:BOP-1290:ToDo',
//     // 'Change Status:Peter:BOP-1211:Done',
//     'Remove Task:Mariya:1',
//     'Remove Task:Joro:1',
// ])

sprintReview([
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