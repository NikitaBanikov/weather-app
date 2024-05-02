export default function Week({ data }) {
    const filteredData = data.filter((day, index) => index % 8 === 0);
    return (
      <div>
        {filteredData.length > 0 && (
          <div className='Week-container'>
            {filteredData.map((dayData, index) => {
              const dateValue = new Date(dayData.dt * 1000);
              const dayOfWeek = dateValue.toLocaleString('en', { weekday: 'short' });
              const dayOfMonth = dateValue.getDate();
              const month = dateValue.toLocaleString('en', { month: 'long' });
  
              return (
                <div className='Day' key={index}>
                  <p className='Date'>{`${dayOfWeek} ${dayOfMonth} ${month}`}</p>
                  <img src={`https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`} alt='иконка погоды'></img>
                  <p className='Temperature'>{Math.round(dayData.main.temp - 273) + ' C°'}</p>
                  <span className='Weather-type'>{dayData.weather[0].description}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }