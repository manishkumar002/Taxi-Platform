import React from "react";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InquiryForm from "./InqueryForm/Inquery_form";

const Side_quick = () => {
    return (
        <>

            <div className="quikform">
                <h5>Quick Enquiry</h5>
                <Row>
                    {/* <Col xs={12} md={12}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={12}>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter your mobile number" />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={12}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your query</Form.Label>
                            <Form.Control as="textarea" placeholder="Your message" rows={5} />
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={12}>
                        <Button className="sitebtn" type="submit">
                            Submit
                        </Button>
                    </Col> */}
                    <InquiryForm />
                </Row>
            </div>

            <div className="twobtnswrp">
                <a href="tel:+91-9054865866" className="ylwbtn">Call @+91-9054865866</a>
                <a href="tel:+91-9054865866" className="wtspbtn"><WhatsAppIcon/> Whatsapp</a>
            </div>
        </>
    )
}
export default Side_quick;
