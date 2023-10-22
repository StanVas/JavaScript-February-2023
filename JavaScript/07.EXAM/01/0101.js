function solve(input) {
    const n = Number(input.shift());
 
    let data = {};
 
    for (let index = 0; index < n; index++) {
        let [assignee, taskId, title, status, estimatedPoints] = input.shift().split(':');
        if (!data.hasOwnProperty(assignee)) {
            data[assignee] = [{taskId, title, status, estimatedPoints}];
        } else {
            data[assignee].push({taskId, title, status, estimatedPoints})
        }
    }
 
    for (const line of input) {
        const lineData = line.split(':');
        const command = lineData[0];
 
        if (command === 'Add New') {
            const assignee = lineData[1];
            const taskId = lineData[2];
            const title = lineData[3];
            const status = lineData[4];
            const estimatedPoints = lineData[5];
 
            if (data.hasOwnProperty(assignee)) {
                data[assignee].push({taskId, title, status, estimatedPoints});
            } else {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            }
        } else if (command === 'Change Status') {
            const assignee = lineData[1];
            const taskId = lineData[2];
            const newStatus = lineData[3];
            if (!data.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`)
            } else {
                let found = false;
                for (const task of data[assignee]) {
                    if (task.taskId === taskId) {
                        found = true;
                        task.status = newStatus;
                    }
                }
                if (found === false) {
                    console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
                }
            }
        } else if (command === 'Remove Task') {
            const assignee = lineData[1];
            const index = Number(lineData[2]);
            if (!data.hasOwnProperty(assignee)) {
                console.log(`Assignee ${assignee} does not exist on the board!`)
            } else {
                if (data[assignee][index] !== undefined) {
                    const removed = data[assignee].splice(index, 1);
                } else {
                    console.log("Index is out of range!");
                }
            }
        }
    }
 
 
    let doneSum = 0;
    let progressSum = 0;
    let codeReviewSum = 0;
    let toDoSum = 0;
 
    for (const assignee in data) {
        for (const task of data[assignee]) {
            if (task.status === 'ToDo') {
                toDoSum += Number(task.estimatedPoints);
            } else if (task.status === 'In Progress') {
                progressSum += Number(task.estimatedPoints);
            } else if (task.status === 'Code Review') {
                codeReviewSum += Number(task.estimatedPoints);
            } else if (task.status === 'Done') {
                doneSum += Number(task.estimatedPoints);
            }
        }
    }
 
    console.log(`ToDo: ${toDoSum}pts`);
    console.log(`In Progress: ${progressSum}pts`);
    console.log(`Code Review: ${codeReviewSum}pts`);
    console.log(`Done Points: ${doneSum}pts`);
 
    if (doneSum >= codeReviewSum + toDoSum + progressSum) {
        console.log('Sprint was successful!')
    } else {
        console.log("Sprint was unsuccessful...")
    }
}

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