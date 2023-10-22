function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';

    const inputDOMElements = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price'),
    };

    const otherDOMElements = {
        addProductBtn: document.getElementById('add-product'),
        updateProductBtn: document.getElementById('update-product'),
        loadAllBtn: document.getElementById('load-product'),
        table: document.getElementById('tbody'),
    };

    let updateId = null;

    otherDOMElements.addProductBtn.addEventListener('click', addProductHandler);
    otherDOMElements.loadAllBtn.addEventListener('click', loadAllHandler);

    function loadAllHandler(event) {
        if (event) {
            event.preventDefault();
        };

        otherDOMElements.table.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    const productContainer = createDOMElement('tr', otherDOMElements.table, null, data[key]._id);
                    createDOMElement('td', productContainer, data[key].product, null, ['name']);
                    createDOMElement('td', productContainer, data[key].count, null, ['count-product']);
                    createDOMElement('td', productContainer, data[key].price, null, ['product-price']);
                    const buttonsContainer = createDOMElement('td', productContainer, null, null, ['btn']);
                    const updateBtn = createDOMElement('button', buttonsContainer, 'Update', null, ['update']);
                    const deleteBtn = createDOMElement('button', buttonsContainer, 'Delete', null, ['delete']);

                    updateBtn.addEventListener('click', updateHandler);
                    deleteBtn.addEventListener('click', deleteHandler);
                };
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function addProductHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            const payload = JSON.stringify({
                product: inputDOMElements.product.value,
                count: inputDOMElements.count.value,
                price: inputDOMElements.price.value,
            });

            const httpHeaders = {
                method: 'POST',
                body: payload,
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    loadAllHandler();
                })
                .catch((err) => {
                    console.error(err)
                });

            clearAllInputs();
        };
    };

    function updateProductHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            const payload = JSON.stringify({
                product: inputDOMElements.product.value,
                count: inputDOMElements.count.value,
                price: inputDOMElements.price.value,
            });

            const httpHeaders = {
                method: 'PATCH',
                body: payload,
            };

            fetch(`${BASE_URL}${updateId}`, httpHeaders)
                .then(() => loadAllHandler())
                .catch((err) => {
                    console.error(err);
                });

            clearAllInputs();
            otherDOMElements.updateProductBtn.setAttribute('disabled', true);
            otherDOMElements.addProductBtn.removeAttribute('disabled');
        };
    };

    function updateHandler() {
        updateId = this.parentNode.parentNode.id;
        let [name, count, price] = Array.from(this.parentNode.parentNode.children);

        inputDOMElements.product.value = name.textContent;
        inputDOMElements.count.value = count.textContent;
        inputDOMElements.price.value = price.textContent;

        otherDOMElements.updateProductBtn.removeAttribute('disabled');
        otherDOMElements.addProductBtn.setAttribute('disabled', true);

        otherDOMElements.updateProductBtn.addEventListener('click', updateProductHandler);
    };

    function deleteHandler() {
        const id = this.parentNode.parentNode.id;

        const httpHeaders = {
            method: 'DELETE',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllHandler())
            .catch((err) => {
                console.error(err);
            });
    };


    function checkAllInputs() {
        let allInputs = Object.values(inputDOMElements)
            .every((input) => input.value !== '');
        return allInputs;
    };

    function clearAllInputs() {
        Object.values(inputDOMElements)
            .forEach((input) => {
                input.value = '';
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

solve();