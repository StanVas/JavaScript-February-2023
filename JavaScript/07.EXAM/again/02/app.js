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
        taskId: document.getElementById('task-id'),
        form: document.getElementById('create-task-form'),
        createBtn: document.getElementById('create-task-btn'),
        deleteBtn: document.getElementById('delete-task-btn'),
        tasksSection: document.getElementById('tasks-section'),
        totalPoints: document.getElementById('total-sprint-points'),
    };

    let totalSprintPoints = 0;
    let taskCounter = 0;

    let tasksStorage = {};

    otherDOMElements.createBtn.addEventListener('click', createTaskHandler);

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
            taskCounter++;
            let currentLabel = null;
            let currentIcon = null;

            if (inputDOMElements.label.value === 'Feature') {
                currentLabel = 'feature';
                currentIcon = '&#8865;'
            } else if (inputDOMElements.label.value === 'Low Priority Bug') {
                currentLabel = 'low-priority';
                currentIcon = '&#9737;'
            } else if (inputDOMElements.label.value === 'High Priority Bug') {
                currentLabel = 'high-priority';
                currentIcon = '&#9888;'
            };

            const taskContainer = createDOMElement('article', otherDOMElements.tasksSection, null, `task-${taskCounter}`, ['task-card']);
            const taskLabel = createDOMElement('div', taskContainer, null, null, ['task-card-label', currentLabel]);
            taskLabel.innerHTML = `${inputDOMElements.label.value} ${currentIcon}`;
            createDOMElement('h3', taskContainer, inputDOMElements.title.value, null, ['task-card-title']);
            createDOMElement('p', taskContainer, inputDOMElements.description.value, null, ['task-card-description']);
            createDOMElement('div', taskContainer, `Estimated at ${inputDOMElements.points.value} pts`, null, ['task-card-points']);
            createDOMElement('div', taskContainer, `Assigned to: ${inputDOMElements.assignee.value}`, null, ['task-card-assignee']);
            const btnContainer = createDOMElement('div', taskContainer, null, null, ['task-card-actions']);
            const deleteTaskBtn = createDOMElement('button', btnContainer, 'Delete');

            totalSprintPoints = totalSprintPoints + Number(inputDOMElements.points.value);
            otherDOMElements.totalPoints.textContent = `Total Points ${totalSprintPoints}pts`;

            tasksStorage[taskContainer.id] = [
                inputDOMElements.title.value,
                inputDOMElements.description.value,
                inputDOMElements.label.value,
                inputDOMElements.points.value,
                inputDOMElements.assignee.value,
            ];

            deleteTaskBtn.addEventListener('click', deleteLoadHandler);
            clearAllInputs();
        };
    };

    function deleteLoadHandler() {
        const parent = this.parentNode.parentNode;
        inputDOMElements.title.value = tasksStorage[parent.id][0];
        inputDOMElements.description.value = tasksStorage[parent.id][1];
        inputDOMElements.label.value = tasksStorage[parent.id][2];
        inputDOMElements.points.value = tasksStorage[parent.id][3];
        inputDOMElements.assignee.value = tasksStorage[parent.id][4];
        otherDOMElements.taskId.value = parent.id;

        otherDOMElements.deleteBtn.removeAttribute('disabled');
        otherDOMElements.createBtn.setAttribute('disabled', true);

        for (const element in inputDOMElements) {
            inputDOMElements[element].setAttribute('disabled', true);
        };

        otherDOMElements.deleteBtn.addEventListener('click', deleteTaskHandler);
    };

    function deleteTaskHandler() {
        totalSprintPoints = totalSprintPoints - Number(inputDOMElements.points.value);
        otherDOMElements.totalPoints.textContent = `Total Points ${totalSprintPoints}pts`;

        const id = otherDOMElements.taskId.value;
        let itemToRemove = document.getElementById(id);

        itemToRemove.remove();
        clearAllInputs();

        otherDOMElements.createBtn.removeAttribute('disabled');
        otherDOMElements.deleteBtn.setAttribute('disabled', true);
        for (const element in inputDOMElements) {
            inputDOMElements[element].removeAttribute('disabled');
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

        // if (className) {
        //     htmlElement.classList.add(className);
        // };

        // ['list', 'item'] => Arr
        if (classes && classes.length > 0) {
            htmlElement.classList.add(...classes);
        };

        // {src: 'link to image', href: 'link to site', type: 'checkbox' ...} => Obj
        if (attributes) {
            for (const key in attributes) {
                htmlElement.setAttribute(key, attributes[key]);
            };
        };

        return htmlElement;
    };
}