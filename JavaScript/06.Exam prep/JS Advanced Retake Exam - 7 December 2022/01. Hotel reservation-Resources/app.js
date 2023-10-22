window.addEventListener('load', solve);

function solve() {
    const inputDOMSelectors = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        dateIn: document.getElementById('date-in'),
        dateOut: document.getElementById('date-out'),
        peopleCount: document.getElementById('people-count'),
    };

    const otherDOMSelectors = {
        form: document.querySelector('.container-text > form'),
        nextBtn: document.getElementById('next-btn'),
        listContainer: document.querySelector('.info-list'),
        confirmContainer: document.querySelector('.confirm-list'),
        verificationContainer: document.getElementById('verification'),
    };

    let reservationState = {
        firstName: null,
        lastName: null,
        dateIn: null,
        dateOut: null,
        peopleCount: null,
    };

    otherDOMSelectors.nextBtn.addEventListener('click', nextStepHandler);

    function checkAllInputs() {
        let checkAll = Object.values(inputDOMSelectors)
            .every((input) => input.value !== '');
        return checkAll;
    };

    function clearAllInputs() {
        Object.values(inputDOMSelectors)
            .forEach((input) => {
                input.value = '';
            });
        // otherDOMSelectors.form.reset();
    };

    function nextStepHandler(event) {
        if (event) {
            event.preventDefault();
        };

        if (checkAllInputs()) {
            let checkDateIn = inputDOMSelectors.dateIn.value.split('-')
            let checkDateOut = inputDOMSelectors.dateOut.value.split('-')
            let checkYear = Number(checkDateOut[0]) - Number(checkDateIn[0])
            let checkMonth = Number(checkDateOut[1]) - Number(checkDateIn[1])
            let checkDay = Number(checkDateOut[2]) - Number(checkDateIn[2])
            
            if (checkYear < 0 ) {
                return;
            } else if (checkYear === 0 && checkMonth < 0) {
                return;
            } else if (checkMonth === 0 && checkDay < 0) {
                return;
            } else {
                for (const key in inputDOMSelectors) {  // make copy of all inputs
                    reservationState[key] = inputDOMSelectors[key].value;
                };

                const reservationContainer = createDOMElement('li', null, otherDOMSelectors.listContainer, null, 'reservation-content');
                const reservationArticle = createDOMElement('article', null, reservationContainer);
                createDOMElement('h3', `Name: ${inputDOMSelectors.firstName.value} ${inputDOMSelectors.lastName.value}`, reservationArticle);
                createDOMElement('p', `From date: ${inputDOMSelectors.dateIn.value}`, reservationArticle);
                createDOMElement('p', `To date: ${inputDOMSelectors.dateOut.value}`, reservationArticle);
                createDOMElement('p', `For ${inputDOMSelectors.peopleCount.value} people`, reservationArticle);
                const editBtn = createDOMElement('button', 'Edit', reservationContainer, null, 'edit-btn');
                const continueBtn = createDOMElement('button', 'Continue', reservationContainer, null, 'continue-btn');
                
                clearAllInputs();
                otherDOMSelectors.nextBtn.setAttribute('disabled', true);
                editBtn.addEventListener('click', editReservationHandler);
                continueBtn.addEventListener('click', continueReservationHandler);
            };
        };
    };

    function editReservationHandler() {
        for (const key in inputDOMSelectors) {  // return the data into the form
            inputDOMSelectors[key].value = reservationState[key];
        };
        
        otherDOMSelectors.listContainer.innerHTML = '';
        otherDOMSelectors.nextBtn.removeAttribute('disabled');
    };

    function continueReservationHandler() {
        otherDOMSelectors.confirmContainer.appendChild(otherDOMSelectors.listContainer.children[0]);
        const confirmBtn = document.querySelector('.edit-btn');
        confirmBtn.textContent = 'Confirm';
        confirmBtn.className = 'confirm-btn';
        const cancelBtn = document.querySelector('.continue-btn');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.className = 'cancel-btn';

        confirmBtn.removeEventListener('click', editReservationHandler, false)
        cancelBtn.removeEventListener('click', continueReservationHandler, false)

        confirmBtn.addEventListener('click', confirmReservationHandler);
        cancelBtn.addEventListener('click', cancelReservationHandler);
    };

    function confirmReservationHandler() {
        otherDOMSelectors.confirmContainer.innerHTML = '';
        otherDOMSelectors.nextBtn.removeAttribute('disabled');
        otherDOMSelectors.verificationContainer.textContent = 'Confirmed.';
        otherDOMSelectors.verificationContainer.className = 'reservation-confirmed';
    };

    function cancelReservationHandler() {
        otherDOMSelectors.confirmContainer.innerHTML = '';
        otherDOMSelectors.nextBtn.removeAttribute('disabled');
        otherDOMSelectors.verificationContainer.textContent = 'Cancelled.';
        otherDOMSelectors.verificationContainer.className = 'reservation-cancelled';
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
