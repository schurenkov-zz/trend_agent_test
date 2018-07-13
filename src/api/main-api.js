import axios from 'axios';
import store from '../store';
import qs from 'qs';

const API = '00ebbff799ab7d176c40a1e8d74600cc';

export function getWeather(){
  return axios.get('https://api.openweathermap.org/data/2.5/find?lat=55.7&lon=37.6&units=metric&lang=ru&cnt=10&APPID=' + API)
              .then(result=> { return result.data })
}
