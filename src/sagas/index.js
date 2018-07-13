import "regenerator-runtime/runtime";
import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import * as api from '../api/main-api';


function* fetchWeather() {
   try {
      const weather = yield call(api.getWeather);

      const editWeatherArr = weather.list.map((w,i)=> {
        return {
          id: w.id,
          city: w.name,
          temp: w.main.temp
        }
      })

      yield put({type: "WEATHER_SUCCEEDED", weather: editWeatherArr});
   } catch (e) {
      yield put({type: "WEATHER_FAILED"});
   }
}

function* mySaga() {
  yield  [
    takeEvery("GET_WEATHER", fetchWeather),
  ];
}

export default mySaga;
