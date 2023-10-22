function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';

    const inputField = document.getElementById('title');
    const addBtn = document.getElementById('add-button');
    const loadAllBtn = document.getElementById('load-button');
    const tasksContainer = document.getElementById('todo-list');

    loadAllBtn.addEventListener('click', loadAllHandler);
    addBtn.addEventListener('click', addTaskHandler);

    function loadAllHandler(event) {
        if (event) {
            event.preventDefault();
        };

        tasksContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    const taskContainer = createDOMElement('li', tasksContainer, null, data[key]._id);
                    createDOMElement('span', taskContainer, data[key].name);
                    const removeBtn = createDOMElement('button', taskContainer, 'Remove');
                    const editBtn = createDOMElement('button', taskContainer, 'Edit');

                    removeBtn.addEventListener('click', removeTaskHandler);
                    editBtn.addEventListener('click', editTaskHandler);
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function addTaskHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (inputField.value !== '') {
            const httpHeaders = {
                method: 'POST',
                body: JSON.stringify({name: inputField.value}),
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    inputField.value = '';
                    loadAllHandler();
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    };

    function removeTaskHandler() {
        const id = this.parentNode.id;
        const httpHeaders = ({
            method: 'DELETE',
        })

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllHandler())
            .catch((err) => {
                console.error(err);
            });
    };

    function editTaskHandler() {
        const [taskText, remove, edit] = Array.from(this.parentNode.children);
        const btnParent = this.parentNode  
        // const [taskText, remove, edit] = btnParent.children;  // also works?
        edit.remove();
        const inputField = createDOMElement('input', null, taskText.textContent);
        btnParent.prepend(inputField);
        taskText.remove();
        submitBtn = createDOMElement('button', btnParent, 'Submit');
        submitBtn.addEventListener('click', submitEditedTaskHandler);
    };

    function submitEditedTaskHandler() {
        const id = this.parentNode.id;
        const [input] = Array.from(this.parentNode.children);

        httpHeaders = ({
            method: 'PATCH',
            body: JSON.stringify({name: input.value}),
        });

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllHandler())
            .catch((err) => {
                console.error(err);
            });
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

attachEvents();
