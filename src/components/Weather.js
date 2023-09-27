import { useState } from 'react';
import './Weather.css'
import { WEATHER_API_KEY } from './api';
import Content from './Content';
import Forecast from './Forecast'
import { DEFAULT_DATA } from './default';
const Weather = () => {
    const [search , setSearch] = useState('Nigeria')
    const [data , setData] = useState(DEFAULT_DATA)
    const [error , setError]= useState(null)
    const [isLoading,setIsLoading] = useState(false)

    const handleClick = ()=>{
        // console.log(search);
        setIsLoading(true)
        setError(null)
        setData('')
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${WEATHER_API_KEY}&units=Metric`)
        .then(res => {
            if (!res.ok) {
                throw Error('Could not find weather condition for that  city')
            }
            return res.json()
            
        })
        .then((data)=>{
            // console.log(data);
            setData(data)
            setError(null)
            setIsLoading(false)
        })
        .catch(err =>{
            setError(err.message)
            setData('')
            setIsLoading(false)
            // console.log(err);
        })
        
    }
   
    
    return ( 
        <>
        <div className='div--container container mt-md-3 p-3 px-4 p-md-0 '>

       <div className='row'>
        <div className='col-12 col-md-4'>
            
        <Content data={data} error={error} search={search} isLoading={isLoading} setSearch={setSearch} handleClick={handleClick}/>
        </div>
        <div className='col-12 col-md-8 p-0 m-0'>
            <Forecast search={search}  weather={data} />
        </div>
       </div>

        
        </div>

        </>
     );
}
 
export default Weather;