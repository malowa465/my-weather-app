/* eslint-disable indent */
const endpoint = 'https://api.openweathermap.org/data/2.5/weather?q=';

const temprature = document.getElementById('number');
const situation = document.getElementById('situation');
const time = document.getElementById('time');
const searchBar = document.getElementById('location');
const localTimeZone = new Date();
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

function updateCityLocation() {
    const apiCity = searchBar.value;
    const apiKey = '&APPID=f0fda7206d1601a5d39960d1c3c15600';
    const newpoint = `${endpoint}${apiCity}${apiKey}`;
    fetch(newpoint)
        .then((response) => response.json())
        .then((data) => {
            const { description } = data.weather[0];
            situation.innerText = description.charAt(0).toUpperCase()
            + description.slice(1, description.length);

            const { temp } = data.main;
            const degreeF = ((temp - 273.15) * 9) / 5 + 32;
            temprature.innerText = Math.floor(degreeF);

            const currentHours = localTimeZone.getHours();
            let currentMin = localTimeZone.getMinutes();
            if (currentMin < 10) {
                currentMin = `0${currentMin}`;
            }
            const localZone = localTimeZone.getTimezoneOffset() / -60;
            const targetZone = data.timezone / 3600;
            const timeDiff = targetZone - localZone;
            let newTime = currentHours + timeDiff;
            let displayedTime;
            if (newTime > 12 && newTime < 24) {
                newTime -= 12;
                displayedTime = `${newTime.toString()}:${currentMin.toString()}`;
                time.innerText = `${displayedTime}pm`;
                if (newTime > 6) {
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                } else {
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                }
            } else if (newTime > 24) {
                newTime -= 24;
                if (newTime > 6 && newTime < 17) {
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                }
                if (newTime < 6) {
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                }
                if (newTime > 12 && newTime < 24) {
                    newTime -= 12;
                    displayedTime = `${newTime.toString()}:${currentMin.toString()}`;
                    time.innerText = `${displayedTime}pm`;
                    if (newTime > 6) {
                        sun.style.display = 'block';
                        moon.style.display = 'none';
                    } else {
                        sun.style.display = 'block';
                        moon.style.display = 'none';
                    }
                } else {
                    displayedTime = `${newTime.toString()}:${currentMin.toString()}`;
                    time.innerText = `${displayedTime}am`;
                    if (newTime < 7) {
                        sun.style.display = 'none';
                        moon.style.display = 'block';
                    } else {
                        sun.style.display = 'block';
                        moon.style.display = 'none';
                    }
                }
            } else {
                displayedTime = `${newTime.toString()}:${currentMin.toString()}`;
                time.innerText = `${displayedTime}am`;
                if (newTime < 7) {
                    sun.style.display = 'none';
                    moon.style.display = 'block';
                } else {
                    sun.style.display = 'block';
                    moon.style.display = 'none';
                }
            }
        });
}
searchBar.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
     event.preventDefault();
     updateCityLocation();
    }
});
