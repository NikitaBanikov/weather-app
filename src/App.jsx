import './App.css';
import Today from './Today';
import Week from './Week';
import WeatherInput from './WeatherInput';
import { useState } from 'react';

function App() {
  const [comp, setComp] = useState('');
  const [todayButton, setTodayButton] = useState(true);
  const [weekButton, setWeekButton] = useState(true);
  const [title, setTitle] = useState(true);
  const [originalContent, setOriginalContent] = useState(true);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState([]);
  const [data, setData] = useState([]);
  const [sunriseData, setSunriseData] = useState(0);
  const [sunsetData, setSunsetData] = useState(0);

  const handleSearchChange = (value) => {
    setCityName(value);
  }

  const getCityFromCoords = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a7d9b4024c4d5af4afcf1a2f5bbfeb73`);
    const data = await response.json();
    setCityName(data.name);
  }

  const getCoords = async () => {
       if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
        const { coords } = position;
        await getCityFromCoords(coords.latitude, coords.longitude);
        fetchData(1, coords.latitude, coords.longitude);
      });
    }
  }

  const fetchData = async (count, lat, lon) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a7d9b4024c4d5af4afcf1a2f5bbfeb73&cnt=${count}&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    if (data.cod === "404") {
      setError(data.message);
    }
    if (data.cod === "200") {
      setSunriseData(data.city.sunrise);
      setSunsetData(data.city.sunset);
      setData(data.list);
      setError("");
    }
  }

  const showForToday = () => {
    setComp('Today')
    setTodayButton(false)
    setWeekButton(false)
    setTitle(false)
    setOriginalContent(false)
  }
  
  const showForWeek = () => {
    setComp('Week')
    setTodayButton(false)
    setWeekButton(false)
    setTitle(false)
    setOriginalContent(false)
  }

  const showOriginal = () => {
    setOriginalContent(!originalContent)
    setTodayButton(true)
    setWeekButton(true)
    setTitle(true)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-button' onClick={showOriginal}>
          <img className='Header-logo' src='cloud.svg' alt='logo'/>
          <span>Weather</span>
        </div>
        <WeatherInput onSearchChange={handleSearchChange}/>
        <div onClick={getCoords} className='Header-button'>
          <img className='Header-logo' src='geolocation.svg' alt='logo'/>
        </div>
      </header>
      <main>
        <div className='Container'>
          {originalContent ? (
            <div className='Choose-div'>
              {title && <h2 className='Main-title'>Choose variant for weather report:</h2>}
              <div className='Error-container'>
                {error}
              </div>
              <div className='Buttons-wrapper'>
                {todayButton && <button type='button' className='Main-button' onClick={() => {fetchData(1); showForToday();}}>Today</button>}
                {weekButton &&  <button type='button' className='Main-button' onClick={() => {fetchData(40); showForWeek();}}>For Week</button>}
              </div>
          </div>
          ) : (
            <div>
              {comp === 'Today' && <Today data={data} city={cityName} sunriseData={sunriseData} sunsetData={sunsetData}/>}
              {comp === 'Week' && <Week data={data}/>}
            </div>
          )}
        </div>
      </main>
      <p className='Info'>Введите название города в поисковую строку или нажмите на крайнюю правую кнопку геолокации и выберите формат прогноза погоды. Чтобы вернуться на начальную страницу нажмите кнопку Weather</p>
    </div>
  );
}

export default App;
