function solve() {
    const BASE_URL = 'http://localhost:3030/jsonstore/bus/schedule/';
    const departBnt = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const busInfoContainer = document.querySelector(`#info > span`);
    let nextStopId = "depot";
    let stopName = null;

    function depart() {
        arriveBtn.disabled = false;
        departBnt.disabled = true;
        fetch(`${BASE_URL}${nextStopId}`)
            .then((res) => res.json())
            .then((busData) => {
                const { name, next } = busData;
                nextStopId = next;
                stopName = name;
                busInfoContainer.textContent = `Next stop ${stopName}`;
            })
            .catch((err) => {
                console.log(err)
            });
    };

    async function arrive() {
        arriveBtn.disabled = true;
        departBnt.disabled = false;
        busInfoContainer.textContent = `Arriving at ${stopName}`;
    };

    return {
        depart,
        arrive
    };
}

let result = solve();