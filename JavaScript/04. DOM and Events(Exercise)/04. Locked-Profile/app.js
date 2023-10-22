function lockedProfile() {
    const buttons = Array.from(document.getElementsByTagName('button'));
    buttons
        .forEach ((button) => {
            button.addEventListener('click', toggleInformation);
        });
    // use forEach instead of for of
    // for (const btn of buttons) {
    //     btn.addEventListener('click', btnTrigger); 
    // };

    function toggleInformation(event) {
        const currentBnt = event.currentTarget;
        const currentParent = this.parentElement;
        const children = Array.from(currentParent.children);
        const additionalContent = children[9];
        const unlockRadioInput = children[4];

        if (unlockRadioInput.checked) {
            if (this.textContent === 'Show more') {
                additionalContent.style.display = 'block';
                currentBnt.textContent = 'Hide it';
            } else {
                additionalContent.style.display = 'none';
                currentBnt.textContent = 'Show more';
            };
        };
    };
}
