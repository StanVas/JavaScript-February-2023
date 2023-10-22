function addItem() {
    const ulContainer = document.getElementById('items');
    const input = document.getElementById('newItemText');
    
    let newLi = document.createElement('li');
    let newAnchor = document.createElement('a');

    newLi.textContent = input.value;
    newAnchor.textContent = '[Delete]';
    newAnchor.href = '#' //same as newAnchor.setAttribute('href', '#')
    newAnchor.addEventListener('click', deleteHandler);

    newLi.appendChild(newAnchor);
    ulContainer.appendChild(newLi);
    input.value = '';

    function deleteHandler(e) {
        const liItem = e.currentTarget.parentElement;
        liItem.remove();
    };
    // using this
    // function deleteHandler() {
    //     const liItem = this.parentElement;
    //     liItem.remove();
    // };
}