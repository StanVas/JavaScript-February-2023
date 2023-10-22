window.addEventListener("load", solve);

function solve() {
  const inputDOMElements = {
    firstName: document.getElementById('first-name'),
    lastName: document.getElementById('last-name'),
    age: document.getElementById('age'),
    gender: document.getElementById('genderSelect'),
    dishInfo: document.getElementById('task'),
  };

  const otherDOMElements = {
    submitBtn: document.getElementById('form-btn'),
    inProgressContainer: document.getElementById('in-progress'),
    inProgressCounter: document.getElementById('progress-count'),
    finishedContainer: document.getElementById('finished'),
    clearBtn: document.getElementById('clear-btn'),
  };

  otherDOMElements.clearBtn.addEventListener('click', clearAllPostHandler);

  let counter = 0;

  let formStateCopy = {
    firstName: null,
    lastName: null,
    age: null,
    gender: null,
    dishInfo: null,
  };

  otherDOMElements.submitBtn.addEventListener('click', submitDishHandler);

  function checkAllInputs() {
    let checkInputs = Object.values(inputDOMElements)
      .every((input) => input.value !== '');
    return checkInputs;
  };

  function clearAllInputs() {
    Object.values(inputDOMElements)
      .forEach((input) => {
        input.value = '';
      });
  };

  function submitDishHandler() {
    if (checkAllInputs()) {
      const dishContainer = createDOMElement('li', null, otherDOMElements.inProgressContainer, null, 'each-line');
      const dishArticle = createDOMElement('article', null, dishContainer);
      createDOMElement('h4', `${inputDOMElements.firstName.value} ${inputDOMElements.lastName.value}`, dishArticle);
      createDOMElement('p', `${inputDOMElements.gender.value}, ${inputDOMElements.age.value}`, dishArticle);
      createDOMElement('p', `Dish description: ${inputDOMElements.dishInfo.value}`, dishArticle);
      const editBtn = createDOMElement('button', 'Edit', dishContainer, null, 'edit-btn');
      const completeBtn = createDOMElement('button', 'Mark as complete', dishContainer, null, 'complete-btn');

      editBtn.addEventListener('click', editDishHandler);
      completeBtn.addEventListener('click', completeDishHandler);

      counter ++;
      otherDOMElements.inProgressCounter.textContent = counter;

      for (const key in inputDOMElements) {
        formStateCopy[key] = inputDOMElements[key].value;
      };

      clearAllInputs();
    };    
  };

  function editDishHandler() {
    for (const key in inputDOMElements) {
      inputDOMElements[key].value = formStateCopy[key];
    };

    this.parentNode.remove();

    counter --;
    otherDOMElements.inProgressCounter.textContent = counter;
  };

  function completeDishHandler() {
    otherDOMElements.finishedContainer.appendChild(this.parentNode);

    const editBtnToRemove = this.parentNode.querySelector('.edit-btn');
    editBtnToRemove.remove();
    const completeBtnToRemove = this.parentNode.querySelector('.complete-btn');
    completeBtnToRemove.remove();

    counter --;
    otherDOMElements.inProgressCounter.textContent = counter;
  };

  function clearAllPostHandler() {
    otherDOMElements.finishedContainer.innerHTML = '';
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
