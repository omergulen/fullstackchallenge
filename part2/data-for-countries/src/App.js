import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ handleFilterNameChange, filterName }) => {
  return (
    <div>
      find countries <input value={filterName} onChange={e => handleFilterNameChange(e.target.value)} />
    </div>
  )
}

const Header = ({ title }) => <h2>{title}</h2>

const SubHeader = ({ title }) => <h3>{title}</h3>

const Property = ({ property, value }) => <p>{property} : {value}</p>

const Warning = ({ length }) => {
  if (length > 0) {
    return (<p>Too many ({length}) matches, please specify furher.</p>);
  } else {
    return (<p>There is no match!</p>);
  }
}

const Image = ({ source }) => (<img style={{ width: 200 }} src={source} alt="country flag" />)

const CountryList = ({ countries, handleFilterNameChange }) => (
  <ul>
    {countries.map((el, i) => {
      return (
        <li key={el.name + i}>
          {el.name}
          <button onClick={() => handleFilterNameChange(el.name)}>Show</button>
        </li>
      )
    })}
  </ul>
)

const Languages = ({ languages }) => (
  <ul>
    {languages.map((el, i) => {
      return (
        <li key={el['iso639_2'] + i}>{el.name}</li>
      )
    })}
  </ul>
)


const SingleCountry = ({ country }) => {
  return (
    <div>
      <Header title={country.name} />
      <Property property="Capital" value={country.capital} />
      <Property property="Population" value={country.population} />
      <SubHeader title="Languages" />
      <Languages languages={country.languages} />
      <Image source={country.flag} />
      <Weather city={country.capital} />
    </div>
  )
}

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  axios.get(`http://api.weatherstack.com/current?access_key=0eff86f07265bf7c84bc7273c7a711a9&query=${city}`)
    .then((response => {
      const { temperature, weather_icons, wind_speed, wind_dir } = response.data.current;
      const weather = {
        temperature,
        weather_icons,
        wind_speed,
        wind_dir
      }
      setWeather(weather);
    }))

  return (
    <div>
      {
        weather && weather.temperature ?
          <div>
            <SubHeader title={'Weather in ' + city} />
            <Property property="Temperature" value={weather.temperature + ' celcius'} />
            <Image source={weather.weather_icons[0]} />
            <Property property="Wind Speed" value={weather.wind_speed} />
            <Property property="Wind Direction" value={weather.wind_dir} />
          </div> :
          <p>Loading...</p>
      }
    </div>
  )
}

const Body = ({ filteredCountries, handleFilterNameChange }) => {
  const length = filteredCountries.length;
  if (length === 1) {
    return (<SingleCountry country={filteredCountries[0]} />);
  } else if (length < 10 && length > 0) {
    return (<CountryList handleFilterNameChange={handleFilterNameChange} countries={filteredCountries} />);
  } else if (length < 0) {
    return (<Warning length={length} />);
  } else {
    return (<Warning length={length} />);
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  const handleFilterNameChange = (name) => {
    setFilterName(name);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />
      {countries.length > 0 ? <Body handleFilterNameChange={handleFilterNameChange} filteredCountries={countries.filter(el => el.name.toLowerCase().includes(filterName.toLowerCase()))} /> : ''}
    </div>
  );
}

export default App;
