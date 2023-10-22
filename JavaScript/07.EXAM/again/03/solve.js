function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    const inputDOMElements = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
    };

    const formButtons = {
        loadBoardBtn: document.getElementById('load-board-btn'),
        addTaskBtn: document.getElementById('create-task-btn'),
    };

    const domSections = {
        toDoSection: document.querySelector('#todo-section > .task-list'),
        inProgressSection: document.querySelector('#in-progress-section > .task-list'),
        codeReviewSection: document.querySelector('#code-review-section > .task-list'),
        doneSection: document.querySelector('#done-section > .task-list'),
    };

    formButtons.loadBoardBtn.addEventListener('click', loadAllTasksHandler);
    formButtons.addTaskBtn.addEventListener('click', addTaskHandler);

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

    function loadAllTasksHandler() {
        for (const key in domSections) {
            domSections[key].innerHTML = '';
        };

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                let currentParent = null;
                let currentBtn = null;

                for (const key in data) {
                    if (data[key].status === 'ToDo') {
                        currentParent = domSections.toDoSection;
                        currentBtn = 'Move to In Progress';
                    } else if (data[key].status === 'In Progress') {
                        currentParent = domSections.inProgressSection;
                        currentBtn = 'Move to Code Review';
                    } else if (data[key].status === 'Code Review') {
                        currentParent = domSections.codeReviewSection;
                        currentBtn = 'Move to Done';
                    } else if (data[key].status === 'Done') {
                        currentParent = domSections.doneSection;
                        currentBtn = 'Close';
                    };

                    const taskContainer = createDOMElement('li', currentParent, null, data[key]._id, ['task']);
                    createDOMElement('h3', taskContainer, data[key].title);
                    createDOMElement('p', taskContainer, data[key].description);
                    const btn = createDOMElement('button', taskContainer, currentBtn);

                    btn.addEventListener('click', actionHandler);
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function addTaskHandler() {
        if (checkAllInputs()) {
            const payload = JSON.stringify({
                title: inputDOMElements.title.value,
                description: inputDOMElements.description.value,
                status: 'ToDo',
            });

            const httpHeaders = {
                method: 'POST',
                body: payload,
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    clearAllInputs();
                    loadAllTasksHandler();
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    };

    function actionHandler() {
        const currentID = this.parentNode.id;
        const [currentTitle, currentDescription, currentButton] = Array.from(this.parentNode.children);

        let checkDelete = false;
        let nextStatus = null;

        if (currentButton.textContent === 'Close') {
            checkDelete = true;

            deleteHttpHeaders = {
                method: 'DELETE',
            };

            fetch(`${BASE_URL}${currentID}`, deleteHttpHeaders)
                .then(() => {
                    loadAllTasksHandler();
                })
                .catch((err) => {
                    console.err(err);
                });
        } else if (currentButton.textContent === 'Move to In Progress') {
            nextStatus = 'In Progress'; 
        } else if (currentButton.textContent === 'Move to Code Review') {
            nextStatus = 'Code Review';
        } else if (currentButton.textContent === 'Move to Done') {
            nextStatus = 'Done';
        };

        const payload = JSON.stringify({
            title: currentTitle.textContent,
            description: currentDescription.textContent,
            status: nextStatus,
        });

        const httpHeaders = {
            method: 'PATCH',
            body: payload,
        };

        if (!checkDelete) {
            console.log(httpHeaders)
            fetch(`${BASE_URL}${currentID}`, httpHeaders)
                .then(() => {
                    loadAllTasksHandler();
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