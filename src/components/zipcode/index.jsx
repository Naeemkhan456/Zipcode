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

    function handleClick() {
        if(zipcode.length === 0) {
            alert("please enter zip code first")
        } else if (countryCode.length === 0) {
            alert("please enter country code first")
        }

        if(zipcode.length > 0 && countryCode.length > 0 ) {
          
          axios.get(`http://api.zippopotam.us/${countryCode}/${zipcode}`).then(
            (response) => {
              if(response) {
                console.log(response);
                setData(response.data)
              } else {
                alert("plz try another zipcoode")
              }
              
            })
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
     
        <table>
            <tr>
              <th>Country</th>
              <th>State</th>
              <th>PlaceName</th>
              <th>lat</th>
              <th>lng</th>
            </tr>  
            { Object.keys(data).length > 0 ?        
            <tr>             
              <td>{data?.country}</td>
              <td>{data?.places[0].state} </td>
              <td>{data?.places[0]['place name']}</td>
              <td>{data?.places[0].latitude}</td>
              <td>{data?.places[0].longitude}</td>          
            </tr>   
            : <h2>no data yet</h2>
            }                 
            
          </table>


        {/* <button onClick={getZippotam} type="submit" value={getZippotam}>Submit</button> */}
    </div>
  );
}

export default ZipCode;
