window.addEventListener('load', solve);

function solve() {
    const inputDOMElements = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        points: document.getElementById('points'),
        assignee: document.getElementById('assignee'),
    };

    const otherDOMElements = {
        createTaskBtn: document.getElementById('create-task-btn'),
        deleteTaskBtn: document.getElementById('delete-task-btn'),
        form: document.getElementById('create-task-form'),
        totalPoints: document.getElementById('total-sprint-points'),
        tasksContainer: document.getElementById('tasks-section'),
        taskID: document.getElementById('task-id'),
    };

    let pointsCounter = 0;
    let tasksCounter = 0;

    const storeTasks = {};

    otherDOMElements.createTaskBtn.addEventListener('click', createTaskHandler);

    function checkAllInputs() {
        let checkAll = Object.values(inputDOMElements)
            .every((input) => input.value !== '');

        return checkAll;
    };

    function clearAllInputs() {
        Object.values(inputDOMElements)
            .forEach((input) => {
                input.value = '';
            });
    };

    function createTaskHandler() {
        if (checkAllInputs()) {
            let icon = null;
            let currentClass = null;
            if (inputDOMElements.label.value === 'Feature') {
                icon = '&#8865;';
                currentClass = 'feature';
            } else if (inputDOMElements.label.value === 'Low Priority Bug') {
                icon = '&#9737;'
                currentClass = 'low-priority';
            } else if (inputDOMElements.label.value === 'High Priority Bug') {
                icon = '&#9888;'
                currentClass = 'high-priority';
            };

            tasksCounter ++;

            const taskContainer = createDOMElement('article', otherDOMElements.tasksContainer, null, `task-${Number(tasksCounter)}`, ['task-card']);
            const cardLabel = createDOMElement('div', taskContainer, null, null, ['task-card-label', `${currentClass}`]);
            cardLabel.innerHTML = `${inputDOMElements.label.value} ${icon}`;
            createDOMElement('h3', taskContainer, inputDOMElements.title.value, null, ['task-card-title']);
            createDOMElement('p', taskContainer, inputDOMElements.description.value, null, ['task-card-description']);
            createDOMElement('div', taskContainer, `Estimated at ${inputDOMElements.points.value} pts`, null, ['task-card-points']);
            createDOMElement('div', taskContainer, `Assigned to: ${inputDOMElements.assignee.value}`, null, ['task-card-assignee']);
            const btnContainer = createDOMElement('div', taskContainer, null, null, ['task-card-actions']);
            const deleteBtn = createDOMElement('button', btnContainer, 'Delete');

            deleteBtn.addEventListener('click', loadDeleteTaskHandler);
            
            pointsCounter = pointsCounter + Number(inputDOMElements.points.value);
            otherDOMElements.totalPoints.textContent = `Total Points ${pointsCounter}pts`;

            const id = `task-${Number(tasksCounter)}`;
            storeTasks[id] = [
                inputDOMElements.title.value,
                inputDOMElements.description.value,
                inputDOMElements.label.value,
                inputDOMElements.points.value,
                inputDOMElements.assignee.value,
            ]

            clearAllInputs();
        };
    };

    function loadDeleteTaskHandler() {
        const id = this.parentNode.parentNode.id
        let [title, description, label, points, assignee] = Object.values(storeTasks[id])

        otherDOMElements.taskID.value = id;
        inputDOMElements.title.value = title;
        inputDOMElements.description.value = description;
        inputDOMElements.label.value = label;
        inputDOMElements.points.value = points;
        inputDOMElements.assignee.value = assignee;
  
        for (const key in inputDOMElements) {
            inputDOMElements[key].setAttribute('disabled', true)
        };
        otherDOMElements.deleteTaskBtn.removeAttribute('disabled');
        otherDOMElements.createTaskBtn.setAttribute('disabled', true)

        otherDOMElements.deleteTaskBtn.addEventListener('click', deleteTaskHandler);
    };

    function deleteTaskHandler() {
        pointsCounter = pointsCounter - Number(inputDOMElements.points.value);
        otherDOMElements.totalPoints.textContent = `Total Points ${pointsCounter}pts`;

        const id = otherDOMElements.taskID.value;
        const itemToDel = document.querySelector(`#${id}`);
        itemToDel.remove();
        clearAllInputs();
        otherDOMElements.deleteTaskBtn.setAttribute('disabled', true);
        otherDOMElements.createTaskBtn.removeAttribute('disabled');
        for (const key in inputDOMElements) {
            inputDOMElements[key].removeAttribute('disabled');
        };
    };


    function createDOMElement(type, parentNode, content, id, classes, attributes) {
        const htmlElement = document.createElement(type);

        if (content && type !== 'input') {
            htmlElement.textContent = content;
        };

        if (content && type === 'input') {
            htmlElement.value = content;
        };

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        };

        if (id) {
            htmlElement.id = id;
        };

        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        };

        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key]);
            };
        };

        return htmlElement;
    };
}