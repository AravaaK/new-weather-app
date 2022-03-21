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

function showTemperature(response) {
  console.log(response.data.dt);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#label");
  temp.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "473f4a214744fd25fcd4c7f9127f6534";
let city = "Barcelona";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
