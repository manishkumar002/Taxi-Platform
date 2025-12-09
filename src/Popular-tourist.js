import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Config from "./Config/Config";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Popular_tourist = ({ tab_records_data, Tabs_data, PopularCity, popularData }) => {
    const [cities_values, set_cities] = useState([]);
    let Location = useLocation()

    // here called the all common city list api for values
    const Handle_city_values = async () => {
        try {
            const response = await axios.post(`${Config.API_URL}/api/customer/cms/popular_city`);
            if (response.data.status) {
                set_cities(response.data.data);
            } else {
                set_cities([]);
            }
        } catch (error) {
            set_cities([]);
        }
    }

    useEffect(() => {
        Handle_city_values();
    }, [])

    useEffect(() => {
        if (Object.entries(popularData).length <= 0 && cities_values.length > 0) {
            const slug = Location.pathname.slice(1);
            const result = cities_values.find(cityObj => cityObj.page_slug === slug);
            if (result) {
                PopularCity(result);
                tab_records_data(result);
            }
        }
    }, [Location.pathname, popularData, cities_values]); 

    const HandleClick = useCallback((data) => {
        tab_records_data({});
        Tabs_data([])
        PopularCity(data)
        // tab_records_data(data)
    }, [Tabs_data, tab_records_data, PopularCity])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Location.pathname]);

    return (
        <>
            <div className="row pb-4 m0 pop_tourist">
                <div className="cardlike">
                    <h5>Popular Tourist Place</h5>
                    <div className="d-flex tourstplc_wrp">
                        {
                            cities_values.length > 0 &&
                            cities_values.map((items, index) => {
                                return (
                                    <div key={index} className="tourpbox">
                                        <Link to={`/${items.page_slug}`} > <img onClick={(e) => HandleClick(items)} src={`${Config.IMG}${items.city_image_jpeg}`} /></Link>
                                        <h6>{items.popular_city_name}</h6>
                                    </div>
                                )
                            })
                        }
                        {/* <div className="tourpbox">
                            <img src={ti1}/>
                            <h6>Jaipur</h6>
                        </div>
                        <div className="tourpbox">
                            <img src={ti1}/>
                            <h6>Rajkot</h6>
                        </div>
                        <div className="tourpbox">
                            <img src={ti1}/>
                            <h6>Vadodara</h6>
                        </div>
                        <div className="tourpbox">
                            <img src={ti1}/>
                            <h6>Porbandar</h6>
                        </div>
                        <div className="tourpbox">
                            <img src={ti1}/>
                            <h6>Mandvi</h6>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Popular_tourist;
