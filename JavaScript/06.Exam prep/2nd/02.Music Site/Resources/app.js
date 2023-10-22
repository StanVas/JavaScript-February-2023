window.addEventListener('load', solve);

function solve() {
    let totalLikes = 0;

    const inputDOMSelectors = {
        genre: document.getElementById('genre'),
        name: document.getElementById('name'),
        author: document.getElementById('author'),
        date: document.getElementById('date'),
    };

    const otherDOMSelectors = {
        addBtn: document.getElementById('add-btn'),
        allHitsContainer: document.querySelector('.all-hits-container'),
        savedContainer: document.querySelector('.saved-container'),
        likesContainer: document.querySelector('#total-likes > .likes > p')
    };

    otherDOMSelectors.addBtn.addEventListener('click', addSongHandler);


    function addSongHandler(event) {
        if (event){
            event.preventDefault();  
        };
        
        let checkAllInputs = Object.values(inputDOMSelectors)
            .every((input) => input.value !== '');

        if (checkAllInputs) {
            const {genre, name, author, date} = inputDOMSelectors;

            let songContainer = createElement('div', null, otherDOMSelectors.allHitsContainer, null, 'hits-info');
            createElement('img', null, songContainer, null, null, {src: "./static/img/img.png"});
            createElement('h2', `Genre: ${genre.value}`, songContainer);
            createElement('h2', `Name: ${name.value}`, songContainer);
            createElement('h2', `Author: ${author.value}`, songContainer);
            createElement('h3', `Date: ${date.value}`, songContainer);
            let saveBtn = createElement('button', 'Save song', songContainer, null, 'save-btn');
            let likeBtn = createElement('button', 'Like song', songContainer, null, 'like-btn');
            let deleteBtn = createElement('button', 'Delete', songContainer, null, 'delete-btn');

            clearAllInputs();
            
            saveBtn.addEventListener('click', saveSongHandler);
            likeBtn.addEventListener('click', likeSongHandler);
            deleteBtn.addEventListener('click', deleteSongHandler);
        };
    };

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            });
    };

    function saveSongHandler() {
        otherDOMSelectors.savedContainer.appendChild(this.parentNode);
        const saveBtn = this.parentNode.querySelector('.save-btn');
        const likeBtn = this.parentNode.querySelector('.like-btn');
        saveBtn.remove();
        likeBtn.remove();
    };

    function likeSongHandler(event) {
        this.setAttribute('disabled', true);
        totalLikes ++;
        otherDOMSelectors.likesContainer.textContent = `Total Likes: ${totalLikes}`;
    };

    function deleteSongHandler() {
        this.parentNode.remove();
    };


    function createElement( type, content, parentNode, id, className, attributes ) {
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