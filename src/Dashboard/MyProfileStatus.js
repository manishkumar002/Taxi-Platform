import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const MyProfileStatus = ({data}) => {
  return (
    <>
      <Container className="API_Response_Status">
        <Row>
          <Col>{data}</Col>
        </Row>
      </Container>
    </>
  );
};

export default MyProfileStatus
