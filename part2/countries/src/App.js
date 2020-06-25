import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import Results from './Components/Results'




const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ countryFilterString, setCountryFilterString ] = useState('')
  const [ weather, setWeather ] = useState([])


  const api_key = process.env.REACT_APP_API_KEY

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setCountryFilterString(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data.map(country =>
          ({ ...country, verbose: false})))
      })
  }, [])
  console.log('Loaded', countries.length, 'countries')


  const updateVerboseAttribute = (key) => {
    console.log(key)
    let newCountries = [...countries]
    var index = newCountries.findIndex(country =>
      country.numericCode === key)
    console.log(index)
    if (newCountries[index].verbose) {
      newCountries[index].verbose = false
    } else {
      newCountries[index].verbose = true
    }
    setCountries(newCountries)

  }

  function useFetchWeather(capital) {

    let params = {
      access_key: api_key,
      query: capital
    }
    console.log(params)
    useEffect(() => {
      axios
        .get('http://api.weatherstack.com/current', {params})
        .then(response => {
          console.log('weather data fetched', response.data)
          setWeather(response.data)
        })
    },[])
  }


  return (
    <div>
      <h1>Country query:</h1>

      <Filter countryFilterString={countryFilterString} handleFilterChange={handleFilterChange} />
      <Results countries={countries.filter(country =>
        country.name.toUpperCase()
        .includes(countryFilterString.toUpperCase()))} countryFilterString={countryFilterString}
        updateVerbose={updateVerboseAttribute} weather = {weather}
        fetchWeather={useFetchWeather}/>

    </div>

  )
}

export default App;
