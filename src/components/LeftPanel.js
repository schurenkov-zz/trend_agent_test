import React from 'react';

export default (props) => {
  return (
    <div className="left-panel">
      {props.weather.map((w,i)=>
          <div className='weather-item' key={w.id} onClick={e=> props.selectWeather(w)}>{w.city} - <b>{w.temp} °C</b></div>
      )}
    </div>
  )
}
