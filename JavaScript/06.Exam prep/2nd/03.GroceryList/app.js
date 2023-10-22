function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/grocery/';

    let updateId = null;

    const inputDomSelectors = {
        product: document.getElementById('product'),
        count: document.getElementById('count'),
        price: document.getElementById('price'),
    };

    const otherDomSelectors = {
        addBtn: document.getElementById('add-product'),
        updateBtn: document.getElementById('update-product'),
        loadBtn: document.getElementById('load-product'),
        tableContainer: document.getElementById('tbody'),
        formContainer: document.querySelector('.list'),
    };

    otherDomSelectors.loadBtn.addEventListener('click', loadProductsHandler);
    otherDomSelectors.addBtn.addEventListener('click', addProductHandler)

    function loadProductsHandler(event) {
        if (event) {
            event.preventDefault();
        };

        otherDomSelectors.tableContainer.innerHTML = '';

        fetch(BASE_URL)
            .then((res) => res.json())
            .then((allProductsData) => {
                for (const key in allProductsData) {
                    let product = allProductsData[key].product;
                    let count = allProductsData[key].count;
                    let price = allProductsData[key].price;
                    let id = allProductsData[key]._id

                    let trContainer = createElement('tr', otherDomSelectors.tableContainer, null, id);
                    createElement('td', trContainer, product, null, 'name');
                    createElement('td', trContainer, count, null, 'count-product');
                    createElement('td', trContainer, price, null, 'product-price');
                    let btnContainer = createElement('td', trContainer, null, null, 'btn');
                    const updateBtn = createElement('button', btnContainer, 'Update', null, 'update');
                    const deleteBtn = createElement('button', btnContainer, 'Delete', null, 'delete');

                    deleteBtn.addEventListener('click', deleteProductHandler);
                    updateBtn.addEventListener('click', updateProductHandler);
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

        let checkAllInputs = Object.values(inputDomSelectors)
            .every((input) => input.value !== '');

        if (checkAllInputs) {
            const { product, count, price } = inputDomSelectors;
            const payload = JSON.stringify({
                product: product.value,
                count: count.value,
                price: price.value,
            });

            const httpHeaders = {
                method: 'POST',
                body: payload
            };

            fetch(BASE_URL, httpHeaders)
                .then(() => {
                    loadProductsHandler();
                    otherDomSelectors.formContainer.reset();
                })
                .catch((err) => {
                    console.error(err);
                });
        };
    };

    function deleteProductHandler() {
        const id = this.parentNode.parentNode.id;
        const httpHeaders = {
            method: 'DELETE'
        };

        fetch(`${BASE_URL}${id}`, httpHeaders)
            .then(() => loadProductsHandler())
            .catch((err) => {
                console.error(err);
            });
    };

    function updateProductHandler() {
        const currentTr = this.parentNode.parentNode;
        updateId = this.parentNode.parentNode.id;
        let currentName = currentTr.querySelector('.name');
        let currentCount = currentTr.querySelector('.count-product');
        let currentPrice = currentTr.querySelector('.product-price');
        inputDomSelectors.product.value = currentName.textContent;
        inputDomSelectors.count.value = currentCount.textContent;
        inputDomSelectors.price.value = currentPrice.textContent;

        otherDomSelectors.addBtn.setAttribute('disabled', true);
        otherDomSelectors.updateBtn.removeAttribute('disabled');

        otherDomSelectors.updateBtn.addEventListener('click', sendUpdateHandler);
    };

    function sendUpdateHandler(event) {
        event.preventDefault();

        const { product, count, price } = inputDomSelectors;
        const payload = JSON.stringify({
            product: product.value,
            count: count.value,
            price: price.value
        });
        const httpHeaders = {
            method: 'PATCH',
            body: payload
        };

        fetch(`${BASE_URL}${updateId}`, httpHeaders)
            .then(() => {
                loadProductsHandler();
                otherDomSelectors.addBtn.removeAttribute('disabled');
                otherDomSelectors.updateBtn.setAttribute('disabled', true);
                otherDomSelectors.formContainer.reset();
            })
            .catch((err) => {
                console.error(err)
            });
    };
    
    function createElement(type, parentNode, content, id, className, attributes) {
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

solve();