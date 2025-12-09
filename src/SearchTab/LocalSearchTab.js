import React , {useContext, useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
import { AlertContext } from "../Context/AlertsPopusContext";
import Moment from "moment";

/** importing the sub packages */
import PackagesDrop from "./SubComponents/PakagesDropDown";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import search_icn from "../images/search.png";
import CitySuggestionsCMP from "./SubComponents/SuggetionsDrop";
import { useNavigate } from "react-router-dom";
import DatePickerInput from "./SubComponents/Date";
import TimePickerInput from "./SubComponents/Time";

const LocalSearchTab = ({tripType}) => {
    // create the popus context
    const {message , setMessage , status , setStatus} = useContext(AlertContext);
    const [check , setCheck] = useState(false);


    const [selectedDate ,setSelectedDate] = useState(Moment());

    let dbData = JSON.parse(localStorage.getItem('cab_listing')) || {};
    // for the swishing the one tab to another tab
    const navigator = useNavigate();
    const [Packages , setPackages] = useState({
        package_id:'',
        package:''
    });


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

      if(Object.entries(dbData).length < 1){
        localStorage.setItem('cab_listing' , JSON.stringify(formData))
      }

      // handle changes data 
    const HandleChanesData = ( DataObject ) => {
         for(let property in DataObject){
            formData[property] = DataObject[property]
         }

         // save the formatted Data
         setFormData({
            ...formData
         })
    }
    // handle submit handle tab
    useEffect(() => {
        let GetLocalDb = JSON.parse(localStorage.getItem('cab_listing')) || {};
        if(GetLocalDb.trip_type === tripType){
            HandleChanesData(GetLocalDb)
        }
    } , [])

    const CabSearchSubmit = (e) => {
         e.preventDefault();
         if(formData.from_city.length < 1){
            setMessage({
                status:false,
                message:'Please Enter the valid city'
            })
            // set the Status of message
            setStatus(true);
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
        
            // Return a cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timer);
         }
         if(!['oneway' , 'local' , 'airport' , 'outstation'].includes(tripType)){
             // setup error for trip types
            setMessage({
                status:false,
                message:'Please select the Trip type'
            })
            setStatus(true);
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
        
            // Return a cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timer);   
        }
        if(formData.pickup_date.length < 1){
            setMessage({
                status:false,
                message:'Please select the valid date'
            })
            // set the Status of message
            setStatus(true);
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
        
            // Return a cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timer);
        }
        if(formData.package === '' || formData.package.length < 1){
            setMessage({
                status:false,
                message:'Please select the List'
            })
            // set the Status of message
            setStatus(true);
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
        
            // Return a cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timer);
        }
        if(formData.pickup_time.length < 1){
            setMessage({
                status:false,
                message:'Please select the List'
            })
            // set the Status of message
            setStatus(true);
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
        
            // Return a cleanup function to clear the timeout when the component unmounts
            return () => clearTimeout(timer);
        }
         localStorage.setItem('cab_listing' , JSON.stringify(formData));
         navigator('/cab-listing')
    }
   
    return (
        <Form onSubmit={(e) => CabSearchSubmit(e)}>
        <div className="d-flex mb-3 justify-content-between">
           <CitySuggestionsCMP handleFormatted={HandleChanesData} tripType={tripType}  />
            <div className="w40 multicty flex-wrap">
                <Form.Label>Packages</Form.Label>
                <PackagesDrop setPackagesValues={setPackages} handleFormatted={HandleChanesData} />
            </div>
            <DatePickerInput handleFormatted={HandleChanesData} setSelectedDate={setSelectedDate} tripType={tripType} setCheck={setCheck}/>
            <TimePickerInput handleFormatted={HandleChanesData} selectedDateInput={selectedDate} tripType={tripType}/>
        </div>
        <div className="softwbtn text-center">
            <Button variant="primary" type="submit">
                Search Cab <img src={search_icn} />
            </Button>
        </div>
    </Form>
    )
}


export default LocalSearchTab