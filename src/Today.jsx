export default function Today( {data, city, sunriseData, sunsetData} ) {

    const convertTime = (timeData) => {
      const timeUtc = new Date(timeData * 1000);
      timeUtc.setHours(timeUtc.getHours() + 3);
      const hours = timeUtc.getHours();
      const minutes = timeUtc.getMinutes();
      const time = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      return time;
    }
  
    return(
      <div>
        {data && data.map((dayData) => {
          return(
            <div className='Today-container'>
              <div className='Today-weather'>
                <p className='City-name'>{city}</p>
                <img src={`https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`} alt='иконка погоды'></img>
                <p className='Temperature'>{Math.round(dayData.main.temp - 273) + ' C°'}</p>
                <span className='Weather-type'>{dayData.weather[0].description}</span>
              </div>
              <div className='Indicators-container'>
                <div className='Indicator'>
                  <img src='windspeed.svg' alt="скорость ветра" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Wind speed</span>
                    <p className='Indicator-info__value'>{dayData.wind.speed + ' km/h'}</p>
                  </div>
                </div>
                <div className='Indicator'>
                  <img src='humidity.svg' alt="влажность" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Humidity</span>
                    <p className='Indicator-info__value'>{dayData.main.humidity + ' %'}</p>
                  </div>
                </div>
                <div className='Indicator'>
                  <img src='pressure.svg' alt="давление" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Pressure</span>
                    <p className='Indicator-info__value'>{dayData.main.pressure + ' hPa'}</p>
                  </div>
                </div>
                <div className='Indicator'>
                  <img src='visibility.svg' alt="видимость" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Visibility</span>
                    <p className='Indicator-info__value'>{(dayData.visibility / 1000) + ' km'}</p>
                  </div>
                </div>
                <div className='Indicator'>
                  <img src='sunrise.svg' alt="восход" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Sunrise</span>
                    <p className='Indicator-info__value'>{convertTime(sunriseData)}</p>
                  </div>
                </div>
                <div className='Indicator'>
                  <img src='sunset.svg' alt="закат" className='Indicator-img'/>
                  <div className='Indicator-info-container'>
                    <span className='Indicator-info__text'>Sunset</span>
                    <p className='Indicator-info__value'>{convertTime(sunsetData)}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }