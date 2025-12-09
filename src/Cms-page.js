import React, { useEffect } from "react";
import adbnr from "../src/images/adbnr.png";
import sideimg from "../src/images/sideimg.png";
import sideapp from "../src/images/sideapp.png";
import { Helmet } from "react-helmet-async";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Side_quick from './Side_quick';
import SearchSoftware from './Software';
import Faqs from './Faq';
import Cms_tablike from './Cms-tablike';
import { useLocation } from "react-router-dom";
import Cab_box from './Cab-box';
import Fare_table from './Fare-table';
import Service_routes from './Service-routes';
import Major_routes from './Major-routes';
import Popular_tourist from './Popular-tourist';
import Cms_review from './Cms-review';
import Call_booknow from './Call-booknow';
import _ from 'lodash';
import { useState } from "react";
import Config from "./Config/Config";
import axios from "axios";
import AlertPopupMessage from "./ErrorPopus/AlertPopus";


const Cms = () => {
    const [Tab_data, set_Tab_data] = useState([]);
    const [Tabs_records , set_tab_records] = useState({});
    const [city_routes , set_city_routes] = useState({});
    const [checkCityPage , setCheckCityPage] = useState([]);
    const [popularRoutes , setPopularRoutes] = useState({});
    const Location = useLocation();

    // verified the city page records data
    const verifiedPageRecordsData = async (page_slug) => {
        try {
            let response = await axios.post(`${Config.API_URL}/api/customer/cms/city_records`, { "page_slug": page_slug })
            if (response.data.status) {
                setCheckCityPage(response.data.data)
            } else {
                setCheckCityPage({});
            }
        } catch (error) {
            console.log(error.message)
            setCheckCityPage({});
        }
    }

    // handle the Tabs records data to selected tabs
    const Tab_records_data = async (city_name) => {
        try {
            let response = await axios.post(`${Config.API_URL}/api/customer/cms/city_records`, { "from_city_name": city_name })
            if (response.data.status) {
                set_Tab_data(response.data.data)
            } else {
                set_Tab_data([]);
            }
        } catch (error) {
            console.log(error.message)
            set_Tab_data([]);
        }
    }

    // handle the cms city cms data
    useEffect(() => {
        if(Object.keys(checkCityPage).length > 0 && checkCityPage.page_type  === 'city_page'){
            Tab_records_data(checkCityPage.from_city_name)
            setPopularRoutes([])
        }else if(Object.keys(checkCityPage).length > 0 && checkCityPage.page_type  === 'city_routes'){
            set_city_routes(checkCityPage)
            setPopularRoutes([])
            set_Tab_data([]);
        }
    } , [ checkCityPage , Location.pathname])

    useEffect(() => {
        let page_slug = Location.pathname.slice(1);
        verifiedPageRecordsData(page_slug);
    }, [Location.pathname]);

    useEffect(() => {
        if (Object.entries(popularRoutes).length > 0) {
            set_tab_records(popularRoutes)
            set_Tab_data([]);
        }
    } , [popularRoutes])
    // this is logs 
    return (
        <> 
            <AlertPopupMessage />
            <Helmet>
                <title>{Tabs_records.meta_title}</title>
                <meta name="description" content={Tabs_records.meta_description} />
                <meta name="keywords" content={Tabs_records.meta_keyword} />
            </Helmet>
            <div className="full_softwr bgdarkblue">
                <div className="container py-4">
                    <h1>Book One Way Cab Hire from {Tabs_records?.from_city_name ? Tabs_records.from_city_name : Tabs_records.popular_city_name }</h1>
                    <SearchSoftware />
                </div>
            </div>
            <div className="container">
                <div className="row py-4 cmspage">
                    <div className="col-sm-9">
                        <div className="cms-content">
                            <h2>{Tabs_records.h_one_tag}</h2>
                            {
                                (Tabs_records?.banner_image_jpeg || Tabs_records?.city_image_jpeg) &&
                                <img src={`${Config.IMG}${Tabs_records?.banner_image_jpeg ? Tabs_records?.banner_image_jpeg : Tabs_records.city_image_jpeg }`} alt="imageTag" />
                            }
                            {
                                Object.entries(popularRoutes).length > 0 ? null :
                                <Cms_tablike common_cms={Tab_data} tab_records_data={set_tab_records} Tabs_data={set_Tab_data} context_data={Tabs_records} routesPages={city_routes}/>
                            }
                        </div>
                        <div className="cms-cabs">
                            {/* <h5>Book Cab from {Tabs_records?.from_city_name ? Tabs_records.from_city_name : Tabs_records.popular_city_name }</h5> */}
                            <div className="row">
                                {/* <div className="col-sm-4">
                                    <Cab_box/>
                                </div> */}
                                {/* <div className="col-sm-4">
                                    <Cab_box/>
                                </div>
                                <div className="col-sm-4">
                                    <Cab_box/>
                                </div>
                                <div className="col-sm-4">
                                    <Cab_box/>
                                </div>
                                <div className="col-sm-4">
                                    <Cab_box/>
                                </div>
                                <div className="col-sm-4">
                                    <Cab_box/>
                                </div> */}
                            </div>
                        </div>
                        <Fare_table fair_data={Tabs_records}/>
                        <Service_routes tab_records_data={set_tab_records} Tabs_data={set_Tab_data}/>
                        <Major_routes Major_routes={Tabs_records}/>
                        <Faqs faq_data={Tabs_records}/>
                        <Popular_tourist tab_records_data={set_tab_records} Tabs_data={set_Tab_data} PopularCity={setPopularRoutes} popularData={popularRoutes}/>
                        <Cms_review />
                        <Call_booknow />
                        <div className="midbnr">
                            <a href="https://play.google.com/store/apps/details?id=com.buzzwaycustomer&hl=en"> <img src={adbnr}  alt="imageTag" /></a>
                        </div>
                    </div>
                    <div className="col-sm-3 cmssidebr">
                        <a href="https://play.google.com/store/apps/details?id=com.buzzwaycustomer&hl=en"> <img src={sideapp} /></a>
                        <img src={sideimg} />
                        <Side_quick />
                    </div>
                </div>
            </div>

            <Pop_routes />

            <Footer />
        </>
    )
}


export default Cms;
