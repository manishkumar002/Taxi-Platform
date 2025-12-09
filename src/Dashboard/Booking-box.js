import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import Config from '.././Config/Config';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { AlertContext } from "../Context/AlertsPopusContext";
import { BeatLoader } from 'react-spinners'


const Bookingbox = ({ data, BookingStatus }) => {
    const [show, setShow] = useState(false);
    let LoginUsers = JSON.parse(localStorage.getItem('AccessLogin')) ?? {};
    const [ShowRate, setShowRate] = useState(false);
    const { setMessage, setStatus } = useContext(AlertContext);

    const handleReteClose = () => setShowRate(false);
    const handleRateOpen = () => setShowRate(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [CancelListAPI, setCancelListApi] = useState([]);
    const [Term_name, setTerm_name] = useState('');
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const [lebelvalue, setLable] = useState('');
    const [snniper, setSnniper] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isFeedbackValid, setIsFeedbackValid] = useState(false);

    // handle the feedback validation here
    const handleFeedbackChange = (e) => {
        const value = e.target.value;
        setFeedback(value);
        setIsFeedbackValid(value.length >= 15);
    };
    
    // handle rate Api called here

    const SumbitRatingAPICalled = async (e) => {
        const level = {
            0.5: 'Useless',
            1: 'Useless+',
            1.5: 'Poor',
            2: 'Poor+',
            2.5: 'Ok',
            3: 'Ok+',
            3.5: 'Good',
            4: 'Good+',
            4.5: 'Excellent',
            5: 'Excellent+',
        };
        setSnniper(true)
        let Rating = level[value];
        let Paylods = {
            "booking_doc_id": `${data._id}`,
            "remark": `${Rating}`,
            "ratings": `${value}`,
            "description":feedback,
        }
        try {
            let response = await axios.post(`${Config.API_URL}/api/customer/booking/submit_rating`, Paylods, {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            })
            // console.log(response.data , 'this is response data');
            if (response.data.status) {
                // console.log(response.data , 'this is success messages');
                setFeedback('');
                setSnniper(false)
                setShowRate(false);
                setMessage({
                    status: true,
                    message: `Thanks for You review`
                })
                setStatus(true);
                let timer = setTimeout(() => {
                    setStatus(false);
                }, 3000)
                return () => clearTimeout(timer);
            } else {
                setSnniper(false)
                setShowRate(false);
            }
        } catch (error) {
            setSnniper(false)
            setShowRate(false);
            setMessage({
                status: false,
                message: `${error.message}`
            })
            setStatus(true);
            let timer = setTimeout(() => {
                setStatus(false);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }

    // called the Cancel terms Api 
    const CancelTermAPI = async () => {

        try {
            let response = await axios.get(`${Config.API_URL}/api/customer/terms/list`, {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            });
            if (response.data.status) {
                setCancelListApi(response.data.data);
            } else {
                setCancelListApi([]);
            }
        } catch (error) {
            console.log(error);
            setCancelListApi([]);
        }

    }


    // called the Cancel Booking API 
    const CancelBookApi = async (e) => {
        e.preventDefault();
        setSnniper(true)
        let Payloads = {
            "_id": `${data._id}`,
            "cancel_reason": `${Term_name}`
        }
        try {
            let response = await axios.post(`${Config.API_URL}/api/customer/booking/cancel`, Payloads, {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            })
            if (response.data.status) {
                let Payloads = {
                    Booking_id:data.booking_id
                }
                axios.post(`${Config.API_URL}/api/customer/CancelEmail` , Payloads)
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
                setSnniper(true)
                BookingStatus(true)
                setShow(false)
            } else {
                setSnniper(true)
                BookingStatus(true)
            }
        } catch (error) {
            console.log(error)
            setSnniper(true)
            BookingStatus(true)
        }
    }

    const labels = {
        0.5: 'Useless',
        1: 'Useless+',
        1.5: 'Poor',
        2: 'Poor+',
        2.5: 'Ok',
        3: 'Ok+',
        3.5: 'Good',
        4: 'Good+',
        4.5: 'Excellent',
        5: 'Excellent+',
    };

    function getLabelText(value) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }


    useEffect(() => {
        CancelTermAPI();
    }, [])


    return (
        <>
            <div className="col-sm-6">
                <div className="bookingbox">
                    <div className="d-flex">
                        <p className="bookid">Booking ID: {data.booking_id}</p>
                        <p className="bookid">Booking Status: {data.booking_status}</p>
                    </div>
                    <div className="bkngloc">
                        <p>{data.travel_route}</p>
                    </div>
                    <div className="bookftrs d-flex justify-content-between">
                        <div className="booktexts">
                            <span>Trip Type</span>
                            <p>{data.trip_type}</p>
                        </div>
                        <div className="booktexts">
                            <span>Pickup Date & Time</span>
                            <p>{data.pickup_date}</p>
                        </div>
                        <div className="booktexts">
                            <span>Vehicle</span>
                            <p>{data.vehicle_category}</p>
                        </div>
                    </div>
                    <div className="bookbtns d-flex justify-content-around">
                        <Link to={`/dashboard/view-booking/${data._id}`} className="lgyellow">View</Link>
                        {/* <a href="" className="lggrn">Invoice</a> */}
                        {
                            (data.booking_status === 'Approved' || data.booking_status === 'Completed') &&
                            <Link className="lggrn" to={`/Booking/invoice/${data.booking_id}`}>Invoice</Link>
                        }
                        {
                            data.booking_status === 'Completed' ?
                                <Link className="lgyellow" onClick={handleRateOpen}>Rate Us</Link>
                                :
                                ""
                        }
                        {
                            (data.booking_status === 'Cancelled') || (data.booking_status === 'Completed' || data.booking_status === 'Approved') ?
                                // <Link className="lgyellow" disabled>Cancel</Link> ""
                                ""
                                :
                                <Link className="lgyellow" type="button" onClick={handleShow}>Cancel</Link>
                        }
                    </div>
                </div>

                {/* cancel models here  */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Booking Cancel Reason</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                // enter the Option here to render image
                                options={CancelListAPI}
                                autoHighlight
                                getOptionLabel={(option) => option.term_name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {
                                            option.term_name
                                        }
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Booking Cancel Reason"
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                    />
                                )}
                                onChange={(event, value) => {
                                    console.log(value.term_name);
                                    setTerm_name(value.term_name);
                                }}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Exit
                        </Button>
                        {
                            snniper ?
                                <Button variant="primary" type="button" >
                                    <BeatLoader color="#185dcc" />
                                </Button>
                                :
                                <Button variant="primary" type="submit" onClick={(e) => CancelBookApi(e)}>
                                    Booking Cancel
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
                {/* handle Rating models */}
                <Modal show={ShowRate} onHide={handleReteClose}>
                    <Modal.Header closeButton >
                        <Modal.Title>Rate Us</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Box
                                sx={{
                                    width: "100%",
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Rating
                                    name="hover-feedback"
                                    size="large"
                                    value={value}
                                    precision={0.5}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                            </Box>
                            <FloatingLabel controlId="floatingTextarea2" label="Feedback">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                />
                            </FloatingLabel>
                            {feedback.length < 15 && (
                                <p className="text-danger mt-2">Feedback must be at least 15 characters.</p>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            snniper ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
                                    <BeatLoader color="#185dcc" />
                                </div> :
                                <Button variant="primary" disabled={!isFeedbackValid}
                                type="submit" onClick={(e) => SumbitRatingAPICalled(e)}>
                                    Submit Rating
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
export default Bookingbox;