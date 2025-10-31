import axios from "axios";

// For this example, I'm using a free weather API
// You can get a free API key from: https://openweathermap.org/api
// React automatically injects environment variables that start with REACT_APP_
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || "demo_key";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = (lat, lon) => {
  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export default {
  getWeather,
};
