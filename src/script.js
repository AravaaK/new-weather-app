function showTemperature(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temp = document.querySelector("#label");
  temp.innerHTML = Math.round(response.data.main.temp);
}
let apiKey = "473f4a214744fd25fcd4c7f9127f6534";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
