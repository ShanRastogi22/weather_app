import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Search from "./img/images/search.png"
import Rain from "./img/images/rain.png";

function App() {

  const apiKey = "26e4c2135d8419a2af8b7fc35c3856de"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res)

      setData(res.data)


    }).catch((err) => {
      console.log("err", err)
    })
  }
  useEffect(() => {
    getWetherDetails("london")
  }, [])

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }


  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  return (
    <div className='box'>
      <div className='card'>
        <div className='search'>
          <input type='text' className='form-control' onChange={handleChangeInput} value={inputCity} placeholder='Enter city name'></input>
          <button className='btn btn-primary' type='button' onClick={handleSearch}>
            <img src={Search} /></button>
        </div>
        <div className='weather'>
        <img src={Rain} className='weather-icon'/>
       
        <h4>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h4>
         <h2>{data.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
