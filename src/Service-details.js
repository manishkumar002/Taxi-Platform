import React from "react";
import s3 from "../src/images/s3.png";
import si1 from "../src/images/si1.svg";
import si2 from "../src/images/si2.svg";
import si3 from "../src/images/si3.svg";

import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Quick_search from './Quick-search';
import Faqs from './Faq';
import Side_quick from './Side_quick';

const Service_details = () => {

    return (
        <>
            <div className="container">
                <div className="row services_row pt-5">
                    <h4>Airport taxi service</h4>
                    <div className="col-sm-8">
                        <div className="services_detailstxt">
                            <img src={s3} />
                            <p>Airport taxi services are typically offered to commuters who want transportation to and from airports. This services can be particularly useful for travelers who are
                                unfamiliar with the area or who don't want to deal with the hassle of driving and parking at the airport. When you use an airport taxi service, a driver will pick you up
                                from your specified location and take you directly to the airport. We also offer pickup services from the airport and transportation to your final destination.</p>

                            <p>To use an airport taxi service, you usually need to book in advance and provide information about your flight schedule and pickup location. You may also be able to book online or
                                through a mobile app.</p>
                        </div>
                        <div className="d-flex dtls_ftrs">
                            <div className="sdtl_fbx">
                                <img src={si1} />
                                <div className="sdtl_fbxtxt">
                                    <h6>Flight tracking</h6>
                                    <p>Driver tracks your flight and waits for you if it's delayed.</p>
                                </div>
                            </div>
                            <div className="sdtl_fbx">
                                <img src={si2} />
                                <div className="sdtl_fbxtxt">
                                    <h6>Booking price clarity</h6>
                                    <p>Your price is confirmed upfront – no extra costs.</p>
                                </div>
                            </div>
                            <div className="sdtl_fbx">
                                <img src={si3} />
                                <div className="sdtl_fbxtxt">
                                    <h6>Trusted cab and drivers</h6>
                                    <p>We have professional drivers and have 24/7 customer care.</p>
                                </div>
                            </div>
                        </div>
                        <Quick_search />
                        <Faqs />
                    </div>
                    <div className="col-sm-4">
                        <Side_quick />
                    </div>
                </div>
            </div>

            <Pop_routes />

            <Footer />
        </>
    )
}


export default Service_details;
