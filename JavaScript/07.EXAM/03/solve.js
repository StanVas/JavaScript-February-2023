function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    const topButtons = {
        loadAllBtn: document.getElementById('load-board-btn'),
        createTaskBtn: document.getElementById('create-task-btn'),
    };

    const inputDOMEl = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
    };

    const domContainers = {
        todoContainer: document.querySelector('#todo-section > .task-list'),
        inProgressContainer: document.querySelector('#in-progress-section > .task-list'),
        codeReviewContainer: document.querySelector('#code-review-section > .task-list'),
        doneContainer: document.querySelector('#done-section > .task-list'),
    };

    topButtons.createTaskBtn.addEventListener('click', addTaskHandler);
    topButtons.loadAllBtn.addEventListener('click', loadAllTasksHandler);

    function checkAllInputs() {
        let checkAll = Object.values(inputDOMEl)
            .every((input) => input.value !== '');

        return checkAll;
    };

    function clearAllInputs() {
        Object.values(inputDOMEl)
            .forEach((input) => {
                input.value = '';
            });
    };

    function loadAllTasksHandler() {
        for (const key in domContainers) {
            domContainers[key].innerHTML = '';
        };

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    let currentParent = null;
                    let currentBtnText = null;
                    if (data[key].status === 'ToDo') {
                        currentParent = domContainers.todoContainer;
                        currentBtnText = 'Move to In Progress';
                    } else if (data[key].status === 'In Progress') {
                        currentParent = domContainers.inProgressContainer;
                        currentBtnText = 'Move to Code Review';
                    } else if (data[key].status === 'Code Review') {
                        currentParent = domContainers.codeReviewContainer;
                        currentBtnText = 'Move to Done';
                    } else if (data[key].status === 'Done') {
                        currentParent = domContainers.doneContainer;
                        currentBtnText = 'Close';
                    };

                    const currentTaskContainer = createDOMElement('li', currentParent, null, data[key]._id, ['task']);
                    createDOMElement('h3', currentTaskContainer, data[key].title);
                    createDOMElement('p', currentTaskContainer, data[key].description);
                    const currentBtn = createDOMElement('button', currentTaskContainer, currentBtnText);

                    currentBtn.addEventListener('click', actionHandler)
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function actionHandler() {
        const id = this.parentNode.id;
        let currentStatus = null;
        let currentMethod = null;

        const [currentTitle, currentDescription, _doNotNeed] = Array.from(this.parentNode.children)

        if (this.textContent === 'Move to In Progress') {
            currentStatus = 'In Progress';
            currentMethod = 'PATCH';
        } else if (this.textContent === 'Move to Code Review') {
            currentStatus = 'Code Review';
            currentMethod = 'PATCH';
        } else if (this.textContent === 'Move to Done') {
            currentStatus = 'Done';
            currentMethod = 'PATCH';
        } else if (this.textContent === 'Close') {
            currentMethod = 'DELETE';
        };

        if (currentMethod === 'DELETE') {
            const httpHeaders = {
                method: 'DELETE',
            };

            fetch(`${BASE_URL}${id}`, httpHeaders)
                .then(() => loadAllTasksHandler())
                .catch((err) => {
                    console.error(err)
                });
        } else {
            const payload = JSON.stringify({
                title: currentTitle.textContent,
                description: currentDescription.textContent,
                status: currentStatus,
            });

            const httpHeaders = {
                method: currentMethod,
                body: payload
            };

            fetch(`${BASE_URL}${id}`, httpHeaders)
                .then(() => loadAllTasksHandler())
                .catch((err) => {
                    console.error(err)
                });
        };

    };

    function addTaskHandler() {
        if (checkAllInputs()) {
            const payload = JSON.stringify({
                title: inputDOMEl.title.value,
                description: inputDOMEl.description.value,
                status: 'ToDo',
            });

            const httpHeaders = {
                method: 'POST',
                body: payload
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    loadAllTasksHandler();
                    clearAllInputs();
                })
                .catch((err) => {
                    console.error(err);
                });
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

attachEvents();