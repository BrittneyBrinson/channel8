setTimeout(function () {
    document.body.style.backgroundImage = "url('./img/ombre-blue.svg')";
    document.getElementsByClassName('glass-container')[0].style.display = 'flex';

    document.getElementsByClassName('navbar')[0].style.display = 'flex';
    document.getElementsByClassName('search-container')[0].style.display = 'inline-block';
    document.getElementsByClassName('link-bar')[0].style.display = 'flex';
}, 3000);

function getUserInput() {
    let userInput = document.getElementById('search-box-api').value;
    let showLocation = document.getElementById('location-name');
    showLocation.innerHTML = "Weather Location: " + userInput.charAt(0).toUpperCase() + userInput.slice(1);
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput},&limit=5&appid=${weather_key}`)
        .then(response => response.json())
        .then(data => {
            let lat = data[0].lat;
            let lon = data[0].lon;
            return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weather_key}`)
        })
        .then(response  => response.json())
        .then((data) => {
            console.log(data)
            let temp = data.main.temp;
            let tempF = Math.round((temp));
            let showTemp = document.getElementById('temp');

            let cloudyOrNot = data.weather[0].main;
            let showCloudyOrNot = document.getElementById('cloudy-or-not');

            let highTemp = data.main.temp_max;
            let highTempF = Math.round((highTemp));
            let showHighTemp = document.getElementById('high-temp');

            let lowTemp = data.main.temp_min;
            let lowTempF = Math.round((lowTemp));
            let showLowTemp = document.getElementById('low-temp');

            let sunrise = data.sys.sunrise;
            let sunriseDate = new Date(sunrise * 1000);
            let sunriseTime = sunriseDate.toLocaleTimeString([], {timeStyle: 'short'});
            let showSunrise = document.getElementById('sunrise');

            let sunset = data.sys.sunset;
            let sunsetDate = new Date(sunset * 1000);
            let sunsetTime = sunsetDate.toLocaleTimeString([], {timeStyle: 'short'});
            let showSunset = document.getElementById('sunset');

            let humidity = data.main.humidity;
            let showHumidity = document.getElementById('humidity');

            let pressure = data.main.pressure;
            let showPressure = document.getElementById('pressure');

            let currentTime = data.dt;
            let normalTime = new Date(currentTime * 1000);
            let hours = normalTime.getHours();
            let minutes = normalTime.getMinutes();
            let formattedTime = hours + ":" + minutes;

            let showTime = document.getElementById('time');
            showTime.innerHTML = "Local Time: " + formattedTime;

            let realFeel = data.main.feels_like;
            let realFeelF = Math.round((realFeel));
            let showRealFeel = document.getElementById('real-feel');

            let windSpeed = data.wind.speed;
            let showWindSpeed = document.getElementById('wind-speed');

            let visibility = data.visibility;
            let showVisibility = document.getElementById('visibility');


//section for showing weather data on page
            showTemp.innerHTML = "Now: " + tempF + "°F";
            showTemp.style.textDecoration = "underline";

            showCloudyOrNot.innerHTML = cloudyOrNot;

            showHighTemp.innerHTML = "High: " + highTempF + "°F  ";
            showLowTemp.innerHTML = "Low: " + lowTempF + "°F";

            showSunrise.innerHTML = "Sunrise: " + sunriseTime;
            showSunset.innerHTML = "Sunset: " + sunsetTime;

            showHumidity.innerHTML = "Humidity: " + humidity + "%";
            showPressure.innerHTML = "Pressure: " + pressure + " hPa";

            showRealFeel.innerHTML = "Feels Like: " + realFeelF + "°F";
            showWindSpeed.innerHTML = "Wind Speed: " + windSpeed + " mph";

            showVisibility.innerHTML = "Current Visibility: " + visibility + " meters";


            let weatherBackground = document.getElementById('weather-background');
            let rightColWeather = document.getElementById('right-col-weather');
            let humidityIcon = document.getElementById('humidity-background');

            humidityIcon.style.backgroundImage = "url('/IMG/humidity-icon.svg')";
            humidityIcon.style.backgroundSize = "cover";


            //section for if statements to change background image and icon based on weather
            if (cloudyOrNot === "Clouds"){
                weatherBackground.style.backgroundImage = "url('./img/cloudy-background.svg')";
                weatherBackground.style.backgroundSize = "cover";
                rightColWeather.style.backgroundImage = "url('./img/cloudy-icon.svg')";
                rightColWeather.style.backgroundSize = "cover";
            }
            else if (cloudyOrNot === "Clear"){
                weatherBackground.style.backgroundImage = "url('./img/clear-background.svg')";
                weatherBackground.style.backgroundSize = "cover";
                rightColWeather.style.backgroundImage = "url('./img/sunrise-icon.svg')";
                rightColWeather.style.backgroundSize = "cover";
            }
            else if (cloudyOrNot === "Haze"){
                weatherBackground.style.backgroundImage = "url('./img/haze-background.svg')";
                weatherBackground.style.backgroundSize = "cover";
            }
            else if (cloudyOrNot === "Smoke"){
                weatherBackground.style.backgroundImage = "url('./img/haze-background.svg')";
                weatherBackground.style.backgroundSize = "cover";
            }
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });


}
























