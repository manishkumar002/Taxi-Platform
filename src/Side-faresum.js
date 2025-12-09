import React, { useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DoneIcon from '@mui/icons-material/Done';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Side_fare_sum = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="sidefaresum my-4">
                <div className="frsum">
                    <h4>Overall fare Detail</h4>
                    <div className="d-flex justify-content-between">
                        <p>Base fare</p>
                        <p>₹6756.00</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Tax</p>
                        <p>₹376.00</p>
                    </div>
                    <div className="bt-dash d-flex justify-content-between">
                        <p>Total Amount</p>
                        <p>₹7132.00</p>
                    </div>
                    <div className="cpncode">
                        <InputGroup className="mb-3">
                            <Form.Control placeholder="Enter Code" aria-label="" aria-describedby="basic-addon2" />
                            <Button variant="outline-secondary" id="button-addon2"> Apply </Button>
                        </InputGroup>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Coupon discount</p>
                        <p>₹7132.00</p>
                    </div>
                    <div className="bt-dash d-flex justify-content-between">
                        <p><b>Total Payable Amount</b></p>
                        <p><b>₹7132.00</b></p>
                    </div>
                    <div className="sideftrs">
                        <h5>Great Choice!</h5>
                        <ul>
                            <li><DoneIcon /> Most popular in fuel efficiency.</li>
                            <li><DoneIcon /> Inclusion: Base fare, vehicle and fuel.</li>
                            <li><DoneIcon /> Exclusion: Parking and airport entry charges.</li>
                        </ul>
                    </div>
                    <div className="bookbtnrow">
                        <a href="#" className="sitebtn btngrn" onClick={handleShow}>I would like to book</a>
                    </div>
                </div>
            </div>

            <Modal size='lg' className='bookpop' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Fill in Booking Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="w80">
                        <Col xs={12}>
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your name" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="text" placeholder="Enter your mobile number" />
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6}>
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email ID" />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Pickup address</Form.Label>
                                <Form.Control type="text" placeholder="Complete address" />
                            </Form.Group>
                        </Col>
                        <Col xs={12}>
                            <Form.Group className="mb-3 position-relative d-flex align-items-center" controlId="">
                                <Form.Label className="label_psnger">Number of passengers</Form.Label>
                                <Form.Control type="text" placeholder="Enter number between 1-4" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="bglightblue mb-3">
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Referral code</Form.Label>
                                <Form.Control type="text" placeholder="Billing name" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} className="bglightblue mb-3">
                            <Form.Group className="mb-3 position-relative" controlId="">
                                <Form.Label>Flight details
                                </Form.Label>
                                <Form.Control type="text" placeholder="Enter flight number" />
                            </Form.Group>
                        </Col>
                        <p className="formtxt">By clicking ‘Make Payment’, you are confirming that you have read, understood and accepted our <a href="">Terms & Conditions</a></p>
                    </Row>
                    <Row className="w80 align-items-end mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group className="position-relative" controlId="">
                                <Form.Label>Payment Mode*
                                </Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option value="1">Full Payment</option>
                                    <option value="2">Half Payment</option>
                                    <option value="3">Cash</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Button className="paybtn" type="submit">
                                <span>₹7132.00 </span> Make Payment
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Side_fare_sum;
