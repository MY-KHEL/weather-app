
const Content = ({ data, error,search,isLoading,setSearch,handleClick }) => {
    console.log();
    return (
         <>
       

         <div className="row"> 

         <div className=" bg-white  white--container p-3">
         <div className="input-group input-group-sm mt-4 flex-nowrap">
         <input type="text" className="form-control " placeholder="Search for a city" aria-label="Username" aria-describedby="addon-wrapping"  onChange={(e)=>{
            setSearch(e.target.value)
        }}/>
            <span className="input-group-text" id="addon-wrapping" onClick={handleClick}><i className="bi bi-search fw-semibold"></i></span>
            </div>
        {isLoading &&  <div className="d-flex align-items-center">
         <p role="status">Loading...</p>
            
        </div>}
        
         {error && <p>{error} </p>}
        {data && 
         <div className="content-box  ">
            <div className="">
            <img className="weather-icon mx-auto d-block mt-2 w-50" src={`icons/${data['weather'][0]['icon']}.png`} alt="weather-icon"/>
            <p className="temp-text mb-0 pb-0">{Math.round(data['main']['temp'])}&deg;C </p>
            </div>
            <div style={{'marginTop':'0rem'}}>
            <p className="text-center mt pt-0">{`${data["name"]}, ${data['sys']['country']} `} </p>
           
             </div>
             <hr/>
             <div >
                <p className="text-capitalize fw-semibold d-flex align-items-center">
                <i className="bi bi-cloud-fill " 
                style={{"fontSize":"2rem"}}></i>&nbsp; {data['weather'][0]['description']}
                   </p>

                <p>Developed by <a href="https://github.com/MY-KHEL">mykhel</a></p>
             </div>
         </div>}
         </div>
         <div className="col-12 col-md-6">

         </div>
         </div>
        
         
       
         </>
     );
}
 
export default Content;