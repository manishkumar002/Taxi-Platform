import React, { useState, useContext , useEffect } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { AlertContext } from "../../Context/AlertsPopusContext";
import moment from "moment";
import './datePickerStyle.css'

const DatePickerInput = ({ handleFormatted, setSelectedDate, tripType  , setCheck}) => {

    /***********************use context for the show Alerts message ***********/
    const { setMessage, setStatus } = useContext(AlertContext);

    let dbData = JSON.parse(localStorage.getItem('cab_listing')) || {};
    const [startDate, setStartDate] = useState(null);
    useEffect(() => {

        let defaultDate;

        if(dbData.trip_type === tripType){
            defaultDate = dbData.pickup_date ? new Date(dbData.pickup_date) : '';
        }
        setStartDate(defaultDate);
        setSelectedDate(defaultDate);
        setCheck(false);
    }, []);
    // Date handle functions
    const DateHandler = (date) => {

        setSelectedDate(date)
        setCheck(true);
        if (!moment(date).isSameOrAfter(moment() , 'day')) {
            // show the message data in not valid
            setMessage({
                status: false,
                message: `Please select the further Date`
            })
            // set the popup status
            setStatus(true)
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                setStatus(false);
            }, 3000);

            // Return a cleanup function to clear the timeout when the component unmount
            setStartDate(null);
            return () => clearTimeout(timer);
        }

        setStartDate(date)
        // set the handle functions to date;
        handleFormatted({ 'pickup_date': date })
    }

    return (
        <>
            <Form.Group className="w15 position-relative" controlId="">
                <Form.Label>When</Form.Label>
                <DateRangeIcon />
                <DatePicker
                    className="datePickerStyling"
                    selected={startDate}
                    placeholderText="Select Date"
                    value={startDate}
                    onChange={(date) => DateHandler(date)}
                    minDate={new Date()}
                />
            </Form.Group>
        </>
    )
}


export default DatePickerInput