const initialState = {
  weather: []
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'WEATHER_SUCCEEDED':
      return Object.assign({}, state, {weather: action.weather});
    default:
      return state;
  }
}

export default mainReducer;
