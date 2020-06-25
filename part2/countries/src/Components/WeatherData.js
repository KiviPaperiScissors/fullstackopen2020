import React from 'react'



const WeatherData = (props) => {

  props.fetchWeather(props.country.capital)

  if (props.weather.current === undefined) return 'loading'

  else {
    let data=props.weather
    console.log(data)

    return (
      <div>
        Temperature: {data.current.temperature} degrees Celsius


        <div>
        <img src={data.current.weather_icons}
          alt={data.current.weather_description}
          />
        </div>
        Wind: {data.current.wind_speed} mph, blowing from {props.weather.current.wind_dir}


      </div>
    )
  }
}

export default WeatherData
