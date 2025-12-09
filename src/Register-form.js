import React, { useEffect, useState, useContext } from "react";
import ri1 from "../src/images/ri1.svg";
import ri2 from "../src/images/ri2.svg";
import ri3 from "../src/images/ri3.svg";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import Select, { components } from 'react-select';
import axios from "axios";
import Config from "./Config/Config";
import { AlertContext } from "./Context/AlertsPopusContext";

/************* yup validation schema here ************/
const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email ID is required'),
    mobileNumber: Yup.string()
        .required('Mobile Number is required')
        .matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.number()
        .required('Pincode is required')
});

// handle here the city List styling 
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#EFEFEF !important',
        borderColor: state.isFocused ? '#4CAF50' : state.isHovered ? '#80CBC4' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px #4CAF50' : 'none',
        '&:hover': {
            borderColor: '#4CAF50',
        },
    }),
    menu: (provided) => ({
        ...provided,
        borderTop: '1px solid #4CAF50',
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px solid #ddd',
        color: state.isSelected ? '#ffffff' : '#000000',
        backgroundColor: state.isSelected ? '#4CAF50' : state.isFocused ? '#80CBC4' : provided.backgroundColor,
        '&:hover': {
            backgroundColor: '#80CBC4',
            color: '#ffffff',
        },
    }),
};



