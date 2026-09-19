/* ==========================================================================
   Constants
   ========================================================================== */
const API_KEY = "f44aba917a7bd8910d3371ec03f35d6c";
const BASE_URL = "http://api.weatherstack.com/current";
const DEFAULT_CITY = "Islamabad";

/* ==========================================================================
   DOM Elements
   ========================================================================== */
// Weather elements
const weatherIcon = document.getElementById("weather-icon");
const weatherTemp = document.getElementById("weather-temp");
const weatherCity = document.getElementById("weather-city");

// Clock & Greeting elements
const clockEl = document.getElementById("clock");
const greetingEl = document.getElementById("greeting");

/* ==========================================================================
   Feature: Weather Service
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

function renderWeather(temp, icon, city) {
  weatherTemp.textContent = `${temp}°C`;
  weatherIcon.innerHTML = `<img id="weather-icon" src="${icon}" alt="Weather Icon" />`;
  weatherCity.textContent = city;
}

function renderWeatherError() {
  weatherIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
  weatherCity.textContent = "Unavailable";
}

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

/* ==========================================================================
   Feature: Clock & Greeting
   ========================================================================== */
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const hoursFormatted = hours % 12 || 12;
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const greeting =
    hours < 12
      ? "Good Morning"
      : hours < 18
        ? "Good Afternoon"
        : "Good Evening";

  clockEl.textContent = `${hoursFormatted.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  greetingEl.textContent = greeting;
}

/* ==========================================================================
   App Initialization
   ========================================================================== */

displayWeather(DEFAULT_CITY);
updateClock();
