window.addEventListener("load", solve);

function solve() {
  const inputDOMElements = {
    brand: document.getElementById('make'),
    model: document.getElementById('model'),
    year: document.getElementById('year'),
    fuel: document.getElementById('fuel'),
    originalCost: document.getElementById('original-cost'),
    sellingPrice: document.getElementById('selling-price'),
  };

  const otherDOMElements = {
    publishBtn: document.getElementById('publish'),
    form: document.querySelector('.form-wrapper > form'),
    tableContainer: document.getElementById('table-body'),
    soldCarsContainer: document.getElementById('cars-list'),
    profitContainer: document.getElementById('profit'),
  };

  let currentProfit = 0;

  otherDOMElements.publishBtn.addEventListener('click', publishCarHandler);

  let currentCarInput = {
    brand: null,
    model: null,
    year: null,
    fuel: null,
    originalCost: null,
    sellingPrice: null,
  };

  function checkAllInputs() {
    let inputs = Object.values(inputDOMElements)
      .every((input) => input.value !== '');
    return inputs;
  };

  function publishCarHandler(event) {
    if (event) {
      event.preventDefault();
    };

    if (checkAllInputs() && inputDOMElements.sellingPrice.value > inputDOMElements.originalCost.value) {
      for (const key in inputDOMElements) {
        currentCarInput[key] = inputDOMElements[key].value;
      };

      const carContainer = createDOMElement('tr', otherDOMElements.tableContainer, null, null, ['row']);
      createDOMElement('td', carContainer, inputDOMElements.brand.value);
      createDOMElement('td', carContainer, inputDOMElements.model.value);
      createDOMElement('td', carContainer, inputDOMElements.year.value);
      createDOMElement('td', carContainer, inputDOMElements.fuel.value);
      createDOMElement('td', carContainer, inputDOMElements.originalCost.value);
      createDOMElement('td', carContainer, inputDOMElements.sellingPrice.value);
      const btnContainer = createDOMElement('td', carContainer);
      const editBtn = createDOMElement('button', btnContainer, 'Edit', null, ['action-btn', 'edit']);
      const sellBtn = createDOMElement('button', btnContainer, 'Sell', null, ['action-btn', 'sell']);

      editBtn.addEventListener('click', editCarHandler);
      sellBtn.addEventListener('click', sellCarHandler);

      Object.values(inputDOMElements)
        .forEach((input) => {
          input.value = '';
        });
      // otherDOMElements.form.reset();
    };
  };

  function editCarHandler() {
    for (const key in inputDOMElements) {
      inputDOMElements[key].value = currentCarInput[key];
    };

    const currentCarContainer = this.parentNode.parentNode.parentNode;
    currentCarContainer.innerHTML = '';
  };

  function sellCarHandler() {
    const currentCarContainer = this.parentNode.parentNode.parentNode;
    
    const soldCarContainer = createDOMElement('li', otherDOMElements.soldCarsContainer, null, null, ['each-list']);
    // createDOMElement('span', soldCarContainer, `${currentCarInput.brand} ${currentCarInput.model}`);
    createDOMElement('span', soldCarContainer, currentCarInput.brand + ' ' + currentCarInput.model);
    createDOMElement('span', soldCarContainer, currentCarInput.year);
    let difference = Number(currentCarInput.sellingPrice) - Number(currentCarInput.originalCost);
    createDOMElement('span', soldCarContainer, difference);
    currentProfit = Number(currentProfit) + Number(difference);
    otherDOMElements.profitContainer.textContent = currentProfit.toFixed(2);

    currentCarContainer.innerHTML = '';
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

    // if (className) {
    //   htmlElement.classList.add(className);
    // };

    // {src: 'link to image', href: 'link to site', type: 'checkbox' ...} => Obj
    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key]);
      };
    };

    return htmlElement;
  };
}
