function attachEvents() {
  const BASE_URL = 'http://localhost:3030/jsonstore/collections/students';

  const tableContainer = document.querySelector('tbody');
  const submitBtn = document.getElementById('submit');
  const firstNameInput = document.querySelector('input[name="firstName"]');
  const lastNameInput = document.querySelector('input[name="lastName"]');
  const numberInput = document.querySelector('input[name="facultyNumber"]');
  const gradeInput = document.querySelector('input[name="grade"]');

  submitBtn.addEventListener('click', createStudentHandler);
  loadAllStudents();

  function loadAllStudents() {
    tableContainer.innerHTML = '';

    fetch(BASE_URL)
      .then((data) => data.json())
      .then((students) => {
        for (const student in students) {
          const currentTr = createHtmlElement('tr', '', tableContainer);
          createHtmlElement('td', students[student].firstName, currentTr);
          createHtmlElement('td', students[student].lastName, currentTr);
          createHtmlElement('td', students[student].facultyNumber, currentTr);
          createHtmlElement('td', students[student].grade, currentTr);
        };
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function createStudentHandler() {
    if (firstNameInput.value && lastNameInput.value && numberInput && gradeInput) {
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const facultyNumber = numberInput.value;
      const grade = gradeInput.value;

      const httpHeaders = {
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade }),
        method: 'POST'
      };

      fetch(BASE_URL, httpHeaders)
        .then(() => {
          firstNameInput.value = '';
          lastNameInput.value = '';
          numberInput.value = '';
          gradeInput.value = '';
          loadAllStudents()
        })
        .catch((err) => {
          console.error(err)
        });
    };
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