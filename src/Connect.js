import React, { useState , useContext } from "react";
import carr from "../src/images/carr.png";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import mob from "../src/images/mob.svg";
import user from "../src/images/user.svg";
import mail from "../src/images/mail.svg";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Config from "./Config/Config";
import { AlertContext } from './Context/AlertsPopusContext';



import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from "axios";


const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    mobileNumber: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    query: Yup.string().required('Message is required'),
});


const Connect = () => {
    const {  setMessage , setStatus } = useContext(AlertContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <Modal size="lg" className='loginpop querypop' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Booking Query</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fullName: '',
                            mobileNumber: '',
                            email: '',
                            subject: '',
                            query: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={ async (values, { setSubmitting , resetForm }) => {
                            try {
                                let response = await axios.post(`${Config.API_URL}/api/customer/inquiry/add_inquiry` , values);
                                if(response.data.status){
                                    resetForm();
                                    setShow(false);
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
                                console.log(error);
                            }
                        }}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Full Name</Form.Label>
                                            <img src={user} alt="User Icon" />
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                name="fullName"
                                                value={values.fullName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.fullName && errors.fullName}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <img src={mob} alt="Mobile Icon" />
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your mobile number"
                                                name="mobileNumber"
                                                value={values.mobileNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.mobileNumber && errors.mobileNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.mobileNumber}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Email ID</Form.Label>
                                            <img src={mail} alt="Mail Icon" />
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email ID"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.email && errors.email}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group className="mb-3 position-relative" controlId="">
                                            <Form.Label>Subject</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter the subject"
                                                name="subject"
                                                value={values.subject}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.subject && errors.subject}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12} md={12}>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Message</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                placeholder="Your message"
                                                rows={5}
                                                name="query"
                                                value={values.query}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.query && errors.query}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.query}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    Submit <ArrowForwardIcon />
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>



            <div className="container  pt-4 py-4">
                <div className="row connctrow">
                    <div className="col-sm-5 text-center">
                        <img src={carr} />
                    </div>
                    <div className="col-sm-7">
                        <div className="connecttxtrow d-flex">
                            <div className="connecttext">
                                <h4>Corporate Taxi Services.</h4>
                                <p>Experience why business choose Buzzway corporate taxi services.</p>
                            </div>
                            <div className="cnctbtn">
                                <Button onClick={handleShow}>Connect with us</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Connect; 