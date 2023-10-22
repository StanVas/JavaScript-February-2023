function toggle() {
    const btn = document.getElementsByClassName('button')[0];
    const extraText = document.getElementById('extra');

    if (btn.textContent === 'More') {
        extraText.style.display = 'block';
        btn.textContent = 'Less'; 
    } else if (btn.textContent === 'Less') {
        extraText.style.display = 'none'; 
        btn.textContent = 'More';
    };
}