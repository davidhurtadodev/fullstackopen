import { useEffect, useState } from 'react';
import axios from 'axios';

const KEY = process.env.REACT_APP_API_WEATHER_KEY;

export function Country({ country }) {
  const [isShow, setIsShow] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [isLoadedWeather, setIsLoadedWeather] = useState(false);

  const handlerShowButton = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (isShow) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&units=metric&appid=${KEY}`
        )
        .then((response) => {
          setWeatherData(response.data);
          setIsLoadedWeather(true);
        });
    }
  }, [isShow]);

  if (isShow && isLoadedWeather) {
    const { ...languages } = country.languages;
    let languagesArray = [];
    for (const [key, value] of Object.entries(languages)) {
      languagesArray.push(value);
    }

    return (
      <div>
        <h1>
          {country.name.common}{' '}
          <button onClick={handlerShowButton}>Show</button>
        </h1>
        <h2>capital {country.capital}</h2>
        <h3>Languages:</h3>
        <ul>
          {languagesArray.map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" />
        <div>temperature {weatherData.main.temp}</div>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        />
        <div>wind {weatherData.wind.speed} m/s</div>
      </div>
    );
  } else {
    return (
      <div>
        {country.name.common}
        <button onClick={() => handlerShowButton()}>Show</button>
      </div>
    );
  }
}
