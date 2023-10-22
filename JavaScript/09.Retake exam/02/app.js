window.addEventListener("load", solve);

function solve() {
    const inputDOMElements = {
        title: document.getElementById('task-title'),
        category: document.getElementById('task-category'),
        content: document.getElementById('task-content'),
    };

    const otherDOMElements = {
        publishBtn: document.getElementById('publish-btn'),
        reviewContainer: document.getElementById('review-list'),
        publishedContainer: document.getElementById('published-list'),
    };

    otherDOMElements.publishBtn.addEventListener('click', publishHandler);

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

    function publishHandler() {
        if (checkAllInputs()) {
            const taskContainer = createDOMElement('li', otherDOMElements.reviewContainer, null, null, ['rpost']);
            const taskInfo = createDOMElement('article', taskContainer);
            createDOMElement('h4', taskInfo, inputDOMElements.title.value);
            createDOMElement('p', taskInfo, `Category: ${inputDOMElements.category.value}`);
            createDOMElement('p', taskInfo, `Content: ${inputDOMElements.content.value}`);
            const editBtn = createDOMElement('button', taskContainer, 'Edit', null, ['action-btn', 'edit']);
            const postBtn = createDOMElement('button', taskContainer, 'Post', null, ['action-btn', 'post']);

            editBtn.addEventListener('click', editHandler);
            postBtn.addEventListener('click', postHandler);

            clearAllInputs();
        };
    };

    function editHandler() {
        const parent = this.parentNode;
        let taskInfo = parent.querySelector('.rpost > article')
        let [thisTitle, thisCategory, thisContent] = Array.from(taskInfo.children);

        thisCategory = thisCategory.textContent;
        thisCategory = thisCategory.split(': ');

        thisContent = thisContent.textContent;
        thisContent = thisContent.split(': ');
        
        inputDOMElements.title.value = thisTitle.textContent;
        inputDOMElements.category.value = thisCategory[1];
        inputDOMElements.content.value = thisContent[1];

        parent.remove();
    };

    function postHandler() {
        const parent = this.parentNode;
        let taskInfo = parent.querySelector('.rpost > article');

        const newContainer = createDOMElement('li', otherDOMElements.reviewContainer, null, null, ['rpost']);
        newContainer.appendChild(taskInfo);
        otherDOMElements.publishedContainer.appendChild(newContainer);

        parent.remove();
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