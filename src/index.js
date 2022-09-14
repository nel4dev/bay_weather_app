let now = new Date();

let options = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};

let celciusTemperature = null;


let month = now.toLocaleTimeString("en-us", options);

let todaysDate = document.querySelector("#date");

todaysDate.innerHTML = `${month}`;


function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let place = searchInput.value;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${apiKey}`;
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
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeCelcius);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeFahrenheit);

