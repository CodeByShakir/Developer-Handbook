/* ==========================================================================
   Constants
   ========================================================================== */
const API_KEY = "f44aba917a7bd8910d3371ec03f35d6c";
const BASE_URL = "http://api.weatherstack.com/current";
const DEFAULT_CITY = "Islamabad";

/* ==========================================================================
   DOM Elements
   ========================================================================== */
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherCity = document.getElementById("weather-city");
const weatherIconContainer = document.getElementById("weather-icon-container");

/* ==========================================================================
   API / Data Fetching
   ========================================================================== */
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `${BASE_URL}?access_key=${API_KEY}&query=${encodeURIComponent(city)}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.info || "Weatherstack returned an error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return null;
  }
}

/* ==========================================================================
   Render Functions
   ========================================================================== */
function renderWeather(temp, icon, city) {
  weatherTemp.textContent = `${temp}°C`;
  weatherIconContainer.innerHTML = `<img id="weather-icon" src="${icon}" alt="Weather Icon" />`;
  weatherCity.textContent = city;
}

function renderWeatherError() {
  weatherIconContainer.innerHTML = `<i class="fa-whiteboard fa-semibold fa-cloud"></i>`;
}

/* ==========================================================================
   App Initialization
   ========================================================================== */
async function displayWeather(city) {
  const weatherData = await fetchWeather(city);

  if (weatherData && weatherData.current && weatherData.location) {
    const { temperature, weather_icons } = weatherData.current;
    const { name } = weatherData.location;

    renderWeather(temperature, weather_icons[0], name);
  } else {
    renderWeatherError();
  }
}

// Initial Run
displayWeather(DEFAULT_CITY);
