function attachEvents() {
    const BASE_URL = 'http://localhost:3030/jsonstore/forecaster/locations';
    const inputValue = document.getElementById('location');
    const inputBtn = document.getElementById('submit');
    inputBtn.addEventListener('click', weatherHandler)
    const divWrapper = document.getElementById('forecast');
    const weatherSymbols = {
        Sunny: '&#x2600',
        'Partly sunny': '&#x26C5',
        Overcast: '&#x2601',
        Rain: '&#x2614',
        Degrees: '&#176'
    };

    async function weatherHandler() {
        // const divWrapper = document.getElementById('forecast');
        // divWrapper.style.display = 'block'
        const response = await fetch(BASE_URL);
        const data = await response.json();
        const currentLocation = inputValue.value;
        let getCityInfo = data.find((x) => x.name === currentLocation);
        let cityCode = getCityInfo.code;

        if (!getCityInfo) {
            throw new Error();
        };

        divWrapper.style.display = 'block'
        
        // current conditions
        const currentDiv = document.getElementById('current');
        const CURRENT_URL = 'http://localhost:3030/jsonstore/forecaster/today/';
        const currentRes = await fetch(`${CURRENT_URL}${cityCode}`);
        const currentData = await currentRes.json();
        const currentCondition = currentData.forecast.condition;

        let forecastDiv = createElement('div', '', currentDiv, 'forecasts');
        createElement('span', weatherSymbols[currentCondition], forecastDiv, 'condition symbol');
        let conditionSpan = createElement('span', '', forecastDiv, 'condition');
        createElement('span', currentData.name, conditionSpan, 'forecast-data');
        createElement('span', `${currentData.forecast.low}&#176/${currentData.forecast.high}&#176`, conditionSpan, 'forecast-data');
        createElement('span', currentData.forecast.condition, conditionSpan, 'forecast-data');

        // three-day forecast
        const upcomingDiv = document.getElementById('upcoming');
        const UPCOMING_URL = 'http://localhost:3030/jsonstore/forecaster/upcoming/';
        const upcomingRes = await fetch(`${UPCOMING_URL}${cityCode}`);
        const upcomingData = await upcomingRes.json();
        const upcomingForecast = Array.from(upcomingData.forecast);
        let forecastInfoDiv = createElement('div', '', upcomingDiv, 'forecast-info');
        for (const day of upcomingForecast) {
            let upcomingSpan = createElement('span', '', forecastInfoDiv, 'upcoming');
            createElement('span', weatherSymbols[day.condition], upcomingSpan, 'symbol');
            createElement('span', `${day.low}&#176/${day.high}&#176`, upcomingSpan, 'forecast-data');
            createElement('span', day.condition, upcomingSpan, 'forecast-data');
        };
    };
    
    function createElement( type, content, parentNode, classToAdd, attributes ) {
        const htmlElement = document.createElement(type);

        if (content && !content.includes("#")) {
            htmlElement.textContent = content;
          }
    
        if (content && content.includes('#')) {
            htmlElement.innerHTML = content;
        };
    
        if (parentNode) {
            parentNode.appendChild(htmlElement);
        };
    
        // ['list', 'item'] => Arr
        if (classToAdd) {
            htmlElement.className = classToAdd;
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

attachEvents();
