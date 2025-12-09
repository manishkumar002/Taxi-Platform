import React, { useState, useCallback, useContext, useEffect } from "react";
import axios from "axios";
import Config from "../Config/Config";
import FormData from 'form-data'
import ri1 from "../images/ri1.svg";
import ri2 from "../images/ri2.svg";
import ri3 from "../images/ri3.svg";
import Dropdown from 'react-bootstrap/Dropdown';
import { AlertContext } from "../Context/AlertsPopusContext";


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import AlertPopupMessage from "../ErrorPopus/AlertPopus";
import WelcomeModal from "./WelcomePopus";


const My_profile = () => {
    const { message, setMessage, status, setStatus } = useContext(AlertContext);
    const getLocalStorageData = JSON.parse(localStorage.getItem('AccessLogin')) || {};

    const [file, setFile] = useState(getLocalStorageData.profile_image);
    const [full_name, setfullName] = useState(getLocalStorageData.full_name);
    const [mobile_no, setMobileNUmber] = useState(getLocalStorageData.mobile_no);
    const [email_id, setEmailId] = useState(getLocalStorageData.email_id);
    const [city_name, setCityName] = useState(getLocalStorageData.city_name);
    const [gender, setGender] = useState(getLocalStorageData.gender);
    const [state, setState] = useState(getLocalStorageData.state_name);
    const [pincode, setPincode] = useState(getLocalStorageData.pincode)
    const [Company_name, setCompanyName] = useState(getLocalStorageData.company_name);
    const [Company_pan_number, setCompany_pan_number] = useState(getLocalStorageData.company_pan_number);
    const [address, setAddress] = useState(getLocalStorageData.customer_full_address);
    const [GSTIN, setGSTIN] = useState(getLocalStorageData.gstin_number);
    const [Company_Address, setCompanyAddress] = useState(getLocalStorageData.company_address);
    const [company_city, set_company_city] = useState(getLocalStorageData.company_city);
    const [company_state, set_company_state] = useState(getLocalStorageData.company_state);
    const [handleCityDataAPI, setAPICityDAta] = useState([]);
    const [clickEventStatus, setClickEventStatus] = useState(false);
    const [city_id, setCityId] = useState();
    const [state_id, setStateId] = useState();
    const [ReferralCode, setReferalCode] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    // handle the validate the file 

    const handleChange = useCallback((e) => {
        const FileData = new FormData()
        const filename = e.target.files[0];
        FileData.append('file', filename);
        console.log(filename.type , 'this is file name');
        if(!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(filename.type)){
            setMessage({
                status: false,
                message: 'choose only png,jpg,jpeg formate'
            })
            setStatus(true);
            const timer = setTimeout(() => {
                setStatus(false);
            }, 3000);
            return () => clearTimeout(timer);
        }

        FileData.append("_id", getLocalStorageData._id);
        axios.post(`${Config.API_URL}/api/customer/upload_profile_image`, FileData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `${Config.API_ACCESS_TOKEN}`
            },

        })
            .then((response) => {
                if (response.data.status) {
                    setFile(response.data.data)
                    setMessage({
                        status: true,
                        message: `Profile image Uploaded successfully`
                    })
                    setStatus(true);
                    const timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                }
                setMessage({
                    status: false,
                    message: response.data.message
                })
                setStatus(true);
                const timer = setTimeout(() => {
                    setStatus(false);
                }, 3000);
                return () => clearTimeout(timer);

            })
            .catch((err) => {
                if (err.code === 'ERR_BAD_RESPONSE') {
                    setMessage({
                        status: false,
                        message: 'choose only png,jpg,jpeg formate'
                    })
                    setStatus(true);
                    const timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                }

            })
    });

    // called the City Data in the API's
    const CityAPICalled = (value) => {
        let Payloads = {
            "keyword": `${value}`,
            "page_no": "1",
            "records_per_page": "10",
            "trip_type": "all"
        }
        // called the APIs
        axios.post(`${Config.API_URL}/api/customer/citylist`, JSON.parse(JSON.stringify(Payloads)), {
            headers: {
                'Authorization': `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                if (response.data.status) {
                    setAPICityDAta(response.data.data);
                } else {
                    setAPICityDAta([]);
                }
            })
            .catch((err) => {
                setAPICityDAta([]);
            })
    }

    // handle city data By city apis
    const GetCityDataByTheAPI = useCallback((e) => {
        const value = e.target.value;
        CityAPICalled(value)
        setCityName(e.target.value)
        setClickEventStatus(true);
    })

    const DropDownItemsAPI = (values) => {
        setCityName(`${values.city_name},${values.state_name}`);
        setCityId(values._id);
        setStateId(values.state_id);
        setState(values.state_name);
        set_company_city(values.city_name);
        set_company_state(values.state_name)
        setClickEventStatus(false);
    }

    // handle the summit event to update the Users Data
    const HandleSubmitToUpdateUsers = (e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_id)) {
            setMessage({
                status: false,
                message: `Please Enter the Valid Email`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (mobile_no.length !== 10) {
            setMessage({
                status: false,
                message: `Please Enter the Valid mobile Number`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (city_name.length < 2) {
            setMessage({
                status: false,
                message: `Please Enter the Valid city Name`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                console.log('Set timeout is running here');
                setStatus(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        if (!['Male', 'Female', 'Others'].includes(gender)) {
            setMessage({
                status: false,
                message: `Please Enter the Valid Gender`
            })
            setStatus(true);
            const timer = setTimeout(() => {
                setStatus(false);
            }, 3000);
            return () => clearTimeout(timer);
        }

        let Payloads = {
            _id: getLocalStorageData._id,
            city_id,
            state_id,
            file,
            full_name,
            mobile_no,
            email_id,
            address,
            gender,
            city_name,
            Company_name,
            Company_Address,
            GSTIN,
            Company_pan_number,
            pincode,
            company_city,
            company_state,
            referral_by: ReferralCode
        }
        // make a post Request to edit profile of users Data
        axios.post(`${Config.API_URL}/api/customer/updateprofile`, JSON.parse(JSON.stringify(Payloads)), {
            headers: {
                'Authorization': `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.status) {
                    localStorage.removeItem('AccessLogin');
                    let resData = response.data.data;
                    localStorage.setItem('AccessLogin', JSON.stringify(resData));
                    setMessage({
                        status: true,
                        message: `${response.data.message}`
                    })
                    setStatus(true);
                    const timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                } else {
                    setMessage({
                        status: false,
                        message: `${response.data.message}`
                    })
                    setStatus(true);
                    const timer = setTimeout(() => {
                        setStatus(false);
                    }, 3000);
                    return () => clearTimeout(timer);
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <AlertPopupMessage />
            <WelcomeModal />
            <div className="wd_dashcontent w-75">
                <div className="container myprofilepage py-5">
                    <div className="row">
                        <h3>My Profile</h3>
                    </div>
                    <div className="row profile_form">
                        <div className="col-sm-2">
                            <div className="uplodpic">
                                <div className="imgprw">
                                    <img src={!file ? getLocalStorageData.profile_image : file} />
                                </div>
                                <input type="file" onChange={handleChange} className="upldpic" required />
                                <label>Upload Profile Pic</label>
                            </div>
                        </div>
                        <div className="col-sm-10">
                            <Form onSubmit={HandleSubmitToUpdateUsers}>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Full Name</Form.Label>
                                            <img src={ri1} />
                                            <Form.Control type="text" placeholder="Enter your name" value={full_name} onChange={(e) => setfullName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Email ID</Form.Label>
                                            <img src={ri2} />
                                            <Form.Control type="email" placeholder="Enter your email ID" value={email_id} onChange={(e) => setEmailId(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <img src={ri3} />
                                            <Form.Control type="text" placeholder="Enter your mobile number" maxLength={10} value={mobile_no} onChange={(e) => setMobileNUmber(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your city" value={city_name} onChange={GetCityDataByTheAPI} />
                                            {
                                                clickEventStatus ?
                                                    <Dropdown className="position-absolute suggestion-class">
                                                        {
                                                            handleCityDataAPI.length > 0 && handleCityDataAPI.map((value) => {
                                                                return <>
                                                                    <Dropdown.Item onClick={() => DropDownItemsAPI(value)} key={value._id}>{value.city_name},{value.state_name}</Dropdown.Item>
                                                                    <hr></hr>
                                                                </>
                                                            })
                                                        }
                                                    </Dropdown> :
                                                    null
                                            }
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>state</Form.Label>
                                            <Form.Control disabled type="text" placeholder="Enter your state" value={state} onChange={(e) => setState(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Select aria-label="Default select example" value={gender} onChange={(e) => {
                                                console.log(e.target.value);
                                                setGender(e.target.value)
                                            }}>
                                                <option> Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="">
                                            <Form.Label>Pincode</Form.Label>
                                            <Form.Control type="number" placeholder="Enter pincode" value={pincode} onChange={(e) => {
                                                const inputPincode = e.target.value;
                                                // Limit pincode length to 6 digits
                                                if (inputPincode.length <= 6) {
                                                    setPincode(inputPincode);
                                                }

                                            }} />
                                        </Form.Group>
                                    </Col>
                                    {
                                        getLocalStorageData.referral_by === '' && getLocalStorageData.referral_by.length <= 0
                                            ?
                                            <Col xs={6}>
                                                <Form.Group className="mb-3" controlId="">
                                                    <Form.Label>Referral code</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Referral code" value={ReferralCode} onChange={(e) => {
                                                        setReferalCode(e.target.value.toUpperCase())
                                                    }} />
                                                </Form.Group>
                                            </Col>
                                            : null
                                    }
                                    <Col xs={6}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control as="textarea" placeholder="Enter complete address" value={address} rows={5} onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Col xs={6}>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            label="Is Company Registered"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </Form.Group>
                                </Col>
                                {
                                    isChecked &&
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter name" value={Company_name} onChange={(e) => setCompanyName(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>Company Pan number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter pan number" maxLength={10} value={Company_pan_number} onChange={(e) => setCompany_pan_number(e.target.value.toUpperCase())} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>GSTIN</Form.Label>
                                                <Form.Control type="text" placeholder="Enter GST number" maxLength={10} value={GSTIN} onChange={(e) => setGSTIN(e.target.value.toUpperCase())} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>Company city </Form.Label>
                                                <Form.Control type="text" placeholder="company city name" value={company_city} disabled />
                                            </Form.Group>
                                        </Col>

                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="">
                                                <Form.Label>Company state</Form.Label>
                                                <Form.Control type="text" placeholder="Enter your state" value={company_state} disabled />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>Company Address</Form.Label>
                                                <Form.Control as="textarea" placeholder="Enter complete address" value={Company_Address} rows={5} onChange={(e) => setCompanyAddress(e.target.value)} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                }
                                <Button className="sitebtn" type="submit">
                                    Save
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default My_profile;
