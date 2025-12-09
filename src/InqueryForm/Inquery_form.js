import React , {useContext} from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Col, Button, Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import Config from '../Config/Config';
import { AlertContext } from '../Context/AlertsPopusContext';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile Number must be exactly 10 digits'),
  query: Yup.string()
    .required('Your query is required')
    .min(10, 'Query must be at least 10 characters')
    .matches(/^[a-zA-Z0-9 .,]*$/, 'Query must not contain special characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
});

const InquiryForm = () => {
  const {  setMessage , setStatus} = useContext(AlertContext);
  return (
    <Formik
      initialValues={{ fullName: '', mobileNumber: '', query: '' , email:''}}
      validationSchema={validationSchema}
      onSubmit={(values ,  { resetForm }) => {
        axios.post(`${Config.API_URL}/api/customer/inquiry/add_inquiry` , values)
        .then((response) => {
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
        })
        .catch((err) => {
          // here if we are getting the error here manges the error on Live changes data
          console.log(err.message);
        })

      }}
    >
      {({ handleSubmit, touched, errors }) => (
        <BootstrapForm onSubmit={handleSubmit}>
          <Col xs={12} md={12}>
            <BootstrapForm.Group className="mb-3" controlId="fullName">
              <BootstrapForm.Label>Full Name</BootstrapForm.Label>
              <Field
                name="fullName"
                type="text"
                placeholder="Enter your name"
                className={`form-control ${touched.fullName && !errors.fullName ? 'is-valid' : ''} ${touched.fullName && errors.fullName ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="fullName" component="div" className="text-danger" />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} md={12}>
            <BootstrapForm.Group className="mb-3" controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email address"
                className={`form-control ${touched.email && !errors.email ? 'is-valid' : ''} ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} md={12}>
            <BootstrapForm.Group className="mb-3" controlId="mobileNumber">
              <BootstrapForm.Label>Mobile Number</BootstrapForm.Label>
              <Field
                name="mobileNumber"
                type="text"
                placeholder="Enter your mobile number"
                className={`form-control ${touched.mobileNumber && !errors.mobileNumber ? 'is-valid' : ''} ${touched.mobileNumber && errors.mobileNumber ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="mobileNumber" component="div" className="text-danger" />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} md={12}>
            <BootstrapForm.Group className="mb-3" controlId="query">
              <BootstrapForm.Label>Your query</BootstrapForm.Label>
              <Field
                name="query"
                as="textarea"
                placeholder="Your message"
                rows={5}
                className={`form-control ${touched.query && !errors.query ? 'is-valid' : ''} ${touched.query && errors.query ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="query" component="div" className="text-danger" />
            </BootstrapForm.Group>
          </Col>
          <Col xs={12} md={12}>
            <Button className="sitebtn" type="submit">
              Submit
            </Button>
          </Col>
        </BootstrapForm>
      )}
    </Formik>
  );
};

export default InquiryForm;
