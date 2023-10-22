function solve() {
  const [generateTextArea, buyTextArea] = Array.from(document.getElementsByTagName('textarea'));
  const [generateBtn, buyBtn] = Array.from(document.getElementsByTagName('button'));
  const tbody = document.querySelector('.table > tbody');

  generateBtn.addEventListener('click', generateHandler);
  buyBtn.addEventListener('click', buyHandler);

  function generateHandler() {
    const data = JSON.parse(generateTextArea.value);

    for (const { img, price, name, decFactor } of data) {
      const tableRow = createElement('tr', '', tbody);

      const firstColumnTd = createElement('td', '', tableRow);
      createElement('img', '', firstColumnTd, '', '', { src: img });

      const SecondColumnTd = createElement('td', '', tableRow);
      createElement('p', name, SecondColumnTd);

      const ThirdColumnTd = createElement('td', '', tableRow);
      createElement('p', price, ThirdColumnTd);

      const ForthColumnTd = createElement('td', '', tableRow);
      createElement('p', decFactor, ForthColumnTd);

      const FifthColumnTd = createElement('td', '', tableRow);
      createElement('input', '', FifthColumnTd, '', '', { type: 'checkbox' });
    };
  };

  function buyHandler() {
    const allCheckedInputs = Array.from(document.querySelectorAll('tbody tr input:checked'));
    let allProducts = [];
    let totalCost = 0;
    let totalDecFactor = 0;

    for (const input of allCheckedInputs) {
      const tableRow = input.parentElement.parentElement;
      const [_firstCol, secCol, thirdCol, forthCol] = Array.from(tableRow.children);

      let product = secCol.children[0].textContent;
      allProducts.push(product);

      let price = thirdCol.children[0].textContent;
      totalCost += Number(price);

      let decFactor = forthCol.children[0].textContent;
      totalDecFactor += Number(decFactor)
    };

    buyTextArea.value += `Bought furniture: ${allProducts.join(', ')}\n`;
    buyTextArea.value += `Total price: ${totalCost.toFixed(2)}\n`;
    buyTextArea.value += `Average decoration factor: ${totalDecFactor / allProducts.length}`
  };

  function createElement(type, content, parentNode, id, classes, attributes) {
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

    // ['list', 'item'] => Arr
    if (classes) {
      htmlElement.classList.add(...classes);
    };

    // {src: 'link to image', href: 'link to site', ...} => Obj
    if (attributes) {
      for (const key in attributes) {
        htmlElement.setAttribute(key, attributes[key]);
      };
    };

    return htmlElement;
  };

}

// function createElement(type, content, parentNode, id, classes, attributes) {
//   const htmlElement = document.createElement(type);

//   if (content && type !== 'input') {
//     htmlElement.textContent = content;
//   };

//   if (content && type === 'input') {
//     htmlElement.value = content;
//   };

//   if (parentNode) {
//     parentNode.appendChild(htmlElement);
//   };

//   if (id) {
//     htmlElement.id = id;
//   };

//   // ['list', 'item'] => Arr
//   if (classes) {
//     htmlElement.classList.add(...classes);
//   };

//   // {src: 'link to image', href: 'link to site', ...} => Obj
//   if (attributes) {
//     for (const key in attributes) {
//       htmlElement.setAttribute(key, attributes[key]);
//     };
//   };

//   return htmlElement;
// }
