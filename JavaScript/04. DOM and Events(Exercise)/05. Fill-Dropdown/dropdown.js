function addItem() {
    const textInput = document.getElementById('newItemText');
    const valueInput = document.getElementById('newItemValue');
    const select = document.getElementById('menu');
    let newOption = document.createElement('option');
    newOption.value = valueInput.value;
    newOption.textContent = textInput.value;
    if (newOption.value.length > 0 && newOption.textContent.length > 0){
        select.appendChild(newOption)
        textInput.value = '';
        valueInput.value = '';
    };
};