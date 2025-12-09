import React, { useState, useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import AlarmIcon from "@mui/icons-material/Alarm";
import moment from "moment";
import { AlertContext } from "../../Context/AlertsPopusContext";
import 'rc-time-picker/assets/index.css';
import './timeInput.css'
import { Dropdown } from "react-bootstrap";

const TimePickerInput = ({ handleFormatted, selectedDateInput, tripType }) => {
    const { setMessage, setStatus } = useContext(AlertContext);
    const [intervals, setIntervals] = useState([]);
    const [DropdownStatus, setDropdownStatus] = useState(false);

    let dbData = JSON.parse(localStorage.getItem('cab_listing')) || {};

    const format = "h:mm A";
    // const timeMoment = dbData.trip_type === tripType && dbData.pickup_time ? dbData.pickup_time : '';
    const [setTime, getTime] = useState();

    // handle the selected Time in LocalStorages
    useEffect(() => {
        let selectedTime;
        if (dbData.trip_type === tripType) {
            selectedTime = dbData.pickup_time ? dbData.pickup_time : '';
            // getTime(selectedTime)
            getTime(selectedTime)
        }
    }, [])

    const TimeHandler = (time, date) => {
        const formattedTime = time
        if (!moment(time, format, true).isValid()) {
            console.error('Invalid time value');
            return; // Exit early if time is invalid
        }
        let selectedDate = moment(date);

        // Get the current date and time
        const currentTime = moment();
        // Check if the selected date is today
        const isToday = selectedDate.isSame(currentTime, 'day');

        // If the selected date is today, calculate the future time (2 hours from now)
        if (isToday) {
            const futureTime = moment(currentTime).add(2, 'hours');

            // Check if the selected time is within 2 hours from now
            if (moment(formattedTime, format).isBefore(futureTime)) {
                // Show a message or handle the condition as needed
                setMessage({
                    status: false,
                    message: `Please select a time at least 2 hours from now`
                });
                setStatus(true);
                const timer = setTimeout(() => {
                    setStatus(false);
                }, 3000);

                // Return a cleanup function to clear the timeout when the component unmounts
                getTime(time);
                return () => clearTimeout(timer);
            }
        }

        // If the condition is met or the selected date is not today, continue with further processing
        getTime(time);
        handleFormatted({ 'pickup_time': formattedTime });
    };


    // handle this using use state 
    useEffect(() => {
        const selectedDate = moment(selectedDateInput).startOf('day');
        const dbPickupDate = moment(dbData.pickup_date ? dbData.pickup_date : '').startOf('day');
        if (!selectedDate.isSame(dbPickupDate , 'day')) {
            getTime('');
        }else if(selectedDate.isSame(dbPickupDate , 'day')) {
            getTime(dbData.pickup_time ? dbData.pickup_time : '');
        }
    }, [dbData.pickup_date, dbData.pickup_time, selectedDateInput])

    // Custom panel to render time options
    const renderTimePanel = (pickupDate) => {
        // console.log( pickupDate , "this is pickup time here")
        let arrays = [];
        let startTime;
        const endTime = moment().endOf('day');
        setDropdownStatus(true);
        if (moment(pickupDate).isSame(moment(), 'day')) {
            startTime = moment().add(2, 'hours');
        } else {
            startTime = moment().startOf('day');
        }
        while (startTime.isBefore(endTime)) {
            arrays.push(startTime.format(format));
            startTime.add(30, 'minutes');
        }
        setIntervals(arrays)
    };

    const handleSuggestionClick = (values) => {
        getTime(values);
        TimeHandler(values, selectedDateInput);
        setDropdownStatus(false);
        handleFormatted({ 'pickup_time': values });
    }
    return (
        <>
            <Form.Group className="w15 position-relative" controlId="">
                <Form.Label>Time</Form.Label>
                <AlarmIcon />
                <input className="custome_input_css" type="text" value={setTime} onClick={(e) => renderTimePanel(selectedDateInput)} onChange={(e) => TimeHandler(e.target.value, selectedDateInput)} placeholder="Select time" />
                {
                    DropdownStatus &&
                    <Dropdown className="position-absolute suggetionsDropDown" style={{ overflowY: 'auto', height: '10rem', width: '12rem', alignItems: 'center' }}>
                        {
                            intervals.length > 0 &&
                            intervals.map((value, index) => {
                                return <>
                                    <Dropdown.Item key={index} onClick={() => handleSuggestionClick(value)}>{value}</Dropdown.Item>
                                    <hr></hr>
                                </>
                            })
                        }
                    </Dropdown>
                }
            </Form.Group>
        </>
    );
};

export default TimePickerInput;