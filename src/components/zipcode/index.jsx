import { useState } from "react";
import axios from 'axios';


function ZipCode() {
    const [zipcode , setZipcode] = useState('')
    const [countryCode  , setCountryCode] = useState('')
    const [data  , setData] = useState('')

    const handlechangeZipcode = event => {
        setZipcode(event.target.value)
        console.log('value is:', event.target.value);
    }

    const handlechangeCountrycode = event => {
        setCountryCode(event.target.value)
        console.log('value is:', event.target.value);
    }

    const  handleClick = async () => {
        if(zipcode.length === 0) {
            alert("please enter zip code first")
        } else if (countryCode.length === 0) {
            alert("please enter country code first")
        }

        if(zipcode.length > 0 && countryCode.length > 0 ) {
        
          try {
            const response = await axios.get(`http://api.zippopotam.us/${countryCode}/${zipcode}`)
        
            if(response) {
              console.log("response",response);
              setData(response.data)
            } else {
              alert("plz try another zipcoode")
            }
          } catch(err) {
           
            if(err.response.status === 404){
              alert("zip Code not found try another")
            }
          }
      
    
      }
    }
           
  return (
    <div>
      <h1>Welcome to zipcode</h1>
      <input type="text" name="zipcode" onChange={handlechangeZipcode} value={zipcode} placeholder="enter zipcode"/>
      <br />
      <input type="text" name="countrycode" onChange={handlechangeCountrycode} value={countryCode} placeholder="enter coutry code"/>
      <br />
        <button onClick={handleClick} type="button">Search</button>
        { Object.keys(data).length > 0 ? 
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>State</th>
              <th>PlaceName</th>
              <th>lat</th>
              <th>lng</th>
            </tr>  
            </thead>
                
            <tbody>
            <tr>             
              <td>{data?.country}</td>
              <td>{data?.places[0].state} </td>
              <td>{data?.places[0]['place name']}</td>
              <td>{data?.places[0].latitude}</td>
              <td>{data?.places[0].longitude}</td>          
            </tr>   
            </tbody>
                           
            
          </table>
           : <h2>no data yet</h2>
          } 


        {/* <button onClick={getZippotam} type="submit" value={getZippotam}>Submit</button> */}
    </div>
  );
}

export default ZipCode;
