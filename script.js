const apiKey = "04379868dbb86b52b57544cc9831e543";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;
const weatherIcon = document.querySelector(".weather-item");
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-button");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (response.status == 404) {
    error.style.display = "block";
    weather.style.display = "none";
    return;
  }
  const data = await response.json();
  console.log(data);

  document.querySelector(".city").innerText = data.name;
  document.querySelector(".temperatura").innerText =
    Math.round(data.main.temp) + "℃";
  document.querySelector(".humidity").innerText = data.main.humidity + "%";
  document.querySelector(".wind").innerText = data.wind.speed + "km/h";

  switch (data.weather[0].main) {
    case "Clear":
      weatherIcon.src = "image/clear.png";
      break;
    case "Clouds":
      weatherIcon.src = "image/clouds.png";
      break;
    case "Rain":
      weatherIcon.src = "image/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "image/snow.png";
      break;
    default:
      weatherIcon.src = "image/clouds.png";
  }

  error.style.display = "none";
  weather.style.display = "flex";
}

searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    checkWeather(city);
    searchInput.value = "";
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      checkWeather(city);
      searchInput.value = "";
    }
  }
});
