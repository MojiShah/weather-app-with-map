let backgroundPictures = [
    './images/first.jpeg',
    './images/Second.jpeg',
    './images/third.jpeg',
    './images/fourth.jpeg',
    './images/sky.jpg',
    './images/cloudy.jpeg',
    './images/rain.jpg',
    './images/RainOnUmbrella.jpeg',
    './images/snowyBridge.jpg',
    './images/snowyCity.jpg',
    './images/storm.jpeg',
    './images/thunder.jpg',
    './images/Desert.jpg',
    './images/storm-sized.jpg',
    './images/Sunny.jpeg',
    './images/sunshine-hours.jpg',
    './images/rainy.jpg',
];

let formElem = document.getElementById('form');
let inputElem = document.getElementById('search');
let containerElem = document.querySelector('.container');

const apiKey = '02b2aab8fda377eadc01329d628d1400';

const getWeatherByLocation = location => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            addWeatherInfoToPage(data)
        });
}



setInterval(() => {
    let randomIndex = Math.floor(Math.random() * backgroundPictures.length);
    document.body.style.backgroundImage = 'url(' + backgroundPictures[randomIndex] + ')';
}, 60000)

formElem.addEventListener('submit', e => {
    e.preventDefault();
    const location = inputElem.value;
    if (location) {
        inputElem.value='';
        getWeatherByLocation(location);
    }
})

const addWeatherInfoToPage = data => {
    const temperature = kelvin2Celcious(data.main.temp);
    const feelsTemp = kelvin2Celcious(data.main.feels_like);
    const maxTemp = kelvin2Celcious(data.main.temp_max);
    const minTemp = kelvin2Celcious(data.main.temp_min);

    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML=`
        <div class='temp'>
            <p style="background-color: red;">شهر : ${data.name}</p>
            <p>دما : ${temperature}C</p>
            <p>دمای احساس‌شده : ${feelsTemp}C</p>
            <p>حداکثر دما  : ${maxTemp}C</p>
            <p>حداقل دما  : ${minTemp}C</p>
            <p>سرعت باد  : ${data.wind.speed}m/s</p>
            <p> میزان رطوبت  : ${data.main.humidity}%</p>
        </div>
        <hr style="background-color: #fff;" />
    `
    
    containerElem.innerHTML='';
    containerElem.appendChild(weather);

    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: [data.coord.lon, data.coord.lat], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

}

const kelvin2Celcious = temp => parseInt(temp - 273.15);