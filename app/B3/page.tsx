
import React from 'react';

async function fetchWeatherData() {
  const url = "https://api.open-meteo.com/v1/forecast";
  const params = {
    latitude: 20.9781,
    longitude: 105.7938,
    hourly: "uv_index",
    daily: "weathercode,temperature_2m_max,sunshine_duration,uv_index_max",
    timezone: "auto",
    past_days: 2,
    forecast_days: 3
  };

  const queryString = new URLSearchParams(params).toString();
  
  try {
    const response = await fetch(`${url}?${queryString}`);
    if (!response.ok) {
      throw new Error('Loi lay du lieu');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Loi lay du lieu:", error);
    return null;
  }
}

export default async function WeatherPage() {
  const data = await fetchWeatherData();

  if (!data) {
    return <div>Khong lay duoc du lieu.</div>;
  }

  const { hourly, daily } = data;

  const weatherData = {
    time: hourly.time ? hourly.time.map((t:any) => new Date(t)) : [],
    uvIndex: hourly.uv_index || [],
    weatherCode: daily.weathercode || [],
    temperatureMax: daily.temperature_2m_max || [],
    sunshineDuration: daily.sunshine_duration || [],
    uvIndexMax: daily.uv_index_max || []
  };

  return (
    <div>
      <h1>Du bao thoi tiet</h1>
      <ul>
        {weatherData.weatherCode.map((code:any, index:any) => (
          <li key={index}>
            <strong>Ngay {index + 1}:</strong>Nhiet do cao nhat: {weatherData.temperatureMax[index]}°C, Thoi gian nang: {weatherData.sunshineDuration[index]} phut, chi so UV cao nhat: {weatherData.uvIndexMax[index]}
          </li>
        ))}
      </ul>
    </div>
  );
}

