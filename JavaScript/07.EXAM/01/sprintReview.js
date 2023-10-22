function sprintReview(input) {
    let number = input.splice(0, 1);
    let tasksArr = Array.from(input.splice(0, number));
    let tasksObj = {};

    for (const line of tasksArr) {
        let [assignee, taskId, title, status, estimatedPoints] = line.split(':');
        tasksObj[taskId] = {assignee, title, status, estimatedPoints};
    };

    for (const line of input) {
        let splitArr = Array.from(line.split(':'));
        let command = splitArr[0];
        let assignee = splitArr[1];
        
        if (command === 'Add New'){
            if (checkForAssignee(assignee)){
                let taskId = splitArr[2]
                let title = splitArr[3]
                let status = splitArr[4]
                let estimatedPoints = splitArr[5]
                tasksObj[taskId] = {assignee, title, status, estimatedPoints}
            } else {
                console.log(`Assignee ${assignee} does not exist on the board!`);
            };
        } else if (command === 'Change Status'){
            if (checkForAssignee(assignee)){
                let taskId = splitArr[2]
                for (const key in tasksObj) {
                    if (key === taskId){
                        tasksObj[taskId].status = splitArr[3]
                        
                    } else {
                        console.log(`Task with ID ${taskId} does not exist for ${assignee}!`)
                        break
                    }
                }
            } else {
                console.log(`Assignee ${assignee} does not exist on the board!`)
            }
        } else if (command === 'Remove Task'){

        };  
    };
    
    function checkForAssignee(itemToCheck) {
        for (let key in tasksObj) {
            if(tasksObj[key].assignee === itemToCheck){
                return true
            };
        };
    };

    let toDoPoints = 0;
    let inprogressPoints = 0;
    let codeReviewPoints =0;
    let donePoints = 0;

    for (const key in tasksObj) {
        if (tasksObj[key].status === 'ToDo'){
            toDoPoints = toDoPoints + Number(tasksObj[key].estimatedPoints);
        } else if (tasksObj[key].status === 'In Progress'){
            inprogressPoints = inprogressPoints + Number(tasksObj[key].estimatedPoints);
        } else if (tasksObj[key].status === 'Code Review'){
            codeReviewPoints = codeReviewPoints + Number(tasksObj[key].estimatedPoints);
        } else if (tasksObj[key].status === 'Done'){
            donePoints = donePoints + Number(tasksObj[key].estimatedPoints);
        };
    };
    
    console.log(`ToDo: ${toDoPoints}pts`)
    console.log(`ToDo: ${inprogressPoints}pts`)
    console.log(`ToDo: ${codeReviewPoints}pts`)
    console.log(`ToDo: ${donePoints}pts`)

    let totalPoints = inprogressPoints + codeReviewPoints + donePoints

    if (toDoPoints >= totalPoints){
        console.log('Sprint was successful!');
    } else {
        console.log('Sprint was unsuccessful...');
    };
}

sprintReview([
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