import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Config from "./Config/Config";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";


const Service_routes = ({tab_records_data , Tabs_data}) => {

    const [tripValues, setTripValues] = useState([]);
    const Location = useLocation();

    const FetchData = async () => {
        try {
            let response = await axios.get(`${Config.API_URL}/api/customer/cms/tabs_records`)
            if (response.data.status) {
                setTripValues(response.data.data);
            } else {
                setTripValues([]);
            }
        } catch (error) {
            console.log(error.message);
            setTripValues([]);

        }
    }
    useEffect(() => {
        FetchData();
    }, [Location.pathname])

    // here handle the click data to store in render in database;
    const HandleClick = useCallback((data) => {
        const Tab_cms_data = JSON.parse(localStorage.getItem('common_cms')) || {};
         const city_routes_schema = JSON.parse(localStorage.getItem('city_routes')) || {};
        if(Object.entries(Tab_cms_data).length > 0){
            localStorage.removeItem('common_cms');
        }else {
            localStorage.removeItem('city_routes');
        }
       Tabs_data([])
       tab_records_data(data)
    } , [Location.pathname])

    const categorizedTrips = {
        outstation: [],
        airport: [],
        local: [],
        oneway: []
    };
    tripValues.forEach((item, index) => {
        if (categorizedTrips[item.trip_type]) {
            categorizedTrips[item.trip_type].push(
                <li key={index}><Link onClick={() => HandleClick(item)} to={`/${item.page_slug}`}>{item.page_name}</Link></li>
            );
        }
    });

    return (
        <>
            <div className="row py-4 servroutes">
                {['outstation', 'airport', 'local', 'oneway'].map(tripType => (
                    categorizedTrips[tripType].length > 0 && (
                        <div className="col-sm-4" key={tripType}>
                            <div className="cardlike">
                                <h6>Our {tripType} Taxi Service</h6>
                                <ul>
                                    {categorizedTrips[tripType]}
                                </ul>
                            </div>
                        </div>
                    )
                ))}


                {/* <div className="col-sm-4">
                    <div className="cardlike">
                        <h6>Our Outstation Taxi Service</h6>
                        <ul>
                            <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                            <li> <a href="">Outstation taxi service in Patan</a> </li>
                            <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                            <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                            <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                            <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                            <li> <a href="">Outstation taxi service in Surat</a> </li>
                            <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                            <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                        </ul>
                    </div>
                </div> */}
                {/* <div className="col-sm-4">
                    <div className="cardlike">
                        <h6>Our local taxi service </h6>
                        <ul>
                            <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                            <li> <a href="">Outstation taxi service in Patan</a> </li>
                            <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                            <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                            <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                            <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                            <li> <a href="">Outstation taxi service in Surat</a> </li>
                            <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                            <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                        </ul>
                    </div>
                </div>
                <div className="col-sm-4">
                <div className="cardlike">
                    <h6>Our Oneway Taxi Service </h6>
                    <ul>
                        <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                        <li> <a href="">Outstation taxi service in Patan</a> </li>
                        <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                        <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                        <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                        <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                        <li> <a href="">Outstation taxi service in Surat</a> </li>
                        <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                        <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="cardlike">
                    <h6>Airport Service From State</h6>
                    <ul>
                        <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                        <li> <a href="">Outstation taxi service in Patan</a> </li>
                        <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                        <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                        <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                        <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                        <li> <a href="">Outstation taxi service in Surat</a> </li>
                        <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                        <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="cardlike">
                    <h6>Our Roundtrip taxi service </h6>
                    <ul>
                        <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                        <li> <a href="">Outstation taxi service in Patan</a> </li>
                        <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                        <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                        <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                        <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                        <li> <a href="">Outstation taxi service in Surat</a> </li>
                        <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                        <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-4">
                <div className="cardlike">
                    <h6>Other Taxi Service</h6>
                    <ul>
                        <li> <a href="">Outstation taxi service in Ahmedabad</a> </li>
                        <li> <a href="">Outstation taxi service in Patan</a> </li>
                        <li> <a href="">Outstation taxi service in Rajkot</a> </li>
                        <li> <a href="">Outstation taxi service in Jamnagar</a> </li>
                        <li> <a href="">Outstation taxi service in Jhunagarh</a> </li>
                        <li> <a href="">Outstation taxi service in Vadodara</a> </li>
                        <li> <a href="">Outstation taxi service in Surat</a> </li>
                        <li> <a href="">Outstation taxi service in Porbandar</a> </li>
                        <li> <a href="">Outstation taxi service in Gandhinagar</a> </li>
                    </ul>
                </div>
            </div> */}
            </div>
        </>
    )
}
export default Service_routes;
