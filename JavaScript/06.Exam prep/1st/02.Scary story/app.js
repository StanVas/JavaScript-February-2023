window.addEventListener("load", solve);

function solve() {
  const inputDOMElements = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    title: document.getElementById('story-title'),
    genre: document.getElementById('genre'),
    storyText: document.getElementById('story'),
  };

  const otherDOMElements = {
    main: document.getElementById('main'),
    form: document.querySelector('.form-wrapper > form'),
    publishBtn: document.getElementById('form-btn'),
    previewContainer: document.getElementById('preview-list'),
  };

  let storyState = {
    firstName: null,
    lastName: null,
    age: null,
    title: null,
    genre: null,
    storyText: null,
  };

  otherDOMElements.publishBtn.addEventListener('click', publishHandler);

  function publishHandler() {
    if (checkAllInputs()) {
      otherDOMElements.publishBtn.setAttribute('disabled', true);
      const storyInfo = createDOMElement('li', null, otherDOMElements.previewContainer, null, 'story-info');
      const storyArticle = createDOMElement('article', null, storyInfo);
      createDOMElement('h4', `Name: ${inputDOMElements.firstName.value} ${inputDOMElements.lastName.value}`, storyArticle);
      createDOMElement('p', `Age: ${inputDOMElements.age.value}`, storyArticle);
      createDOMElement('p', `Title: ${inputDOMElements.title.value}`, storyArticle);
      createDOMElement('p', `Genre: ${inputDOMElements.genre.value}`, storyArticle);
      createDOMElement('p', inputDOMElements.storyText.value, storyArticle);
      const saveBtn = createDOMElement('button', 'Save Story', storyInfo, null, 'save-btn');
      const editBtn = createDOMElement('button', 'Edit Story', storyInfo, null, 'edit-btn');
      const deleteBtn = createDOMElement('button', 'Delete Story', storyInfo, null, 'delete-btn');

      for (const key in inputDOMElements) {
        storyState[key] = inputDOMElements[key].value;
      };

      clearAllInputs();

      deleteBtn.addEventListener('click', deleteHandler);
      saveBtn.addEventListener('click', saveHandler);
      editBtn.addEventListener('click', editHandler);
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

  function deleteHandler() {
    this.parentNode.remove();
    otherDOMElements.publishBtn.removeAttribute('disabled');
  };

  function saveHandler() {
    otherDOMElements.main.innerHTML = '';
    createDOMElement('h1', "Your scary story is saved!", otherDOMElements.main);
  };

  function editHandler() {
    this.parentNode.remove();
    otherDOMElements.publishBtn.removeAttribute('disabled')
    for (const key in inputDOMElements) {
      inputDOMElements[key].value = storyState[key];
    };
  };

  function createDOMElement(type, content, parentNode, id, className, attributes) {
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
