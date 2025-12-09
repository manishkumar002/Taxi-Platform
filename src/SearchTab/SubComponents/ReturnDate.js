import React, { useState, useEffect , useContext } from "react";
import { Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { AlertContext } from "../../Context/AlertsPopusContext";
import './TimeCustomeCss.css'

const ReturnDate = ({ handleFormatted, selectedDate , tripType  , check}) => {
    const { setMessage, setStatus } = useContext(AlertContext);
    const [startDate, setStartDate] = useState(null);


    useEffect(() => {
        if(selectedDate && selectedDate !== null){
            if(check){
                setStartDate(selectedDate);
                handleFormatted({ 'drop_date': selectedDate })
            }
        }
    }, [check , selectedDate]);

    useEffect(() => {
        let dbData = JSON.parse(localStorage.getItem('cab_listing')) || {};
        // let defaultDate = dbData.trip_type === tripType ? new Date(dbData.drop_date) ||  '' :'';
        let defaultDate;
        if(dbData.trip_type === tripType){
            defaultDate = dbData.drop_date ? new Date(dbData.drop_date) : '';
        }
        setStartDate(defaultDate);
        // handleFormatted({ 'drop_date': defaultDate })
    }, []);


    const DateHandler = (date) => {
        const selectedDateObj = new Date(date);
        const pickupDateObj = new Date(selectedDate);
        if (!isNaN(selectedDateObj.getTime())) {
            if (selectedDateObj > pickupDateObj) {
                setStartDate(selectedDateObj);
                handleFormatted({ 'drop_date': selectedDateObj });
            } else {
                setMessage({
                    status: false,
                    message: `Return date should be further from the pickup date`
                })
                // set the popup status
                setStatus(true)
                // create the settime out and after few second it's return false in set status;
                const timer = setTimeout(() => {
                    setStatus(false);
                }, 3000);
    
                // Return a cleanup function to clear the timeout when the component unmounts
                setStartDate(null);
                handleFormatted({ 'drop_date': null });
                return () => clearTimeout(timer);
            }
        } else {
            setMessage({
                status: false,
                message: `Invalid date input`
            })
            // set the popup status
            setStatus(true)
            // create the settime out and after few second it's return false in set status;
            const timer = setTimeout(() => {
                setStatus(false);
            }, 3000);
            setStartDate(new Date());
            handleFormatted({ 'drop_date': null });
            return () => clearTimeout(timer);
        }
    };

    return (
        <Form.Group className="w15 position-relative"  controlId="">
            <Form.Label>Return</Form.Label>
            <DateRangeIcon />
            <DatePicker
                className="DateStyling"
                selected={startDate}
                value={startDate}
                placeholderText="Return Date"
                onChange={(date) => DateHandler(date)}
                minDate={ new Date() }
            />
        </Form.Group>
    );
};

export default ReturnDate