import React from 'react'
import { useAppContext } from '../context/AppContext';

const CityDetails = () => {
  const { weatherCache } = useAppContext();
  const weatherData = weatherCache[window.location.pathname.split('/').pop().split('%20').join(' ')]; // Get the city name from the URL
console.log(weatherCache[window.location.pathname.split('/').pop().split('%20').join(' ')]);

  // Convert Unix timestamps to time strings
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get weather icon from OpenWeatherMap
  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  return (
    <div className="min-h-screen border-4 border-red-600 bg-gray-100 py-8 px-4">
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{weatherData?.name}, {weatherData?.sys?.country}</h1>
        <p className="text-gray-600">As of {new Date(weatherData?.dt * 1000).toLocaleTimeString()}</p>
      </div>

      {/* Current Weather */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-5xl font-bold text-gray-800">{Math.round(weatherData?.main?.temp)}°</div>
            <div className="text-xl capitalize text-gray-600">{weatherData?.weather[0]?.description}</div>
            <div className="text-gray-500">Day {Math.round(weatherData?.main?.temp_max)}° • Night {Math.round(weatherData?.main?.temp_min)}°</div>
          </div>
          <img 
            src={getWeatherIcon(weatherData?.weather[0]?.icon)} 
            alt={weatherData?.weather[0]?.main}
            className="w-24 h-24"
          />
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Feels Like</h3>
            <p className="text-gray-800">{Math.round(weatherData?.main?.feels_like)}°</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Humidity</h3>
            <p className="text-gray-800">{weatherData?.main?.humidity}%</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Wind</h3>
            <p className="text-gray-800">{weatherData?.wind?.speed} km/h</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Pressure</h3>
            <p className="text-gray-800">{weatherData?.main?.pressure} mb</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Visibility</h3>
            <p className="text-gray-800">{(weatherData?.visibility / 1000).toFixed(1)} km</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Cloud Cover</h3>
            <p className="text-gray-800">{weatherData?.clouds?.all}%</p>
          </div>
        </div>
      </div>

      {/* Daily Forecast */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weather Today in {weatherData?.name}</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Morning</span>
            <span className="font-medium">20°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Afternoon</span>
            <span className="font-medium">28°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">0%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Evening</span>
            <span className="font-medium">20°</span>
            <span className="text-gray-600">Clear</span>
            <span className="text-yellow-500">4%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Overnight</span>
            <span className="font-medium">18°</span>
            <span className="text-gray-600">Cloudy</span>
            <span className="text-yellow-500">5%</span>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Now</span>
            <span className="font-medium">{Math.round(weatherData?.main?.temp)}°</span>
            <span className="text-gray-600 capitalize">{weatherData?.weather[0]?.description}</span>
            <span className="text-yellow-500">2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">10:00</span>
            <span className="font-medium">20°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">11:00</span>
            <span className="font-medium">23°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">1%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">12:00</span>
            <span className="font-medium">26°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">1%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">13:00</span>
            <span className="font-medium">27°</span>
            <span className="text-gray-600">Sunny</span>
            <span className="text-yellow-500">0%</span>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="font-semibold text-gray-700">Sunrise</h3>
            <p className="text-gray-800">{formatTime(weatherData?.sys?.sunrise)}</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-gray-700">Sunset</h3>
            <p className="text-gray-800">{formatTime(weatherData?.sys?.sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CityDetails