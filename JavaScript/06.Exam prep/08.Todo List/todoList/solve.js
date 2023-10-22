function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/'

    const loadAllTasksBtn = document.getElementById('load-button');
    const addTaskBtn = document.getElementById('add-button');
    const inputField = document.getElementById('title');
    const tasksContainer = document.getElementById('todo-list');

    loadAllTasksBtn.addEventListener('click', loadAllTasksHandler);
    addTaskBtn.addEventListener('click', addTaskHandler);

    function addTaskHandler(event) {
        if (event) {
            event.preventDefault();
        };

        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({ name: inputField.value }),
        };

        fetch(BASE_URL, httpHeaders)
            .then(() => loadAllTasksHandler())
            .catch((err) => {
                console.error(err);
            });
        
        inputField.value = ''; 
    };

    function loadAllTasksHandler(event) {
        if (event) {
            event.preventDefault();
        };

        tasksContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                  const currentTaskContainer = createDOMElement('li', tasksContainer, null, data[key]._id);
                  createDOMElement('span', currentTaskContainer, data[key].name);
                  const removeTaskBtn = createDOMElement('button', currentTaskContainer, 'Remove');
                  const editTaskBtn = createDOMElement('button', currentTaskContainer, 'Edit');

                  removeTaskBtn.addEventListener('click', removeTaskHandler);
                  editTaskBtn.addEventListener('click', editTaskHandler);
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function removeTaskHandler() {
        const id = this.parentNode.id;
        
        httpHeaders = {
            method: 'DELETE',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllTasksHandler())
            .catch((err) => {
                console.error(err);
            });
    };

    function editTaskHandler() {
        const btnParent = this.parentNode;
        const [name, _remove, edit] = Array.from(btnParent.children)
        edit.remove();
        const submitBtn = createDOMElement('button', btnParent, 'Submit');
        const inputEdit = createDOMElement('input', null, name.textContent);
        btnParent.prepend(inputEdit);
        name.remove();
        submitBtn.addEventListener('click', submitEditedTaskHandler);
    };

    function submitEditedTaskHandler() {
        const id = this.parentNode.id;
        const [ input ] = Array.from(this.parentNode.children); // take only the first item

        httpHeaders = {
            method: 'PATCH',
            body: JSON.stringify({name: input.value}),
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllTasksHandler())
            .catch((err) => {
                console.error(err);
            });
    };


    function createDOMElement(type, parentNode, content, id, className, attributes) {
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

        // if (classes && classes.length > 0) {
        //   htmlElement.classList.add(...classes);
        // };

        if (className) {
            htmlElement.classList.add(className);
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
