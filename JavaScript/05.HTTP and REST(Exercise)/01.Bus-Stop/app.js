function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const stopNameContainer = document.getElementById('stopName');
    const busesContainer = document.getElementById('buses');
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/businfo/';
    const stopId = stopIdInput.value;

    busesContainer.innerHTML = '';
    fetch(`${BASE_URL}${stopId}`)
        .then((response) => response.json())
        .then((busInfo) => {
            const {name, buses} = busInfo;
            stopNameContainer.textContent = name
            for (const busNum in buses) {
                let newLi = document.createElement('li');
                newLi.textContent = `Bus ${busNum} arrives in ${buses[busNum]} minutes`;
                busesContainer.appendChild(newLi);
            } 
        })
        .catch((err) => {
            stopNameContainer.textContent = 'Error';
        });
}