const Register_form = () => {
    const { setMessage, setStatus } = useContext(AlertContext)
    const [keywords, setKeywords] = useState('');
    const [cityOptions, setCityOptions] = useState([]);
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [isMobileNumberChecked, setIsMobileNumberChecked] = useState(false);

    const customComponents = {
        Option: (props) => (
            <div>
                <components.Option {...props} />
                <hr style={{ margin: 0 }} />
            </div>
        ),
    };
    /****************** called the city list Api ******************/
    const CityListApi = async () => {
        try {
            let Payloads = {
                keyword: keywords,
                page_no: '1',
                records_per_page: '10',
                trip_type: 'all'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/citylist`, Payloads, {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            })
            if (response.data.status) {
                let cityList = response.data.data.map((items) => {
                    return {
                        value: items,
                        label: items.city_name + ", " + items.state_name
                    }
                })
                setCityOptions(cityList)
            } else {
                setCityOptions([]);
            }

        } catch (error) {
            console.log(error.message);
            setCityOptions([]);
        }
    }
    // show the city records by name;
    useEffect(() => {
        CityListApi();
    }, [keywords])

    return (
        <>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    mobileNumber: '',
                    address: '',
                    city: '',
                    city_id: '',
                    state_id: '',
                    state: '',
                    pincode: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    try {
                        let response = await axios.post(`${Config.API_URL}/api/customer/service/add_driver`, values);
                        if (response.data.status) {
                            // resetForm();
                            setMessage({
                                status: true,
                                message: response.data.message
                            })
                            setStatus(true);
                            const timer = setTimeout(() => {
                                setStatus(false);
                            }, 3000);
                            return () => clearTimeout(timer);
                        }
                    } catch (error) {
                        console.log(error.message);
                    }
                }}
            >
                {({ handleSubmit, touched, errors, setFieldValue, values, setFieldError }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3 position-relative">
                                    <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                                    <img src={ri1} alt="icon" />
                                    <Field
                                        name="fullName"
                                        type="text"
                                        placeholder="Enter your name"
                                        className={`form-control ${touched.fullName && errors.fullName ? 'is-invalid' : touched.fullName ? 'is-valid' : ''
                                            }`}
                                    />
                                    {/* <ErrorMessage name="fullName" component="div" className="invalid-feedback" /> */}
                                </BootstrapForm.Group>
                                <ErrorMessage name="fullName" component="div" className="invalid-feedback d-block" />
                            </Col>

                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3 position-relative">
                                    <BootstrapForm.Label>Email ID</BootstrapForm.Label>
                                    <img src={ri2} alt="icon" />
                                    <Field
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email ID"
                                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : touched.email ? 'is-valid' : ''
                                            }`}
                                    />
                                    
                                </BootstrapForm.Group>
                                <ErrorMessage name="email" component="div" className="invalid-feedback d-block" />
                            </Col>

                            {/* <Col xs={12}>
                                <BootstrapForm.Group className="mb-3 position-relative">
                                    <BootstrapForm.Label>Mobile Number</BootstrapForm.Label>
                                    <img src={ri3} alt="icon" />
                                    <Field
                                        name="mobileNumber"
                                        type="text"
                                        placeholder="Enter your mobile number"
                                        className={`form-control ${touched.mobileNumber && errors.mobileNumber ? 'is-invalid' : touched.mobileNumber ? 'is-valid' : ''
                                            }`}
                                        onChange={ async (e) =>{
                                            let mobileNumber = e.target.value
                                            setFieldValue('mobileNumber', mobileNumber);
                                            if(/^\d{10}$/.test(mobileNumber)){
                                                // this is payloads 
                                                let payloads = {
                                                    'mobileNumber':mobileNumber
                                                }
                                                 try {
                                                    let response = await axios.post(`${Config.API_URL}/api/customer/auth/verify_number` , payloads)
                                                    console.log(response.data , 'this is payloads response')
                                                    if(response.data.status){
                                                        setFieldError('mobileNumber' , 'Mobile number is already in use')
                                                    }
                                                 } catch (error) {
                                                    console.log(error.message);
                                                 }
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col> */}
                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3 position-relative">
                                    <BootstrapForm.Label>Mobile Number</BootstrapForm.Label>
                                    <img src={ri3} alt="icon" />
                                    <Field
                                        name="mobileNumber"
                                        type="text"
                                        placeholder="Enter your mobile number"
                                        className={`form-control ${touched.mobileNumber && (errors.mobileNumber || mobileNumberError) ? 'is-invalid' : touched.mobileNumber ? 'is-valid' : ''}`}
                                        onChange={async (e) => {
                                            const mobileNumber = e.target.value;
                                            setFieldValue('mobileNumber', mobileNumber);  // Update Formik state
                                            setMobileNumberError('');  // Reset local error state
                                            setIsMobileNumberChecked(false);
                                            if (/^\d{10}$/.test(mobileNumber)) {
                                                try {
                                                    const response = await axios.post(`${Config.API_URL}/api/customer/auth/verify_number`, { mobileNumber });
                                                    if (response.data.status) {
                                                        setFieldError('mobileNumber', 'Mobile number is already in use');
                                                        setMobileNumberError('Mobile number is already in use');
                                                    } else {
                                                        setFieldError('mobileNumber', '');
                                                        setMobileNumberError('');
                                                    }
                                                    setIsMobileNumberChecked(true);
                                                } catch (error) {
                                                    console.log(error.message);
                                                }
                                            }
                                        }}
                                        value={values.mobileNumber}  // Controlled value
                                    />
                                </BootstrapForm.Group>
                                {mobileNumberError ? <div className="invalid-feedback d-block">{mobileNumberError}</div> : <ErrorMessage name="mobileNumber" component="div" className="invalid-feedback" />}
                            </Col>

                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Address</BootstrapForm.Label>
                                    <Field
                                        name="address"
                                        as="textarea"
                                        placeholder="Your message"
                                        rows={5}
                                        className={`form-control ${touched.address && errors.address ? 'is-invalid' : touched.address ? 'is-valid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col>

                            {/* <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>City</BootstrapForm.Label>
                                    <Field
                                        name="city"
                                        type="text"
                                        placeholder="Enter your city"
                                        className={`form-control ${touched.city && errors.city ? 'is-invalid' : touched.city ? 'is-valid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col> */}
                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>City Name</BootstrapForm.Label>
                                    <Select
                                        name="city"
                                        options={cityOptions}
                                        placeholder="Select City Name"
                                        className={`react-select-container ${touched.city && errors.city ? 'is-invalid' : touched.city ? 'is-valid' : ''
                                            }`}
                                        classNamePrefix="react-select"
                                        styles={customStyles}
                                        components={customComponents}
                                        onChange={(option) => {
                                            const { city_name, state_name, _id, state_id } = option.value;
                                            setFieldValue('city', city_name);
                                            setFieldValue('state', state_name);
                                            setFieldValue('city_id', _id);
                                            setFieldValue('state_id', state_id);
                                        }}
                                        onInputChange={(value) => setKeywords(value)}
                                    />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col>

                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>State</BootstrapForm.Label>
                                    <Field
                                        name="state"
                                        type="text"
                                        value={values.state}
                                        placeholder="Enter your state"
                                        className={`form-control ${touched.state && errors.state ? 'is-invalid' : touched.state ? 'is-valid' : ''
                                            }`}
                                    />
                                    <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col>
                            {/* <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>City Name</BootstrapForm.Label>
                                    <Select
                                        name="city"
                                        options={cityOptions}
                                        className={`react-select-container ${touched.city && errors.city ? 'is-invalid' : touched.city ? 'is-valid' : ''
                                            }`}
                                        classNamePrefix="react-select"
                                        onChange={(option) => setFieldValue('city', option.value)}
                                        onInputChange={(value) => setKeywords(value)}
                                    />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col> */}


                            <Col xs={12}>
                                <BootstrapForm.Group className="mb-3">
                                    <BootstrapForm.Label>Pincode</BootstrapForm.Label>
                                    <Field
                                        name="pincode"
                                        type="number"
                                        maxLength={6}
                                        placeholder="Enter your pincode"
                                        className={`form-control ${touched.pincode && errors.pincode ? 'is-invalid' : touched.pincode ? 'is-valid' : ''
                                            }`}
                                        onChange={(e) => {
                                            const { value } = e.target;
                                            if (value.length <= 6) {
                                                setFieldValue('pincode', value);
                                            }
                                        }}
                                    />
                                    <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                                </BootstrapForm.Group>
                            </Col>
                        </Row>
                        <Button className="yellowbtn" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default Register_form;
