import React, { useState, useEffect } from "react";
import Bookingbox from "./Booking-box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Config from "../Config/Config";
import { BeatLoader } from 'react-spinners'
import AlertPopupMessage from "../ErrorPopus/AlertPopus";

const My_bookings = () => {
    const [pageNation, setPagination] = useState(1);
    const LoginUsers = JSON.parse(localStorage.getItem("AccessLogin")) || {};
    const [PageRecords , setPageRecords] = useState(1);
    const [ApiResponse, setResponse] = useState([]);
    const [statusResponse, setStatusResponse] = useState(false);
    const [BookingStatus , setBookingStatus] = useState(false);

    const BookingDetailsApi = () => {
        let pageRecords = 6;
        let Paylods = {
            "user_id": `${LoginUsers._id}`,
            "page_no": `${pageNation === 0 ? 1 : pageNation}`,
            "per_page_records": `${pageRecords}`
        }
        setStatusResponse(true);
        axios 
            .post(
                `${Config.API_URL}/api/customer/booking/list`,
                Paylods,
                {
                    headers: {
                        Authorization: `${Config.API_ACCESS_TOKEN}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.status) {
                    setStatusResponse(false);
                    setResponse(response.data.data);
                    console.log(response.data.ToTal_Records);
                    setPageRecords(response.data.ToTal_Records / pageRecords );
                } else {
                    setResponse([]);
                    setStatusResponse(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setResponse([]);
            });
    };

    useEffect(() => {
        if (pageNation > 1) {
            // then called the Pagination API others wise
            BookingDetailsApi();
            setBookingStatus(false);
        } else {
            BookingDetailsApi();
            setBookingStatus(false);
        }
    }, [pageNation , BookingStatus]);



    return (
        <>
            <AlertPopupMessage />
            <div className="wd_dashcontent" style={{ width: "80%" }}>
                <div className="container bookingpg">
                    <div className="row">
                        <h3>My Booking</h3>
                    </div>
                    <div className="row bookngwrpr">
                        {
                            statusResponse ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <BeatLoader color="#185dcc" />
                                </div> :
                                ApiResponse.length === 0 ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                        <p>No more Booking available</p>
                                    </div> :
                                    ApiResponse.map((value , index) => {
                                        console.log(value)
                                        return (
                                            <Bookingbox key={index} data={value} BookingStatus={setBookingStatus}/>
                                        );
                                    })
                        }
                    </div>
                </div>
                {
                    ApiResponse.length >= 0
                    && <div className="pagination_design">
                        <Stack spacing={2}>
                            <Pagination count={Math.ceil(PageRecords)} variant="outlined" color="primary" onChange={(event  , value) => {
                                setPagination(value)
                            }} />
                        </Stack>
                    </div>
                }
            </div>
        </>
    );
};
export default My_bookings;
