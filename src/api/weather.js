import axios from "axios";
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_BASE_URL;

export const getWeatherByCity = async (city) => {
  const res = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  return res.data;
};