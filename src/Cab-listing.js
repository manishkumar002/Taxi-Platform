import React, { useState } from "react";
import clk from "../src/images/clk.png";
import { useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import Footer from "./Footer";
import Pop_routes from "./Popular-routes";
import Cab_box from "./Cab-box";
import Side_fare_sum from "./Side-faresum";
import Pickupdrop from "./Pickup-drop";
import { Row , Col , Container} from "react-bootstrap";
import axios from "axios";
import Config from "./Config/Config";
import moment from "moment";
import AlertPopupMessage from "./ErrorPopus/AlertPopus";
import { BeatLoader , PropagateLoader } from 'react-spinners'


const Cab_listing = () => {
    // called the db data from the payLoads now
    const CabListingData = JSON.parse(localStorage.getItem("cab_listing")) || {};
    const [ApiResponse, setApiResponse] = useState([]);
    const [checkSpinnerStatus, setSpinner] = useState(false);

    // check the travel root data for the now
    let travelRoot =
        CabListingData.trip_type === "outstation" &&
            CabListingData.hasOwnProperty("travel_routes")
            ? CabListingData.travel_routes
            : [{ city: '' }];
    let stringTravelRoot = travelRoot.reduce((acc, values) => {
        if (acc === '') {
            return acc += values.cityInput
        }
        return acc += "|" + values.cityInput
    }, '')

    const pichup_date = moment(CabListingData.pickup_date);
    const drop_Date = moment(CabListingData.drop_date);
    const GetCabList = () => {
        const Payloads = {
            user_id: "",
            trip_type: CabListingData.trip_type,
            from_city_id: CabListingData.from_city_id,
            to_city_id: CabListingData.to_city_id,
            to_city:CabListingData.to_city,
            package_name:
                CabListingData.trip_type === "local" &&
                    CabListingData.hasOwnProperty("package")
                    ? CabListingData.package
                    : "",
            pickup_date: pichup_date.format("DD-MMMM-YYYY"),
            pickup_time: CabListingData.pickup_time,
            travel_route: CabListingData.from_city + '|' + stringTravelRoot,
            drop_date: drop_Date.format("DD-MMMM-YYYY"),
            drop_time: "",
            page_no: "1",
            records_per_page: "10",
        };
        setSpinner(true);
        axios
            .post(`${Config.API_URL}/api/customer/booking/searchcab`, Payloads)
            .then((response) => {
                console.log(response)
                if (response.data.status) {
                    setApiResponse(response.data.data);
                    setSpinner(false);
                } else {
                    setApiResponse([]);
                    setSpinner(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setSpinner(false);
                setApiResponse([]);
            });
    };

    useEffect(() => {
        // called the api here
        GetCabList();
    }, []);

    // add the scroll bar on top the page reloads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    

    return (
        <>
            <AlertPopupMessage />
            <div className="container">
                <div className="row">
                    <div className="col-sm-8">
                        <div className="cab-book-loctn py-4">
                            <h4>
                                {CabListingData.from_city} India <span>{
                                    checkSpinnerStatus ?
                                        <BeatLoader color="#185dcc" /> :
                                        ApiResponse.length > 0 ? ApiResponse.length : 0
                                } cars available</span>
                            </h4>
                            <div className="cab-loct-info d-flex justify-content-between">
                                <h6>
                                    {" "}
                                    <img src={clk} /> In 24 hours, 20 customers booked the car
                                    from this location
                                </h6>
                                <ClearIcon />
                            </div>
                        </div>
                        <div className="row">
                            {
                                checkSpinnerStatus ?
                               <Container>
                                   <Col className="d-flex align-items-center justify-content-center mt-5">
                                       <PropagateLoader size={24} color="#185dcc" />
                                   </Col>
                               </Container> : 
                                ApiResponse.length <= 0 ? (
                                    <h3>Not cab available on this route</h3>
                                ) : (
                                    ApiResponse.map((value, index) => {
                                        return (
                                            <>
                                                <div key={index} className="col-sm-4">
                                                    <Cab_box values={value} vahicleList={value.vehicle_details} fairList={value.fare_details} />
                                                </div>
                                            </>
                                        );
                                    })
                                )
                            }
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <Pickupdrop />
                        {/* <Side_fare_sum /> */}
                    </div>
                </div>
            </div>
            <Pop_routes />

            <Footer />
        </>
    );
};

export default Cab_listing;
