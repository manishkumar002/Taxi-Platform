import React, { useCallback, useState , useContext , useEffect  } from "react";
import { Form } from "react-bootstrap";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import Config from "../../Config/Config";
import { Dropdown } from "react-bootstrap";
import { SwapCityContext } from "../../Context/SwapContext";


const OneWayCitySuggetion = ({ handleFormatted, tripType , formData }) => {

    const {to_city , setTo_city , from_city , setFrom_city , swapStatus , setSwapStatus} = useContext(SwapCityContext);


    /************************* local storage data *****************************/
    let GetLocalDb = JSON.parse(localStorage.getItem('cab_listing')) || {};

    // set the drop down check the status
    let defaultState = GetLocalDb.trip_type === tripType ? GetLocalDb.to_city : '';
    const [DropdownStatus , setDropDownStatus] = useState(false);

    /************************* Start Of Search City input Fields  *****************************/
    const [cityInputValue, setCityInputValue] = useState( defaultState );
    const [fromCityId, setFromCityId] = useState('');
    const [dbList, setDbList] = useState([]);
    const [from_state_name , setState_name] = useState('')
    const [from_state_id , set_from_state_id] = useState('');
    let timer;

    // Fetch live Records From Db
    const gatherMatchRecords = (trip_type, value) => {

        // PayLoads
        const Payloads = {
            "keyword":`${value}`,
            "page_no":"1",
            "records_per_page":"10",
            "trip_type":`${trip_type}`
        }
        axios.post(`${Config.API_URL}/api/customer/citylist`, JSON.parse(JSON.stringify(Payloads)) , {
            headers:{
                'Authorization':`${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((respData) =>{
                if(respData.data.status){
                    setDbList(respData.data.data);
                }else{
                    setDbList([])
                }
            })
            .catch((error) => {
                setDbList([]);
            });
    };

    const handleCityInputChange = useCallback((e) => {
        const value = e.target.value;
        setCityInputValue(value);
        setDropDownStatus(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
            gatherMatchRecords(tripType, value);
            setFromCityId('');
        }, 300);
    });

    const handleSuggestionClick = useCallback((suggestion) => {
        let city_name = suggestion.city_name + ', ' + suggestion.state_name;
        setFromCityId(suggestion._id);
        setTo_city(city_name);
        setCityInputValue(city_name)
        setState_name(suggestion.state_name)
        set_from_state_id(suggestion.state_id)
        setDbList([]);
        handleFormatted({ 'to_city': city_name, 'to_city_id': suggestion._id, 'to_state_id': suggestion.state_id, 'to_state_name': suggestion.state_name });
        setDropDownStatus(false);
    });

    useEffect(() => {
        if(swapStatus){
            let swapedCity = cityInputValue ===  from_city ? to_city : (cityInputValue === to_city ? from_city : cityInputValue)
            setCityInputValue( swapedCity );
            handleFormatted({
                'to_city': formData.from_city,
                'to_city_id': formData.from_city_id,
                'to_state_id': formData.from_state_id,
                'to_state_name': formData.from_state_name,
                'from_city': formData.to_city,
                'from_city_id': formData.to_city_id,
                'from_state_id': formData.to_state_id,
                'from_state_name': formData.to_state_name
            });
            setSwapStatus(false);
        }
    }, [swapStatus , from_city , to_city , handleFormatted , setSwapStatus])
     
    
    return (
        <>
            <Form.Group className="w20 position-relative" controlId="">
                <Form.Label>Drop</Form.Label>
                <LocationOnIcon />
                <Form.Control
                    type="text"
                    placeholder="Enter the pickup place"
                    onChange={(e) => handleCityInputChange(e)}
                    value={cityInputValue}
                />
                {
                    DropdownStatus && 
                    <Dropdown className="position-absolute suggetionsDropDown">
                    {
                        dbList.length > 0 &&
                        dbList.map((value) => {
                            return <>
                                <Dropdown.Item key={value._id} onClick={() => handleSuggestionClick(value)}>{value.city_name} , {value.state_name}</Dropdown.Item>
                                <hr></hr>
                            </>
                        })
                    }
                    </Dropdown>
                } 
            </Form.Group>
        </>
    )
}

export default OneWayCitySuggetion; 