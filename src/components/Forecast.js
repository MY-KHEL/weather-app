import { useEffect, useState } from "react"
import { FORECAST_API } from "./forecastApi"

const WEEKLY_DAYS = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun']

let dayInAWeek = new Date().getDay()

let forecastDays=WEEKLY_DAYS.slice(dayInAWeek,WEEKLY_DAYS.length).concat(WEEKLY_DAYS.slice(0,dayInAWeek))
// console.log(forecastDays);

const Forecast = ({search,weather}) => {
const [data,setData] = useState(FORECAST_API)
const [error,setError] = useState(null)
const [isLoading,setIsLoading] = useState(false)
useEffect(()=>{
  setIsLoading(true)
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=075025eeb9112469175b32b91150a24b&units=Metric`).then(res => {
    if (!res.ok) {
        throw Error('Could not find weather condition for that  city')
    }
    return res.json()
    
    
  })
  .then((data)=>{
    //  console.log(data);
     setData(data)
     setError(null)
     setIsLoading(false)
   
  }).catch(err =>{
    setError(err.message)
    setData('')
    setIsLoading(false)
    // console.log(err.message);
  })

},[search])

    return (
       <>
        {isLoading &&  <div className="d-flex align-items-center">
         <p role="status">Loading...</p>
            
        </div>}
       {error && error}
       {data &&
       <div className="container p-0 ">
        <p className="fw-bold fs-3 px-4 mt-3">Weekly Statistics</p>
    <div className=" mt-3 d-flex align-items-center container--two  overflow-auto">
       {data.list.splice(0,7).map((item, idx) => {
        return(
        <span className=" cast--box rounded bg-white shadow mx-2" key={idx}>
          <img className="weather-icon mx-auto d-block mt-2 w-50" src={`icons/${item['weather'][0]['icon']}.png`} alt="weather-icon"/>
          <p className="text-center">{forecastDays[idx]}</p>
          
          <p className="text-center fw-semibold fs-5">{Math.round(item['main']['temp'])}&deg;C </p>
          <hr/>
          <p className="text-center pb-1-0 m-0 fs-6 fw-semibold">{item['weather'][0]['description']}</p>
          {/* <p>{item.sys}</p> */}

        </span>)

      })}
    </div>
    
    </div> }
    
    {weather && 
    <>
    <div className="hr w-100 ">

    
    </div>
    <div className="px-4">
      <p className="fs-3 fw-bold mt-3">Today's Highlight</p>
      <div className="row mt-1">
        <div className="col-md-2 col-12 mt-2 mx-md-2  rounded bg-white">
          <p className="text-center fw-semibold"><i className="bi bi-droplet-half"></i>  Humidity</p>
          <p className="text-center fw-semibold  fs-4"> {Math.round(weather['main']["humidity"])}</p>
        </div>
        {/* <div className="col-1"></div> */}
        <div className="col-md-2 col-12 mt-2 mx-md-2 rounded bg-white">
        <p className="text-center fw-semibold"><i className="bi bi-speedometer"></i>  Pressure</p>
        <p className="text-center  fw-semibold  fs-3">  {Math.round(weather['main']["pressure"])} <span className="fs-5">hPa</span></p>
        </div>
        {/* <div className="col-1"></div> */}
        <div className="col-md-2 mb-0 mt-2 pb-0 col-12 mx-md-2 rounded bg-white">
        <p className="text-center fw-semibold"><i className="bi bi-thermometer"></i> Feels Like</p>
        <p className="text-center pb-0  fw-semibold  fs-3">{Math.round(weather['main']["feels_like"])}&deg;C</p>
        </div>
        {/* <div className="col-1"></div> */}
        <div className="col-md-2 mb-0 mt-2 pb-0 col-12 mx-md-2 rounded bg-white">
        <p className="text-center fw-semibold"><i className="bi bi-wind"></i> windspeed</p>
        <p className="text-center pb-0  fw-semibold  fs-3">{Math.round(weather['wind']["speed"])}</p>
        </div>
        <div className="col-md-2 mb-0 mt-2 pb-0 col-12 mx-md-2 rounded bg-white">
        
        <p className="text-center fw-semibold"><i className="bi bi-thermometer"></i> Max Temp</p>
        <p className="text-center pb-0  fw-semibold  fs-4">{Math.round(weather['main']["temp_max"])}&deg;C</p>
        </div>
      </div>
    </div></>
    }
    
                </> );
}
 
export default Forecast;