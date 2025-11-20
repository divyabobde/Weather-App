import { useState } from "react"
import InfoBox from "./InfoBox"
import SearchBox from "./SearchBox"

export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({
          city:"Delhi",
        humidity: 38,
        temp: 26.05,
        tempMax: 26.05,
        tempMin: 26.05,
        weather: "haze"
    }) 

    let updateInfo = (newinfo)=>{
       setWeatherInfo(newinfo);
    }

  return (
    <div style={{textAlign:"Center"}}>
        <h2>Weather App by Divya</h2>
        <SearchBox updateInfo={updateInfo}/>
        <InfoBox info={weatherInfo}/>
    </div>
  )
}