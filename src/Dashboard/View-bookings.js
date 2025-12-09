import React , {useEffect, useState} from "react";
import logoclr from "../images/logoclr.png";
import { useParams } from "react-router-dom";
import Config from "../Config/Config";
import axios from "axios";


const View_booking = () => {
    const { id } = useParams();
    const [ApiResponse , setApiResponse] = useState({});
    const LoginUsers = JSON.parse(localStorage.getItem('AccessLogin')) ?? {};
    useEffect(() => {

        let paylods = {
            "_id":`${id}`
        }

        axios.post(`${Config.API_URL}/api/customer/booking/details` , paylods , {
            headers: {
                Authorization: `${Config.API_ACCESS_TOKEN}`
            }
        })
        .then((response) => {
            console.log(response.data)
            if(response.data.status){
                setApiResponse(response.data.data)
            }else{
                setApiResponse([])
            }
        })
        .catch(err => {
            console.log(err);
            setApiResponse([])
        })
    } , [])

    return (
        <>
            <div className="wd_dashcontent">
                <div className="container bookingpg">
                    <div className="row">
                        <h3>My Booking</h3>
                    </div>
                    <div className="row bookngview">
                        <div className="boknghdr">
                            <img src={logoclr} />
                            <p className="bookid">Booking ID - {ApiResponse.booking_id}</p>
                        </div>
                        <div className="bkngloc">
                            <p>{ApiResponse.from_city} {">"} {ApiResponse.travel_route}</p>
                        </div>
                        <div className="vwbkng_dtls">
                            <div className="vbkngrow">
                                <p>Pick up from: <span>{ApiResponse.from_city}</span></p>
                                <p>Drop To: <span>{ApiResponse.travel_route}</span></p>
                                <p>Trip Type: <span>{ApiResponse.trip_type}</span></p>
                                <p>Pick up Date: <span>{ApiResponse.pickup_date}</span></p>
                                <p>Drop Date: <span>{ApiResponse.drop_date}</span></p>
                            </div>
                            <div className="vbkngrow">
                                <p>Customer Name: <span>{ApiResponse.user_name}</span></p>
                                <p>Email ID: <span>{ApiResponse.user_email}</span></p>
                                <p>Company: <span>{LoginUsers.company_name ? LoginUsers.company_name : 'N/A'}</span></p>
                                <p>Mobile number: <span>{ApiResponse.user_mobile}</span></p>
                                <p>Flight number: <span>-</span></p>
                                <p>GSTID: <span>{LoginUsers.gstin_number ? LoginUsers.gstin_number : 'N/A'}</span></p>
                            </div>
                            <div className="vbkngrow">
                                <p>Fare / KM:<span>{ApiResponse.per_km_charge} INR</span></p>
                                <p>Estimated KM: <span>{ApiResponse.estimated_kms} KM</span></p>
                                <p>Amount:<span>{ApiResponse.total_trip_amount} INR</span></p>
                                <p>Min billable / KM: <span>{ApiResponse.fixed_kms} KM</span></p>
                                <p>Covered KM:<span>{ApiResponse.estimated_kms} KM</span></p>
                                <p>Payable Amount:<span>{ApiResponse.final_trip_amount} INR</span></p>
                            </div>
                            <div className="vbkngrow">
                                <p>Vehicle:<span>{ApiResponse.vehicle_category}</span></p>
                                <p>Vehicle no.: <span>-</span></p>
                                <p>Driver name:<span>-</span></p>
                                <p>Phone no.:<span>-</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="vwbookngbnts">
                        <a href="" className="sitebtn">Invoice</a>
                        <a href="" className="yellwbtn">Rate</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default View_booking;
