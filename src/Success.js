import React from "react";
import succs from "../src/images/succs.png";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import { Link } from "react-router-dom"; 


const Success = () => {
    const getBookingId = JSON.parse(localStorage.getItem('Booking_id')) ?? {};

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 succssbox m-auto text-center">
                        <img src={succs}/>
                        <h3>Success</h3>
                        <h6>Booking ID: {getBookingId.booking_id} </h6>
                        <Link to={`/Booking/slip/${getBookingId.booking_id}`} className="sitebtn">View Receipt</Link>
                    </div>
                </div>
            </div>
            <Pop_routes />

            <Footer />
        </>
    )
}


export default Success;
