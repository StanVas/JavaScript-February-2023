// TODO:
function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    const inputDOMElements = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
    };

    const formButtons = {
        loadBtn: document.getElementById('load-board-btn'),
        addBtn: document.getElementById('create-task-btn'),
    };

    const otherDOMElements = {
        toDo: document.querySelector('#todo-section > .task-list'),
        inProgress: document.querySelector('#in-progress-section > .task-list'),
        codeReview: document.querySelector('#code-review-section > .task-list'),
        done: document.querySelector('#done-section > .task-list'),
    };

    formButtons.loadBtn.addEventListener('click', loadBoardHandler);
    formButtons.addBtn.addEventListener('click', addTaskHandler);

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

    function loadBoardHandler() {
        for (const key in otherDOMElements) {
            otherDOMElements[key].innerHTML = '';
        };

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    let parentSection = null;
                    let buttonText = null;
                    if (data[key].status === 'ToDo') {
                        parentSection = otherDOMElements.toDo;
                        buttonText = 'Move to In Progress';
                    } else if (data[key].status === 'In Progress') {
                        parentSection = otherDOMElements.inProgress;
                        buttonText = 'Move to Code Review';
                    } else if (data[key].status === 'Code Review') {
                        parentSection = otherDOMElements.codeReview;
                        buttonText = 'Move to Done';
                    } else if (data[key].status === 'Done') {
                        parentSection = otherDOMElements.done;
                        buttonText = 'Close';
                    };

                    const taskContainer = createDOMElement('li', parentSection, null, data[key]._id, ['task']);
                    createDOMElement('h3', taskContainer, data[key].title);
                    createDOMElement('p', taskContainer, data[key].description);
                    const taskBtn = createDOMElement('button', taskContainer, buttonText);

                    taskBtn.addEventListener('click', taskActionHandler);
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
                    loadBoardHandler();
                    clearAllInputs();
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    };

    function taskActionHandler() {
        const id = this.parentNode.id;
        let nextStatus = null;
        let currentMethod = null;
        const [currentTitle, currentDescription, _btn] = Array.from(this.parentNode.children);

        if (this.textContent === 'Move to In Progress') {
            nextStatus = 'In Progress';
            currentMethod = 'POST';
        } else if (this.textContent === 'Move to Code Review') {
            nextStatus = 'Code Review';
            currentMethod = 'POST';
        } else if (this.textContent === 'Move to Done') {
            nextStatus = 'Done';
            currentMethod = 'POST';
        } else if (this.textContent === 'Close') {
            currentMethod = 'DELETE';
        };

        if (currentMethod === 'DELETE') {
            const httpHeaders = {
                method: 'DELETE'
            };

            fetch(`${BASE_URL}${id}`, httpHeaders)
                .then(() => loadBoardHandler())
                .catch((err) => {
                    console.error(err);
                });
        } else {
            const payload = JSON.stringify({
                title: currentTitle.textContent,
                description: currentDescription.textContent,
                status: nextStatus,
            });

            const httpHeaders = {
                method: 'PATCH',
                body: payload,
            };

            fetch(`${BASE_URL}${id}`, httpHeaders)
                .then(() => loadBoardHandler())
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