function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/tasks/';
    let currentId = null;

    const inputDOMElements = {
        title: document.getElementById('course-name'),
        type: document.getElementById('course-type'),
        description: document.getElementById('description'),
        teacher: document.getElementById('teacher-name'),
    };

    const otherDOMElements = {
        loadBtn: document.getElementById('load-course'),
        addBtn: document.getElementById('add-course'),
        editBtn: document.getElementById('edit-course'),
        coursesContainer: document.getElementById('list'),
    };

    otherDOMElements.loadBtn.addEventListener('click', loadAllHandler);
    otherDOMElements.addBtn.addEventListener('click', addTaskHandler);

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

    function loadAllHandler() {
        otherDOMElements.coursesContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    const courseContainer = createDOMElement('div', otherDOMElements.coursesContainer, null, data[key]._id, ['container']);
                    createDOMElement('h2', courseContainer, data[key].title);
                    createDOMElement('h3', courseContainer, data[key].teacher);
                    createDOMElement('h3', courseContainer, data[key].type);
                    createDOMElement('h4', courseContainer, data[key].description);
                    const taskEditBtn = createDOMElement('button', courseContainer, 'Edit Course', null, ['edit-btn']);
                    const taskFinishBtn = createDOMElement('button', courseContainer, 'Finish Course', null, ['finish-btn']);

                    taskEditBtn.addEventListener('click', editTaskHandler);
                    taskFinishBtn.addEventListener('click', finishTaskHandler);
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

        if (checkAllInputs()) {
            if (inputDOMElements.type.value === 'Long' || inputDOMElements.type.value === 'Medium' || inputDOMElements.type.value === 'Short') {
                const payload = JSON.stringify({
                    title: inputDOMElements.title.value,
                    type: inputDOMElements.type.value,
                    description: inputDOMElements.description.value,
                    teacher: inputDOMElements.teacher.value,
                });

                const httpHeaders = {
                    method: 'POST',
                    body: payload,
                };

                fetch(BASE_URL, httpHeaders)
                    .then(() => {
                        loadAllHandler();
                        clearAllInputs();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            };
        };
    };

    function editTaskHandler() {
        const id = this.parentNode.id;
        currentId = id;
        let [title, teacher, type, description] = Array.from(this.parentNode.children);
        inputDOMElements.title.value = title.textContent
        inputDOMElements.teacher.value = teacher.textContent
        inputDOMElements.type.value = type.textContent
        inputDOMElements.description.value = description.textContent

        this.parentNode.remove();
        otherDOMElements.addBtn.setAttribute('disabled', true);
        otherDOMElements.editBtn.removeAttribute('disabled');

        otherDOMElements.editBtn.addEventListener('click', editFormHandler);
    };

    function editFormHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            const payload = JSON.stringify({
                title: inputDOMElements.title.value,
                type: inputDOMElements.type.value,
                description: inputDOMElements.description.value,
                teacher: inputDOMElements.teacher.value,
            });

            const httpHeaders = {
                method: 'PUT',
                body: payload,
            };

            fetch(`${BASE_URL}${currentId}`, httpHeaders)
                .then(() => {
                    loadAllHandler();
                    clearAllInputs();
                })
                .catch((err) => {
                    console.error(err);
                });

            otherDOMElements.addBtn.removeAttribute('disabled');
            otherDOMElements.editBtn.setAttribute('disabled', true);
        };
    };

    function finishTaskHandler() {
        const id = this.parentNode.id;

        const httpHeaders = {
            method: 'DELETE'
        };

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