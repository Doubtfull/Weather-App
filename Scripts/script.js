let lon;
let lat;
const temperature = document.querySelector(".temp");
const summary = document.querySelector(".summary");
const loc = document.querySelector(".location");
const icon = document.querySelector(".weather-icon-holder");
const feelslike = document.querySelector(".feelslike");
const maxtemp = document.querySelector(".maxtemp");
const mintemp = document.querySelector(".mintemp");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const windspeed = document.querySelector(".windspeed");
const clock = document.getElementById("clock");
const kelvin = 273.15;

function currentTime() {
    const date = new Date();
    let hours;
    let min;
    let clock12;
    const cycle = date.getHours();

    if (date.getHours() > 12) {
        clock12 = date.getHours() - 12;
    } else {
        clock12 = date.getHours();
    }

    if (clock12 < 10) {
        hours = '0' + clock12;
    } else {
        hours = clock12;
    }

    if (date.getMinutes() < 10) {
        min = '0' + date.getMinutes();
    } else {
        min = date.getMinutes();
    }

    if (cycle > 12) {
        clock.innerHTML = hours + ':' + min + ' PM';
    } else {
        clock.innerHTML = hours + ':' + min + ' AM';
    }
}
setInterval(currentTime, 1000);


window.addEventListener("load", () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = "0e5739d36c0bdf76e501b8d729c1fc16";

            //API URL
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${api}`;

            //Fetching the API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    temperature.textContent = Math.floor(data.main.temp - kelvin) + "°C";
                    feelslike.textContent = Math.floor(data.main.feels_like - kelvin) + "°C";
                    maxtemp.textContent = Math.floor(data.main.temp_max - kelvin) + "°C";
                    mintemp.textContent = Math.floor(data.main.temp_min - kelvin) + "°C";
                    humidity.textContent = data.main.humidity + '%';
                    pressure.textContent = data.main.pressure + ' mb';
                    visibility.textContent = Math.floor(data.visibility / 1000).toFixed(1) + ' km';
                    windspeed.textContent = (Math.round(parseFloat(data.wind.speed) * 10) / 10).toFixed(1) + ' m/s'
                    summary.textContent = data.weather[0].description;
                    loc.textContent = data.name + ", " + data.sys.country;
                    const icon1 = data.weather[0].icon;
                    icon.innerHTML = `<img class="weather-icon" src="icons/${icon1}.png">`;
                });
        });
    }
});
