import React, { useState, useCallback, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import twoway from '../images/twoway.png'
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import search_icn from "../images/search.png";
import CitySuggestionsCMP from "./SubComponents/SuggetionsDrop";
import TimePickerInput from "./SubComponents/Time";
import DatePickerInput from "./SubComponents/Date";
import DroupDwonSuggetions from "../DropDownSuggetions";
import ReturnDate from "./SubComponents/ReturnDate";
import { AlertContext } from "../Context/AlertsPopusContext";
import { useNavigate } from "react-router-dom";
import { SwapCityContext } from "../Context/SwapContext";
const OutStandingSearchTab = ({ tripType }) => {
    // input for managing
    const { message, setMessage, status, setStatus } = useContext(AlertContext);
    const {to_city , setTo_city , from_city , setFrom_city , swapStatus , setSwapStatus} = useContext(SwapCityContext);

    // swap city context


    const Navigation = useNavigate();
    const [inputFields, setInputFields] = useState([{ cityInput: '', isDropdownOpen: false , cityId:'' }]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [check , setCheck] = useState(false);


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
        pickup_date:"" ,
        pickup_time: '',
        drop_date: "",
        travel_routes: [],
        package: '',
        package_id: '',
        vehicle_name: "",
        vehicle_id: "",
    });

    // set the state of data
    const HandleStateData = (DataObject) => {
        for (let property in DataObject) {
            formData[property] = DataObject[property]
        }

        // save the formatted Data
        setFormData({
            ...formData
        })
    }


    // managing add input field
    const addInputField = () => {
        setInputFields([
            ...inputFields,
            {
                cityInput: "",
                isDropdownOpen: false,
                cityId:''
            },
        ]);
    };

    // remove input field
    const removeInputFields = (index) => {
        // Remove the corresponding travel route from formData
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields);

        const updatedFormData = { ...formData };
        updatedFormData.travel_routes.splice(index, 1);
        setFormData(updatedFormData);
        // Update local storage with the new form data
        localStorage.setItem('cab_listing', JSON.stringify(updatedFormData));

    };

    const toggleDropdown = (index) => {
        setInputFields(prevState => {
            const updatedFields = [...prevState];
            updatedFields[index].isDropdownOpen = !updatedFields[index].isDropdownOpen;
            return updatedFields;
        });
    };

    // 
    const handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        setInputFields(prevState => {
            const updatedFields = [...prevState];
            updatedFields[index].cityInput = value;
            return updatedFields;
        });
    };

    /***************** handle update city id **************/
    
    const swapCityData = () => {
        setSwapStatus(true);
    };

    const handleSuggestionClick = useCallback((suggestion, index) => {
        const city_name = suggestion.city_name + ', ' + suggestion.state_name;
        console.log(suggestion , 'this is to city click suggestion')
        if (index === 0) {
            setTo_city(city_name);
        }    
        setInputFields(prevState => {
            const updatedFields = [...prevState];
            updatedFields[index].cityInput = city_name;
            updatedFields[index].cityId = suggestion._id;
            return updatedFields;
        });
        const city = inputFields.map(city => ({ cityInput: city.cityInput , cityId:city.cityId }));
        // addCityId(suggestion._id)
        HandleStateData({ travel_routes: city });
        toggleDropdown(index);
    }, [inputFields, HandleStateData]);

    // handle submit handle tab
    const CabSearchSubmit = (e) => {
        e.preventDefault();
        if (formData.from_city.length < 1) {
            setMessage({
                status: false,
                message: `Please select valid city`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            // Return a cleanup function to clear the timeout when the component unmount
            return () => clearTimeout(timer);
        }
        if (formData.pickup_date.length < 1) {
            setMessage({
                status: false,
                message: `Please select the valid date`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            // Return a cleanup function to clear the timeout when the component unmount
            return () => clearTimeout(timer);
        }
        if (formData.drop_date < 1) {
            setMessage({
                status: false,
                message: `Please select the valid date`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                setStatus(false);
            }, 3000);
            // Return a cleanup function to clear the timeout when the component unmount
            return () => clearTimeout(timer);
        }
        if (formData.travel_routes.length < 0) {
            setMessage({
                status: false,
                message: `Please select the drop route`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            // Return a cleanup function to clear the timeout when the component unmount
            return () => clearTimeout(timer);
        }
        // remove the old one old 
        localStorage.removeItem('cab_listing');
        // set the swap data set the swap data null here
        localStorage.setItem('cab_listing', JSON.stringify(formData));
        Navigation('/cab-listing')
    }
    // render the data
    useEffect(() => {
        // Retrieve saved form data from local storage
        const savedFormData = JSON.parse(localStorage.getItem('cab_listing')) || {};
        if (savedFormData.trip_type === tripType) {
            // Set the form data state with saved values
            setFormData(savedFormData);
            // Set the input fields with saved travel routes
            const savedInputFields = savedFormData.travel_routes.map((route) => ({
                cityInput: route.cityInput,
                cityId: route.cityId,
                isDropdownOpen: false
            }));
            setInputFields(savedInputFields);
        }
    }, [tripType]);

    useEffect(() => {
        if (swapStatus) {
            // setInputFields(prevState => {
            //     const updatedFields = prevState.map(field => ({
            //         ...field,
            //         cityInput: field.cityInput === from_city ? to_city : (field.cityInput === to_city ? from_city : field.cityInput)
            //     }));
            //     return updatedFields;
            // });
            // setSwapStatus(false);
            setInputFields(prevState => {
                // Create a copy of the previous state
                const updatedFields = [...prevState];
            
                // Find the index of the first input field
                const firstInputIndex = 0; // Index of the first field
            
                // Swap the values of the first input box with from_city and to_city
                updatedFields[firstInputIndex].cityInput = 
                    prevState[firstInputIndex].cityInput === formData.from_city 
                        ? formData.to_city 
                        : (prevState[firstInputIndex].cityInput === formData.to_city 
                            ? formData.from_city 
                            : prevState[firstInputIndex].cityInput);

                // update the id
                updatedFields[firstInputIndex].cityId = 
                prevState[firstInputIndex].cityId === formData.from_city_id 
                    ? formData.travel_routes[0].cityId 
                    : (prevState[firstInputIndex].cityId === formData.travel_routes[0].cityId 
                        ? formData.from_city_id 
                        : prevState[firstInputIndex].cityId);
                
                // Return the updated state
                return updatedFields;
            });


        
            HandleStateData({ travel_routes: inputFields , to_city:formData.from_city , from_city:formData.to_city , from_city_id:formData.to_city_id , to_city_id: formData.from_city_id });
            setSwapStatus(false);
        }
    }, [swapStatus, from_city, to_city, setInputFields, setSwapStatus]);
    
    // logs the selected date

    return (
        <Form onSubmit={(e) => CabSearchSubmit(e)}>
            <div className="d-flex mb-3 justify-content-between">
                <CitySuggestionsCMP handleFormatted={HandleStateData} tripType={tripType} />
                <div className="w10 btweenimg" onClick={(e) => swapCityData(e)}>
                    <img src={twoway} />
                </div>
                <div className="w40 multicty flex-wrap">
                    {inputFields.map((data, index) => {
                        // const { fullName } = data;
                        return (
                            <Form.Group
                                className="position-relative cityfield"
                                controlId=""
                                key={index}
                            >
                                <Form.Label>Drop</Form.Label>
                                <LocationOnIcon />
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Drop city"
                                    onChange={(evnt) => handleChange(index, evnt)}
                                    value={data.cityInput}
                                    onClick={(e) => toggleDropdown(index)}
                                />
                                {
                                    inputFields[index].isDropdownOpen &&
                                    <DroupDwonSuggetions TargetInput={data.cityInput} trip_type={tripType} handleSuggestionClick={(suggestion) => handleSuggestionClick(suggestion, index)} />
                                }
                                <div className="cut-city">
                                    {inputFields.length !== 1 ? (
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={(e) => removeInputFields(index)}
                                        >
                                            x
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="plus">
                                    <AddOutlinedIcon onClick={addInputField} />
                                </div>
                            </Form.Group>
                        );
                    })}
                </div>
                <DatePickerInput handleFormatted={HandleStateData} setSelectedDate={setSelectedDate} tripType={tripType} setCheck={setCheck}/>
                <TimePickerInput  handleFormatted={HandleStateData} tripType={tripType} selectedDateInput={selectedDate}/>
                <ReturnDate handleFormatted={HandleStateData} selectedDate={selectedDate} tripType={tripType} check={check}/>
            </div>
            <div className="softwbtn text-center">
                <Button variant="primary" type="submit">
                    Search Cab <img src={search_icn} />
                </Button>
            </div>
        </Form>
    )
}


export default OutStandingSearchTab