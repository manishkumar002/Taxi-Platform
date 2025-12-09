import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const WelcomeModal = () => {
    const [show, setShow] = useState(false);
    let LoginUsers = JSON.parse(localStorage.getItem('AccessLogin')) ?? {};

    useEffect(() => {
        if(LoginUsers.kyc_status === 'Pending'){
            setShow(true);
        }
    } , [])

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Buzzway!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img 
                            src="/logo.png"
                            alt="Buzzway Logo" 
                            style={{ width: '150px', marginBottom: '20px' }} 
                        />
                        <h4>Thank you for signing up!</h4>
                        <p>We are excited to have you on board. Start booking your rides with ease and enjoy the convenience of Buzzway Cab Booking.</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Get Started
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WelcomeModal;
