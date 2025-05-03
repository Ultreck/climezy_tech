import axios from "axios";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = import.meta.env.VITE_WEATHER_BASE_URL;


export const getWeatherByCity = async (city = 'London') => {
    console.log(city);
  const res = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  console.log(res);
  
  return res.data;
};