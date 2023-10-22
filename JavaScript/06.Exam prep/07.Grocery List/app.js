function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';
    let currentId = null;

    const inputDOMElements = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price'),
    };

    const otherDOMElements = {
        addProduct: document.getElementById('add-product'),
        updateProduct: document.getElementById('update-product'),
        loadAll: document.getElementById('load-product'),
        productsContainer: document.getElementById('tbody'),
    };

    otherDOMElements.addProduct.addEventListener('click', addProductHandler);
    otherDOMElements.loadAll.addEventListener('click', loadAllHandler);

    function loadAllHandler(event) {
        if (event) {
            event.preventDefault();
        };

        otherDOMElements.productsContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((response) => response.json())
            .then((data) => {
                for (const key in data) {
                    const currentProductContainer = createDOMElement('tr', otherDOMElements.productsContainer, null, data[key]._id);
                    createDOMElement('td', currentProductContainer, data[key].product, null, 'name');
                    createDOMElement('td', currentProductContainer, data[key].count, null, 'count-product');
                    createDOMElement('td', currentProductContainer, data[key].price, null, 'product-price');
                    const buttonsContainer = createDOMElement('td', currentProductContainer, null, null, 'btn');
                    const updateBtn = createDOMElement('button', buttonsContainer, 'Update', null, 'update');
                    const deleteBtn = createDOMElement('button', buttonsContainer, 'Delete', null, 'delete');

                    updateBtn.addEventListener('click', updateProductHandler);
                    deleteBtn.addEventListener('click', deleteProductHandler);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    function checkAllInputs() {
        let inputs = Object.values(inputDOMElements)
            .every((input) => input.value !== '');
        return inputs;
    };

    function addProductHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            const httpHeaders = {
                method: 'POST',
                body: JSON.stringify({
                    product: inputDOMElements.product.value,
                    count: inputDOMElements.count.value,
                    price: inputDOMElements.price.value,
                }),
            };
    
            fetch(BASE_URL, httpHeaders)
                .then(() => loadAllHandler())
                .catch((err) => {
                    console.error(err);
                });
    
            for (const key in inputDOMElements) {
                inputDOMElements[key].value = '';
            };
        };
    };

    function deleteProductHandler() {
        const id = this.parentNode.parentNode.id;
        httpHeaders = {
            method: 'DELETE',
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadAllHandler())
            .catch((err) => {
                console.error(err);
            });
    };

    function updateProductHandler() {
        const id = this.parentNode.parentNode.id;
        currentId = id;
        otherDOMElements.updateProduct.removeAttribute('disabled');
        otherDOMElements.addProduct.setAttribute('disabled', true);

        const container = this.parentNode.parentNode;
        const currentProduct = container.querySelector('.name');
        const currentCount = container.querySelector('.count-product');
        const currentPrice = container.querySelector('.product-price');
        
        inputDOMElements.product.value = currentProduct.textContent;
        inputDOMElements.count.value = currentCount.textContent;
        inputDOMElements.price.value = currentPrice.textContent;

        otherDOMElements.updateProduct.addEventListener('click', sendUpdateHandler);
    };

    function sendUpdateHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()){
            httpHeaders = {
                method: 'PATCH',
                body: JSON.stringify({
                    product: inputDOMElements.product.value,
                    count: inputDOMElements.count.value,
                    price: inputDOMElements.price.value,
                }),
            };

            fetch(`${BASE_URL}${currentId}`, httpHeaders)
                .then(() => {
                    loadAllHandler();
                    otherDOMElements.updateProduct.setAttribute('disabled', true);
                    otherDOMElements.addProduct.removeAttribute('disabled');
                    for (const key in inputDOMElements) {
                        inputDOMElements[key].value = '';
                    };
                })
                .catch((err) => {
                    console.error(err);
                });
        };
        
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

solve();