import React, { useState, useEffect } from "react";
import s1 from "../src/images/s1.png";
import s2 from "../src/images/s2.png";

import Home_testimonial from './Home-testimonial';
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Connect from './Connect';
import axios from "axios";
import Config from "./Config/Config";

const Services = () => {
    const [service_list, setServiceList] = useState([]);
    const servicesListApi = async () => {
        try {
            let response = await axios.get(`${Config.API_URL}/api/customer/service/list`);
            if (response.data.status) {
                setServiceList(response.data.data);
            } else {
                setServiceList([])
            }
        } catch (error) {
            console.log(error.message);
            setServiceList([]);

        }
    }

    useEffect(() => {
        servicesListApi();
    }, [])

    // handle the scroll bar position here
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            <div className="container">
                <div className="row services_row pt-5">
                    <h4>Our services</h4>
                    {/* <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s1} />
                            <h5>Outstation Cabs</h5>
                        </div>
                    </div> */}
                    {
                        service_list.length > 0
                        && service_list.map((items, index) => {
                            return (
                                <>
                                    <div className="col-sm-4">
                                        <a href={`${items.page_link}`} target="_blank" rel="noopener noreferrer">
                                            <div className="servbox">
                                                <img src={`${Config.IMG}${items.image_url}`} alt={`${items.image_alt}`} />
                                                <h5>{items.title}</h5>
                                            </div>
                                        </a>
                                    </div>

                                </>
                            )
                        })
                    }
                    {/* <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s2} />
                            <h5>Roundtrip Cabs</h5>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s1} />
                            <h5>Airport Taxi</h5>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s2} />
                            <h5>Local Cabs</h5>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s1} />
                            <h5>Oneway Cabs</h5>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="servbox">
                            <img src={s2} />
                            <h5>Multicity Cabs</h5>
                        </div>
                    </div> */}

                </div>
            </div>
            <Connect />
            <Home_testimonial />

            <Pop_routes />

            <Footer />
        </>
    )
}


export default Services;
