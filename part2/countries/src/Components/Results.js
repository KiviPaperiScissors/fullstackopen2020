import React from 'react'
import WeatherData from './WeatherData'

const Results = (props) => {

  if (props.countryFilterString === '') return(null);

  if (props.countries.length > 10) return (
    <div>
      Please specify your query.
    </div>
  )

  if (props.countries.length > 1) return (
    <div>
      <ul>
        {props.countries.map(country =>
          <ListedCountry key = {country.numericCode}
            country = {country}
            updateVerbose = {props.updateVerbose}/>
        )}
      </ul>
    </div>
  )

  if (props.countries.length === 0) return (
    <div>
      Sorry, your query does not match any country in the database.
    </div>
  )

  return (
    <>
    <FeaturedCountry country = {props.countries[0]} />
    <WeatherData country = {props.countries[0]} weather = {props.weather}
      fetchWeather={props.fetchWeather} />
    </>


  )
}

const ListedCountry = ( props ) => {

  if (props.country.verbose) return (
    <div><FeaturedCountry country = {props.country} />
    <button onClick={() => props.updateVerbose(props.country.numericCode)}>
      Hide
    </button>
    </div>
)

else return (
  <li>
    {props.country.name}
    <button onClick={() => props.updateVerbose(props.country.numericCode)}>
      Show
    </button>
  </li>
)
}

const Language = ( {name} ) => (
  <li> {name} </li>
)

const FeaturedCountry = ( {country} ) => (
  <div>
    <h1> {country.name} </h1>

    <div> Capital: {country.capital} </div>
    <div> Population: {country.population} </div>

    <h2> Languages: </h2>
      <ul>
        {country.languages.map( language =>
          <Language key = {language.name}
            name = {language.name} />
        )}
      </ul>
      <img src={country.flag}
        alt={`Flag of ${country.name}`}
        height="80"
        border="1"
     />
  </div>
)


export default Results
