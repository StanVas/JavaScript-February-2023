function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/'
    const addBtn = document.getElementById('add-button');
    const loadBtn = document.getElementById('load-button');
    const inputField = document.getElementById('title');
    const tasksContainer = document.getElementById('todo-list');

    addBtn.addEventListener('click', addTaskHandler);
    loadBtn.addEventListener('click', loadAllTasksHandler);
    
    function addTaskHandler(event) {
        event.preventDefault();
        if (inputField.value !== '') {
            const httpHeaders = {
                method: 'POST',
                body: JSON.stringify({ name: inputField.value }),
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => loadAllTasksHandler())
                .catch((err) => {
                    console.error(err);
                });
        };
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
                    const taskContainer = createDOMElement('li', null, tasksContainer, data[key]._id);
                    createDOMElement('span', data[key].name, taskContainer);
                    const removeBtn = createDOMElement('button', 'Remove', taskContainer);
                    const editBtn = createDOMElement('button', 'Edit', taskContainer);

                    removeBtn.addEventListener('click', removeTaskHandler);
                    editBtn.addEventListener('click', editTaskHandler);
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function removeTaskHandler() {
        const id = this.parentNode.id;

        const httpHeaders = {
            method: 'DELETE',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllTasksHandler())
            .catch((err) => {
                console.error(err);
            });
    };
    
    function editTaskHandler() {
        const liParent = this.parentNode;
        const [name, _remove, edit] = Array.from(liParent.children)
        edit.remove();
        const submitBtn = createDOMElement('button', 'Submit', liParent);
        submitBtn.addEventListener('click', submitTaskHandler);
        const editInput = createDOMElement('input', name.textContent);
        liParent.prepend(editInput);
        name.remove();
    };

    function submitTaskHandler() {
        const id = this.parentNode.id;
        const [ input ] = Array.from(this.parentNode.children);
        
        const httpHeaders = {
            method: 'PATCH',
            body: JSON.stringify({ name: input.value }),
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllTasksHandler())
            .catch((err) => {
                console.error(err);
            });
    };

    function createDOMElement(type, content, parentNode, id, className, attributes) {
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
