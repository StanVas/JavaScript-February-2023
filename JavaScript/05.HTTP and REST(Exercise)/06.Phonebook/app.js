function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/phonebook';

    const loadBtn = document.getElementById('btnLoad');
    const ulPhoneContainer = document.getElementById('phonebook');

    const createBtn = document.getElementById('btnCreate');
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');

    loadBtn.addEventListener('click', loadPhonebookHandler);
    createBtn.addEventListener('click', createContactHandler);

    async function loadPhonebookHandler() {
        try {
            let response = await fetch(BASE_URL);
            let data = await response.json();
            ulPhoneContainer.innerHTML = ''; // clear before next load
            for (const key in data) {
                currentElement = createHtmlElement('li', `${data[key].person}: ${data[key].phone}`, ulPhoneContainer, data[key]._id, { id: 'phonebook' });
                currentBtn = createHtmlElement('button', 'Delete', currentElement);
                currentBtn.addEventListener('click', deleteHandler);
            };

        } catch (err) {
            console.error(err);
        };
    };

    async function createContactHandler() {
        try {
            const person = personInput.value;
            const phone = phoneInput.value;
            const httpHeaders = {
                body: JSON.stringify({ person, phone }),
                method: 'POST'
            };

            await fetch(BASE_URL, httpHeaders)
                .then(() => {
                    loadPhonebookHandler();
                    person.value = '';
                    phone.value = '';
                });
        } catch (err) {
            console.error(err);
        };
    };

    function deleteHandler(event) {
        const id = event.currentTarget.parentNode.className
        const httpHeaders = {
            method: 'DELETE'
        };

        fetch(`${BASE_URL}/${id}`, httpHeaders)
            .then(() => loadPhonebookHandler())
            .catch((err) => {
                console.error(err)
            });
    };




    function createHtmlElement(type, content, parentNode, classToAdd, attributes) {
        const htmlElement = document.createElement(type);

        if (content) {
            htmlElement.textContent = content;
        };

        if (parentNode) {
            parentNode.appendChild(htmlElement);
        };

        // ['list', 'item'] => Arr
        if (classToAdd) {
            htmlElement.className = classToAdd;
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