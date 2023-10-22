window.addEventListener('load', solve);

function solve() {

    const inputDOMElements = {
        product: document.getElementById('type-product'),
        description: document.getElementById('description'),
        clientName: document.getElementById('client-name'),
        clientPhone: document.getElementById('client-phone'),
    };

    const otherDOMElements = {
        sendBtn: document.querySelector('form > button'),
        clearBtn: document.querySelector('.clear-btn'),
        receivedOrdersSection: document.getElementById('received-orders'),
        completedOrdersSection: document.getElementById('completed-orders'),
    };

    otherDOMElements.sendBtn.addEventListener('click', sendFormHandler);
    otherDOMElements.clearBtn.addEventListener('click', clearOrdersHandler);
    
    function sendFormHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            const container = createDOMElement('div', otherDOMElements.receivedOrdersSection, null, null, ['container']);
            createDOMElement(
                'h2', container, `Product type for repair: ${inputDOMElements.product.value}`
                );
            createDOMElement(
                'h3', container, `Client information: ${inputDOMElements.clientName.value}, ${inputDOMElements.clientPhone.value}`
                );
            createDOMElement(
                'h4', container, `Description of the problem: ${inputDOMElements.description.value}`
                );
            const startBtn = createDOMElement('button', container, 'Start repair', null, ['start-btn']);
            const finishBtn = createDOMElement('button', container, 'Finish repair', null, ['finish-btn']);

            finishBtn.setAttribute('disabled', true);

            startBtn.addEventListener('click', startRepairingHandler);

            clearAllInputs();
        };
    };


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

    function startRepairingHandler() {
        const parent = this.parentNode;
        const [_product, _client, _description, start, finish] = Array.from(parent.children);
        start.setAttribute('disabled', true);
        finish.removeAttribute('disabled');
        finish.addEventListener('click', finishOrderHandler);
    };
 
    function finishOrderHandler() {
        const parent = this.parentNode;
        const [_product, _client, _description, start, finish] = Array.from(parent.children);
        start.remove();
        finish.remove();
        otherDOMElements.completedOrdersSection.appendChild(parent);
    };

    function clearOrdersHandler() {
        const completedContainer = otherDOMElements.completedOrdersSection;
        completedContainer.innerHTML = '';
        createDOMElement('h2', completedContainer, 'Completed orders:');
        createDOMElement('img', completedContainer, null, null, null, {src: './style/img/completed-order.png'});
        createDOMElement('button', completedContainer, 'Clear', null, ['clear-btn']);
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

        // for single class
        // if (className) {
        //   htmlElement.classList.add(className);
        // };

        // ['list', 'item'] => Arr
        if (classes) {
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