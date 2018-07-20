import React from 'react';

class LeftPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { weather } = this.props;

    return <div className="left-panel">
              {weather.map((w,i)=>
                  <div className='weather-item' key={w.id} onClick={this.props.selectWeather.bind(this, w)}>{w.city} - <b>{w.temp} °C</b></div>
              )}
            </div>
  }
}

export default LeftPanel;
