function addItem() {
    const input = document.getElementById('newItemText');
    const ulContainer = document.getElementById('items');
    
    let newLi = document.createElement('li');
    newLi.textContent = input.value;

    ulContainer.appendChild(newLi);
    input.value = '';
}