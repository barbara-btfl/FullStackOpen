import { useState, useEffect } from "react";
import weatherService from "../services/weather";

export const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!country?.latlng || !country.latlng[0] || !country.latlng[1]) {
      setError("No coordinates available for this country");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const capital = country.capital?.[0] || country.name.common;

    console.log(`Fetching weather for ${capital} (${lat}, ${lon})`);

    weatherService
      .getWeather(lat, lon)
      .then((data) => {
        console.log("Weather data received:", data);
        setWeatherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Weather API error:", err);
        setError("Failed to fetch weather data. Please check your API key.");
        setLoading(false);
      });
  }, [country]);

  const cityName = country?.capital?.[0] || country?.name?.common || "Unknown";

  if (loading) {
    return (
      <div>
        <h4>Weather in {cityName}</h4>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h4>Weather in {cityName}</h4>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div>
      <h4>Weather in {weatherData.name}</h4>
      <p>
        <strong>Temperature:</strong> {Math.round(weatherData.main.temp)}°C
      </p>
      <p>
        <strong>Wind:</strong> {weatherData.wind.speed} m/s
      </p>
      <p>
        <strong>Description:</strong> {weatherData.weather[0].description}
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
};
