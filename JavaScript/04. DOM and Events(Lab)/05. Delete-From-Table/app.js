function deleteByEmail() {
    const input = document.querySelector("input[name='email']");
    const evenTds = Array.from(document.querySelectorAll('td:nth-child(even)'));
    const resultDiv = document.getElementById('result')
    let emailValue = input.value;

    // this will return the first td that matches emailValue
    let foundElement = evenTds.find((td) => td.textContent === emailValue);

    if (foundElement){
        foundElement.parentElement.remove()
        resultDiv.textContent = 'Deleted.';
    } else {
        resultDiv.textContent = 'Not found.';
    };
}