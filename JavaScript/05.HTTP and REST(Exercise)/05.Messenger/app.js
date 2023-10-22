function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/messenger';
    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    const authorInput = document.querySelector('input[name="author"]');
    const msgInput = document.querySelector('input[name="content"]');

    const textArea = document.getElementById('messages');

    sendBtn.addEventListener('click', sendHandler);
    refreshBtn.addEventListener('click', refreshHandler);

    async function sendHandler() {
        const author = authorInput.value;
        const content = msgInput.value;
        const httpHeaders = {
            method: 'POST',
            body: JSON.stringify({author, content})
        };
        const responseData = await fetch(BASE_URL, httpHeaders);
        authorInput.value = '';
        msgInput.value = '';
    };

    async function refreshHandler() {
        let response = await fetch(BASE_URL);
        let data = await response.json();
        let output = []
        for (const key in data) {
            // textArea.value = `${data[key].author}: ${data[key].content}`
            output.push(`${data[key].author}: ${data[key].content}`)
        };
        textArea.value = output.join('\n')
    };
}

attachEvents();