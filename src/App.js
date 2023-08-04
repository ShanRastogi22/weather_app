import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from "./img/Img.jpg";
import { useEffect, useState } from 'react';
import axios from "axios";

function App() {

  const apiKey = "26e4c2135d8419a2af8b7fc35c3856de"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL ="http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response",res)

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
    <div className='col-md-12'>

<div className='weatherBg'>
      <h1>Weather</h1>
      <input type='text' className='form-control' onChange={handleChangeInput} value={inputCity}/>
      <button className='btn btn-primary' type='button' onClick={handleSearch}>sarch</button>
      <h2>{data.name}</h2>
      <h4>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h4>
</div>
    </div>
  );
}

export default App;
