import React , {useContext} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Row, Col, Button } from 'react-bootstrap';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import mobIcon from "../src/images/mob.svg";
import userIcon from "../src/images/user.svg";
import mailIcon from "../src/images/mail.svg";
import axios from 'axios';
import Config from './Config/Config';
import { AlertContext } from './Context/AlertsPopusContext';

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    mobileNumber: Yup.string()
        .matches(/^[0-9]+$/, "Mobile number must be only digits")
        .required('Mobile Number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    query: Yup.string().required('Message is required')
});

const ContactUsForm = () => {
    const {  setMessage , setStatus} = useContext(AlertContext);

    return (
        <Formik
            initialValues={{
                fullName: '',
                mobileNumber: '',
                email: '',
                subject: '',
                query: ''
            }}
            validationSchema={validationSchema}
            onSubmit={ async (values, { setSubmitting , resetForm }) => {
                try {
                    let response = await axios.post(`${Config.API_URL}/api/customer/inquiry/add_inquiry` , values);
                    if(response.data.status){
                        resetForm();
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
            {({ isSubmitting }) => (
                <Form as={BootstrapForm}>
                    <Row>
                        <Col xs={12} md={6}>
                            <BootstrapForm.Group className="mb-3 position-relative">
                                <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                                <img src={userIcon} alt="User Icon" />
                                <Field
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    placeholder="Enter your name"
                                />
                                <ErrorMessage name="fullName" component="div" className="text-danger" />
                            </BootstrapForm.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <BootstrapForm.Group className="mb-3 position-relative">
                                <BootstrapForm.Label>Mobile Number</BootstrapForm.Label>
                                <img src={mobIcon} alt="Mobile Icon" />
                                <Field
                                    type="text"
                                    name="mobileNumber"
                                    className="form-control"
                                    placeholder="Enter your mobile number"
                                    maxLength={10}
                                />
                                <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
                            </BootstrapForm.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <BootstrapForm.Group className="mb-3 position-relative">
                                <BootstrapForm.Label>Email ID</BootstrapForm.Label>
                                <img src={mailIcon} alt="Email Icon" />
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email ID"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </BootstrapForm.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <BootstrapForm.Group className="mb-3 position-relative">
                                <BootstrapForm.Label>Subject</BootstrapForm.Label>
                                <Field
                                    type="text"
                                    name="subject"
                                    className="form-control"
                                    placeholder="Enter the subject"
                                />
                                <ErrorMessage name="subject" component="div" className="text-danger" />
                            </BootstrapForm.Group>
                        </Col>
                        <Col xs={12} md={12}>
                            <BootstrapForm.Group className="mb-3">
                                <BootstrapForm.Label>Example textarea</BootstrapForm.Label>
                                <Field
                                    as="textarea"
                                    name="query"
                                    className="form-control"
                                    placeholder="Your message"
                                    rows={5}
                                />
                                <ErrorMessage name="query" component="div" className="text-danger" />
                            </BootstrapForm.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        Submit <ArrowForwardIcon />
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactUsForm;
