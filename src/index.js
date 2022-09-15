function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let celciusTemperature = null;

let API_KEY = "5f472b7acba333cd8a035ea85a0d4d4c";

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML = forecastHTML + 
  `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
               
                <img
                  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
                  <span class="weather-forecast-temperature-min"> ${Math.round(forecastDay.temp.min)}° </span>
                </div>
              </div>
  `;
    }
  });
   forecastHTML = forecastHTML + `</div>`;
   forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let place = searchInput.value;
  search(place);
  
}

function search(place) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${API_KEY}`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let btn_current = document.getElementById("btn_current");
btn_current.addEventListener("click", currentLocation);

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTime");
  let fahrenheitTemperature = (celciusTemperature * 9) /5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function changeCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#dayTime");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celciusTemperature = response.data.main.temp;

  let h1 = document.querySelector("h2");
  let temperature = Math.round(celciusTemperature);
  let celciusInput = document.querySelector("#dayTime");
  celciusInput.innerHTML = temperature + "°";
  let windSpeed = document.querySelector("#wind_label");
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  h1.innerHTML = `${response.data.name}`;
  let precipitation = document.querySelector("#precip");
  precipitation.innerHTML = `Humidity:${response.data.main.humidity}%`;
  let description = document.querySelector("#weather_description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}



function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  axios.get(url).then(showWeather);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeCelcius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeFahrenheit);

search("Houten");