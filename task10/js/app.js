let currentScale = "metric";
let currentPeriod = "1";

function getForecast () {
    const text = document.getElementById('search');
    history.pushState({}, 'city', text.value);
    getData(text.value);
}

async function getData(query) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=${currentScale}&cnt=${currentPeriod}&APPID=6d6fe420a0e525a75dacad47d8c7f5d6`)
        const data = await response.json();
        removeChilds();
        displayForecast(data);
    } catch (error) {
        console.log(error);
    }
}

function removeChilds () {
    const mainForecast = document.getElementById('mainForecast');
    while (mainForecast.firstChild) {
        mainForecast.removeChild(mainForecast.firstChild);
    }
}

function displayForecast (data) {
    const mainForecast = document.getElementById('mainForecast');

    data.list.forEach((day) => {
        const mainForecastItem = document.createElement('div');
        mainForecast.appendChild(mainForecastItem);
        mainForecastItem.id = 'mainForecastItem'
        
        const summary = generateSummary(day);
        mainForecastItem.appendChild(summary);

        const details = generateDetails(day);
        mainForecastItem.appendChild(details);
    });
}

function generateSummary (data) {
    const summary = document.createElement('div');
    summary.id  = 'summary';

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    summary.appendChild(weatherIcon);

    const avrTemperature = document.createElement('div');
    avrTemperature.innerText = Math.round(data.main.temp) + "°";
    summary.appendChild(avrTemperature);
    avrTemperature.id  = 'avrTemperature';

    const temperature = document.createElement('div');
    temperature.id  = 'temperature';
    summary.appendChild(temperature);  

    const minTemperature = document.createElement('div');
    const minTemperatureHeader = document.createElement('span');
    const minTemperatureData = document.createElement('span');
    minTemperatureHeader.innerText = "min: ";
    minTemperatureData.innerText = Math.round(data.main["temp_min"]) + "°";
    minTemperature.appendChild(minTemperatureHeader);
    minTemperature.appendChild(minTemperatureData);
    temperature.appendChild(minTemperature);

    const maxTemperature = document.createElement('div');
    const maxTemperatureHeader = document.createElement('span');
    const maxTemperatureData = document.createElement('span');
    maxTemperatureHeader.innerText = "max: ";
    maxTemperatureData.innerText = Math.round(data.main["temp_max"]) + "°";
    maxTemperature.appendChild(maxTemperatureHeader);
    maxTemperature.appendChild(maxTemperatureData);
    temperature.appendChild(maxTemperature);

    const description = document.createElement('h4');
    description.innerText = data.weather[0].description;
    summary.appendChild(description);
    description.id  = 'description';
    return summary;
}

function generateDetails (data) {
    const details = document.createElement('div');
    details.id  = 'details'; 
    
    const pressure = document.createElement('div');
    pressure.innerText = data.main.pressure + " Pa";
    details.appendChild(pressure);

    const humidity = document.createElement('div');
    humidity.innerText = data.main.humidity + "%";
    details.appendChild(humidity);
    
    const windSpeed = document.createElement('div');
    windSpeed.innerText = data.wind.speed + " m/s";
    details.appendChild(windSpeed);  

    return details;
}

function onKeyPress (event) {
    if (event.which == 13 || event.keyCode == 13) {
        getForecast();
        return false;
    }
    return true;
}

function toggleScale (scale) {
    currentScale = scale;
}

function togglePeriod () {
    currentPeriod = document.getElementById("forecastPeriod").value;
}