window.addEventListener('load', solve);

function solve() {
    const inputDOMElements = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
    };

    const otherDOMElements = {
        addBtn: document.getElementById('add-btn'),
        songsContainer: document.querySelector('.all-hits-container'),
        savedContainer: document.querySelector('.saved-container'),
        totalLikes: document.querySelector('.likes > p')
    };

    otherDOMElements.addBtn.addEventListener('click', addSongHandler);

    let likesCounter = 0;

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

    function addSongHandler(event) {
        if (event) {
            event.preventDefault();
        };
        
        if (checkAllInputs()) {
            const songInfo = createDOMElement('div', otherDOMElements.songsContainer, null, null, ['hits-info']);
            createDOMElement('img', songInfo, null, null, null, {src: './static/img/img.png'});
            createDOMElement('h2', songInfo, `Genre: ${inputDOMElements.genre.value}`);
            createDOMElement('h2', songInfo, `Name: ${inputDOMElements.name.value}`);
            createDOMElement('h2', songInfo, `Author: ${inputDOMElements.author.value}`);
            createDOMElement('h3', songInfo, `Date: ${inputDOMElements.date.value}`);
            saveBtn = createDOMElement('button', songInfo, 'Save song', null, ['save-btn'])
            likeBtn = createDOMElement('button', songInfo, 'Like song', null, ['like-btn'])
            delBtn = createDOMElement('button', songInfo, 'Delete', null, ['delete-btn'])

            saveBtn.addEventListener('click', saveSongHandler);
            likeBtn.addEventListener('click', likeSongHandler);
            delBtn.addEventListener('click', delSongHandler);

            clearAllInputs();
        };
    };

    function saveSongHandler() {
        let currentSong = this.parentNode;
        const [_i, _g, _n, _a, _d, save, like, _del] = Array.from(currentSong.children);
        save.remove();
        like.remove();
        otherDOMElements.savedContainer.appendChild(currentSong);
    };

    function likeSongHandler() {
        likesCounter ++;
        otherDOMElements.totalLikes.textContent = `Total Likes: ${likesCounter}`;
        this.setAttribute('disabled', true);
    };

    function delSongHandler() {
        const parent = this.parentNode;
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