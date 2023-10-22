function attachEvents() {
  const BASE_URL = 'http://localhost:3030/jsonstore/collections/books'

  const loadAllBooksBtn = document.getElementById('loadBooks');
  const tBody = document.querySelector('tbody');

  const titleInput = document.querySelector('input[name="title"]');
  const authorInput = document.querySelector('input[name="author"]');
  const submitBtn = document.querySelector('#form > button');

  const h3Form = document.querySelector('#form > h3');
  const btnForm = document.querySelector('#form > button');

  loadAllBooksBtn.addEventListener('click', loadAllBooksHandler);
  submitBtn.addEventListener('click', submitNewBook);

  function loadAllBooksHandler() {
    tBody.innerHTML = '';

    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        for (const key in data) {
          const currentTr = createHtmlElement('tr', '', tBody, '', { id: key });
          createHtmlElement('td', data[key].title, currentTr, '', { id: 'title' });
          createHtmlElement('td', data[key].author, currentTr, '', { id: 'author' });
          const currentTd = createHtmlElement('td', '', currentTr);
          const editBtn = createHtmlElement('button', 'Edit', currentTd);
          const deleteBtn = createHtmlElement('button', 'Delete', currentTd);
          deleteBtn.addEventListener('click', deleteHandler);
          editBtn.addEventListener('click', editHandler)
        };
      })
      .catch((err) => {
        console.error(err)
      });
  };

  function submitNewBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const httpHeaders = {
      body: JSON.stringify({ title, author }),
      method: 'POST',
    };

    fetch(BASE_URL, httpHeaders)
      .then(() => {
        loadAllBooksHandler();
        titleInput.value = '';
        authorInput.value = '';
      })
      .catch((err) => {
        console.error(err)
      });
  };

  function editHandler(event) {
    const id = this.parentNode.parentNode.id;
    const parent = this.parentNode.parentNode;
    const title = parent.childNodes[0].textContent;
    const author = parent.childNodes[1].textContent;

    h3Form.textContent = 'Edit Form';
    btnForm.textContent = 'Save';

    titleInput.value = title;
    authorInput.value = author;
    btnForm.addEventListener('click', saveHandler);
  };

  function saveHandler(event) {
    const id = this.parentNode
    console.log(id)
    console.log(id)
    console.log(id)
    const newTitle = titleInput.value;
    const newAuthor = authorInput.value;
    const httpHeaders = {
      body: JSON.stringify({ newTitle, newAuthor }),
      method: 'PUT'
    };

    fetch(`${BASE_URL}/${id}`, httpHeaders)
      .then(() => {
        // loadAllBooksHandler();
        h3Form.textContent = 'FORM';
        btnForm.textContent = 'Submit';
        titleInput.value = '';
        authorInput.value = '';
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function deleteHandler(event) {
    const id = this.parentNode.parentNode.id
    const httpHeaders = {
      method: 'DELETE'
    };
    fetch(`${BASE_URL}/${id}`, httpHeaders)
      .then(() => loadAllBooksHandler())
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