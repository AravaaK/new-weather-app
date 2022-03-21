function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#label");
  temp.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = response.data.main.feels_like;
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "473f4a214744fd25fcd4c7f9127f6534";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
