function attachEvents() {
    const POST_URL = 'http://localhost:3030/jsonstore/blog/posts';
    const COMMENTS_URL = 'http://localhost:3030/jsonstore/blog/comments';

    const postSelector = document.getElementById('posts');
    const loadPostsBtn = document.getElementById('btnLoadPosts');
    const viewPostsBtn = document.getElementById('btnViewPost');

    loadPostsBtn.addEventListener('click', loadAllPosts);
    viewPostsBtn.addEventListener('click', viewHandler);

    const postObjects = {}

    async function loadAllPosts () {
        try {
            let response = await fetch(POST_URL);
            let data = await response.json();
            for (const key in data) {
                createHtmlElement('option', data[key].title, postSelector, '', {value: data[key].id});
            };
            Object.keys(data).forEach((key) => {
                postObjects[data[key].id] = {title: data[key].title, body: data[key].body};
            })
        } catch(error) {
            console.error(error);
        };
    };

    async function viewHandler() {
        try{
            let response = await fetch(COMMENTS_URL);
            let data = await response.json();
            const postTitle = document.getElementById('post-title');
            const postBody = document.getElementById('post-body');
            const selectedOption = postSelector.options[postSelector.selectedIndex];
            const selectedOptionId = selectedOption.value;
            const selectedOptionTitle = selectedOption.textContent;
            postTitle.textContent = selectedOptionTitle;
            postBody.textContent = postObjects[selectedOptionId].body;

            const postComments = document.getElementById('post-comments');
            postComments.innerHTML = '';

            for (const key in data) {
                if (selectedOptionId === data[key].postId){
                    createHtmlElement('li', data[key].text, postComments, '', {id: data[key].id});
                };
            };
        } catch(error) {
            console.error(error);
        };
    };

    function createHtmlElement( type, content, parentNode, classToAdd, attributes ) {
        const htmlElement = document.createElement(type);

        // if (content && !content.includes("#")) {
        //     htmlElement.textContent = content;
        //   }
    
        // if (content && content.includes('#')) {
        //     htmlElement.innerHTML = content;
        // };
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