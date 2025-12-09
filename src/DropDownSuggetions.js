import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Config from "./Config/Config";
import axios from "axios";


const DroupDwonSuggetions = ({TargetInput , trip_type , handleSuggestionClick}) => {

    const [ApiResponse , setApiResponse] = useState([]);

    const CalledCityAPI =  (key , CheckedValue) => {
        const Payloads = {
            "keyword":`${key}`,
            "page_no":"1",
            "records_per_page":"10",
            "trip_type":`${CheckedValue}`
        }

       // calling City API
       axios.post(`${Config.API_URL}/api/customer/citylist` , JSON.parse(JSON.stringify(Payloads)) , {
          headers: {
            'Authorization':`${Config.API_ACCESS_TOKEN}`
          }
       })
       .then((response) => {
             console.log(response.data)
             if(response.data.status){
                setApiResponse(response.data.data);
             }else {
                setApiResponse([]);
             }
       })
       .catch(err => {
           console.log(err)
           setApiResponse([]);
           // or logs the Error here
       })
    }
    
    useEffect(() => {
       let timer;
       clearTimeout(timer);
       setTimeout(() => {
        CalledCityAPI(TargetInput , trip_type);
       } , 1000)
    } , [TargetInput , trip_type]) 


    return (
        <Dropdown className="position-absolute suggetionsDropDown">
        {
            ApiResponse.length > 0 &&
            ApiResponse.map((value , index) => {
                return <>
                <Dropdown.Item key={index} onClick={() => handleSuggestionClick(value)}>{value.city_name} , {value.state_name}</Dropdown.Item>
                </>
            })
        }
       </Dropdown>
    )
}

export default DroupDwonSuggetions;

// import React, { useEffect, useState } from "react";
// import { Dropdown } from "react-bootstrap";
// import Config from "./Config/Config";
// import axios from "axios";

// const DroupDwonSuggetions = ({ TargetInput, trip_type, handleSuggestionClick }) => {
//   const [ApiResponse, setApiResponse] = useState([]);

//   const CalledCityAPI = async (key, CheckedValue) => {
//     console.log(TargetInput, "Called API Box");
//     const Payloads = {
//       keyword: `${key}`,
//       page_no: "1",
//       records_per_page: "10",
//       trip_type: `${CheckedValue}`,
//     };

//     try {
//       const response = await axios.post(`${Config.API_URL}/api/customer/citylist`, JSON.parse(JSON.stringify(Payloads)), {
//         headers: {
//           Authorization: `${Config.API_ACCESS_TOKEN}`,
//         },
//       });
//       if (response.data.status) {
//         setApiResponse(response.data.data);
//         console.log(response.data);
//       } else {
//         // Call Google Places API if no data is found
//         console.log(response.data);
//         fetchGoogleCities(key);
//       }
//     } catch (err) {
//       console.log(err);
//       setApiResponse([]);
//       // Call Google Places API on error
//       fetchGoogleCities(key);
//     }
//   };

//   const fetchGoogleCities = async (key) => {
//     const googleApiKey = "AIzaSyD3GQvc2YGFsFAmW83n0YulVL7YwPceWfQ"; // Replace with your Google API key
//     const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(key)}&types=(cities)&key=${googleApiKey}`;
//     const corsProxy = 'https://cors-anywhere.herokuapp.com/'
//     try {
//       const response = await axios.get(`${corsProxy}${url}`);
//       console.log(response.data , 'this is comming from the google autocomplete api')
//       const suggestions = response.data.predictions.map((prediction) => ({
//         city_name: prediction.structured_formatting.main_text,
//         state_name: prediction.structured_formatting.secondary_text,
//       }));
//       setApiResponse(suggestions);
//     } catch (error) {
//       console.error("Error fetching city suggestions from Google:", error);
//       setApiResponse([]);
//     }
//   };

//   useEffect(() => {
//     let timer;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       CalledCityAPI(TargetInput, trip_type);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [TargetInput, trip_type]);

//   console.log(ApiResponse);

//   return (
//     <Dropdown className="position-absolute suggetionsDropDown">
//       {ApiResponse.length > 0 &&
//         ApiResponse.map((value, index) => (
//           <Dropdown.Item key={index} onClick={() => handleSuggestionClick(value)}>
//             {value.city_name}, {value.state_name}
//           </Dropdown.Item>
//         ))}
//     </Dropdown>
//   );
// };

// export default DroupDwonSuggetions;
