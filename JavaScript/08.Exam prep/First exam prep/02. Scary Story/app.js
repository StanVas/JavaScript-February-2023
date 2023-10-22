window.addEventListener("load", solve);

function solve() {
  const inputDOMElements = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    title: document.getElementById('story-title'),
    genre: document.getElementById('genre'),
    story: document.getElementById('story'),
  };

  const otherDOMElements = {
    publishBtn: document.getElementById('form-btn'),
    previewSection: document.getElementById('preview-list'),
    mainSection: document.getElementById('main')
  };

  otherDOMElements.publishBtn.addEventListener('click', createStoryHandler);

  let storyCopy = {
    firstName: null,
    lastName: null,
    age: null,
    title: null,
    genre: null,
    story: null,
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

  function createStoryHandler() {
    if (checkAllInputs()) {
      const storyInfo = createDOMElement('li', otherDOMElements.previewSection, null, null, ['story-info']);
      const storyContainer = createDOMElement('article', storyInfo);
      createDOMElement('h4', storyContainer, `Name: ${inputDOMElements.firstName.value} ${inputDOMElements.lastName.value}`);
      createDOMElement('p', storyContainer, `Age: ${inputDOMElements.age.value}`);
      createDOMElement('p', storyContainer, `Title: ${inputDOMElements.title.value}`);
      createDOMElement('p', storyContainer, `Genre: ${inputDOMElements.genre.value}`);
      createDOMElement('p', storyContainer, inputDOMElements.story.value);
      const saveBtn = createDOMElement('button', storyInfo, 'Save Story', null, ['save-btn']);
      const editBtn = createDOMElement('button', storyInfo, 'Edit Story', null, ['edit-btn']);
      const deleteBtn = createDOMElement('button', storyInfo, 'Delete Story', null, ['delete-btn']);
      
      otherDOMElements.publishBtn.setAttribute('disabled', true);

      for (const key in inputDOMElements) {
        storyCopy[key] = inputDOMElements[key].value;
      };

      saveBtn.addEventListener('click', saveStoryHandler);
      editBtn.addEventListener('click', editStoryHandler);
      deleteBtn.addEventListener('click', deleteStoryHandler);

      clearAllInputs();
    };
  };

  function editStoryHandler() {
    for (const key in inputDOMElements) {
      inputDOMElements[key].value = storyCopy[key];
    };

    otherDOMElements.publishBtn.removeAttribute('disabled');
    const currentStory = document.querySelector('#preview-list > li');
    currentStory.remove();
  };

  function deleteStoryHandler() {
    otherDOMElements.publishBtn.removeAttribute('disabled');
    const currentStory = document.querySelector('#preview-list > li');
    currentStory.remove();
  };

  function saveStoryHandler() {
    otherDOMElements.mainSection.innerHTML = '';
    createDOMElement('h1', otherDOMElements.mainSection, 'Your scary story is saved');
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

    // if (className) {
    //     htmlElement.classList.add(className);
    // };

    // ['list', 'item'] => Arr
    if (classes && classes.length > 0) {
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
