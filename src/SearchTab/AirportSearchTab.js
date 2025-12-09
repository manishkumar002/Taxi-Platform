import React , {useState , useContext , useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import search_icn from "../images/search.png";
import DatePickerInput from "./SubComponents/Date";
import TimePickerInput from "./SubComponents/Time";
import CitySuggestionsCMP from "./SubComponents/SuggetionsDrop";
import AirportSuggestionsCMP from "./SubComponents/Airports";
import { AlertContext } from "../Context/AlertsPopusContext";
import { useNavigate } from "react-router-dom";
import SwapCityCMP from "./SubComponents/SwapCity";
import { SwapCityContext } from "../Context/SwapContext";
import moment from 'moment';

const AirPortSearchTab = ({tripType}) => {

    const { message, setMessage, status, setStatus } = useContext(AlertContext);
    const {to_city , setTo_city , from_city , setFrom_city , swapStatus,setSwapStatus} = useContext(SwapCityContext);
    const [check , setCheck] = useState(false);


    // use navigation for redirect the another page
    const Navigation = useNavigate();

    // handle data and Times
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        from_city: "",
        from_city_id: "",
        from_state_id: "",
        from_state_name: "",
        trip_type: tripType,
        to_city: "",
        to_city_id: "",
        to_state_id: "",
        to_state_name: "",
        pickup_date:'',
        pickup_time: '' ,
        drop_date: "",
        package: '',
        package_id: '',
        vehicle_name: "",
        vehicle_id:  ""
      });

      const HandleChangesData = ( DataObject ) => {
        for(let property in DataObject){
           formData[property] = DataObject[property]
        }

        // save the formatted Data
        setFormData({
           ...formData
        })
     }

    useEffect(() => {
        let GetLocalDb = JSON.parse(localStorage.getItem('cab_listing')) || {};
        if(GetLocalDb.trip_type === tripType){
            HandleChangesData(GetLocalDb)
        }
    } , [])

    // handle submit handle tab
    console.log(formData , 'final form data' );
    const CabSearchSubmit = (e) => {
         // handle changes data
         e.preventDefault();
         //
         if(formData.from_city === '' || formData.from_city.length < 1){
             setMessage({
                status:false,
                message:"Please select the pickup location"
             })
             setStatus(true);
             const timer = setTimeout(() => {
                 setStatus(false);
             }, 3000);
 
             // Return a cleanup function to clear the timeout when the component unmount
             return () => clearTimeout(timer);
         }
         if(formData.to_city === '' || formData.to_city < 1){
            setMessage({
                status:false,
                message:"Please select the drop location"
             })
             setStatus(true);
             const timer = setTimeout(() => {
                 setStatus(false);
             }, 3000);
 
             // Return a cleanup function to clear the timeout when the component unmount
             return () => clearTimeout(timer);
         }
         if(formData.pickup_date.length < 1 || formData.pickup_date === ''){
            setMessage({
                status:false,
                message:"Please select the pickup date"
             })
             setStatus(true);
             const timer = setTimeout(() => {
                 setStatus(false);
             }, 3000);
 
             // Return a cleanup function to clear the timeout when the component unmount
             return () => clearTimeout(timer);
         }
         if(formData.pickup_time.length < 1 || formData.pickup_time === ''){
            setMessage({
                status:false,
                message:"Please select the pickup time"
             })
             setStatus(true);
             const timer = setTimeout(() => {
                 setStatus(false);
             }, 3000);
 
             // Return a cleanup function to clear the timeout when the component unmount
             return () => clearTimeout(timer);
         }
         // remove the current localstorage and override the data
         localStorage.removeItem('cab_listing');
         // save the data in localstorage for now
         localStorage.setItem('cab_listing' , JSON.stringify(formData));
         Navigation('/cab-listing')

    }
       
    return (
        <Form onSubmit={(e) => CabSearchSubmit(e)}>
        <div className="d-flex mb-3 justify-content-between">
            <CitySuggestionsCMP handleFormatted={HandleChangesData} tripType={tripType}  formData={formData}/>
            <SwapCityCMP />
            <AirportSuggestionsCMP handleFormatted={HandleChangesData} tripType={tripType} formData={formData}/>
            <DatePickerInput handleFormatted={HandleChangesData} setSelectedDate={setSelectedDate} tripType={tripType} setCheck={setCheck}/>
            <TimePickerInput handleFormatted={HandleChangesData} selectedDateInput={selectedDate} tripType={tripType}/>
        </div>
        <div className="softwbtn text-center">
            <Button variant="primary" type="submit">
                Search Cab <img src={search_icn} />
            </Button>
        </div>
    </Form>
    
    )
}


export default AirPortSearchTab