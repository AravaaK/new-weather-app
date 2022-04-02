function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5)
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="forecastDate">${formatDay(forecastDay.dt)}</div>
                </br>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="42"
                />
           <div class="forecastTemperature"> 
            </br>
           <span class="units-minimum">${Math.round(
             forecastDay.temp.max
           )}°</span> 
             <span class="units-maximum"> ${Math.round(
               forecastDay.temp.min
             )}°</span> 
           </div>
           </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showForecast(coordinates) {
  let apiKey = "473f4a214744fd25fcd4c7f9127f6534";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = document.querySelector("#city");
  let temp = document.querySelector("#label");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feelsLike");
  let windSpeedElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  showForecast(response.data.coord);

  city.innerHTML = response.data.name;
  temp.innerHTML = Math.round(celsiusTemperature);
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "473f4a214744fd25fcd4c7f9127f6534";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New york");
