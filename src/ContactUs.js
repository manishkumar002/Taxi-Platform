import React, { useEffect, useState } from "react";
// import regsbnr from "../src/images/regsbnr.png";
import adbnr from "../src/images/adbnr.png";
import ContactBanner from "../src/images/contact_us_banner.png";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Download_apps from './Download-apps';
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Home_testimonial from './Home-testimonial';
import { FaLocationDot } from "react-icons/fa6";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import AlertPopupMessage from "./ErrorPopus/AlertPopus";
import { Helmet } from "react-helmet-async";
import ContactUsForm from "./ContactUsForm";
import Config from "./Config/Config";
import axios from 'axios'

const ContactUs = () => {

    const [ContactUs, setContactUs] = useState({});
    const [metaData, setMetaData] = useState({
        meta_title: '',
        meta_description: '',
        meta_keyword: ''
    });


    const handleContactUsAPI = async () => {
        try {
            let Payloads = {
                page_type: 'contact-us'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list`, Payloads);
            if (response.data.status) {
                setContactUs(response.data.data[0]);
            } else {
                setContactUs([]);
            }
        } catch (error) {
            setContactUs([]);

        }
    }

    // here handle the Contact us page
    useEffect(() => {
        handleContactUsAPI();
    }, [])

    // handle the meta description & title here
    useEffect(() => {
        setMetaData({
            meta_title: ContactUs.meta_title,
            meta_description: ContactUs.meta_description,
            meta_keyword: ContactUs.meta_keyword
        });
    }, [ContactUs.meta_description, ContactUs.meta_keyword, ContactUs.meta_title])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);

    // *********************************web_settings page***********************************

    const [webSetting, setWebSetting] = useState({});

    const handleSetting = async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/api/customer/setting/web_setting`);
            console.log(response.data.data[0])
            if (response.data && response.data.data && response.data.data.length > 0) {
                setWebSetting(response.data.data[0]);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    useEffect(() => {
        handleSetting();
    }, []);



    return (
        <>
            <AlertPopupMessage />
            <Helmet>
                <title>{metaData.meta_title}</title>
                <meta name="description" content={metaData.meta_description} />
                <meta name="keywords" content={metaData.meta_keyword} />
            </Helmet>
            <div className="fullbnr">
                <img src={ContactBanner} alt="Banner imag" />
                <div className="ovrlytext">
                    <h5> {ContactUs && ContactUs.h_one_tag} </h5>
                </div>
            </div>
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-12">
                        <div className="abttxt" dangerouslySetInnerHTML={{ __html: Object.entries(ContactUs).length > 0 && ContactUs.content_data }} />
                        {/* <div className="row">
                            <div className="col-sm-8 m-auto">
                                <div className="regst_form">
                                    <h3>Contact Us</h3>
                                    <ContactUsForm />
                                </div>
                            </div>
                        </div> */}


                        <div className="row">
                            {webSetting.add_more_address && webSetting.add_more_address.length > 0 && (
                                webSetting.add_more_address.map((address, index) => (
                                    <div className="col-sm-6" key={index}>
                                        <div className={`contactcard ${index % 2 === 0 ? 'bgblue' : 'bgyellow'}`}>
                                            <div className="cnt_dtlrow">
                                                <div className={`social cnticons ${index % 2 === 0 ? 'bgyellow' : 'bgblue'}`}>
                                                    <div>
                                                        <IoCall />
                                                    </div>
                                                </div>
                                                <div className="cnttext">
                                                    <h4> Call Us </h4>
                                                    <p><a style={{color:'white'}} href={`tel:${address.phone_no || 'Phone number not availabl'}`}>
                                                        +91- {address.phone_no || 'Phone number not availabl'}
                                                    </a></p>
                                                    {/* <p className="call">+91- {address.phone_no || 'Phone number not available'}</p> */}
                                                </div>
                                            </div>
                                            <div className="cnt_dtlrow">
                                                <div className={`social cnticons ${index % 2 === 0 ? 'bgyellow' : 'bgblue'}`}>
                                                    <div className="email">
                                                        <MdEmail />
                                                    </div>
                                                </div>
                                                <div className="cnttext">
                                                    <h4> E-Mail Us </h4>
                                                    <p><a style={{color:'white'}} href={`mailto:${address.email_id || 'Email not available'}`}>
                                                        {address.email_id || 'Email not available'}
                                                    </a></p>
                                                    {/* <p className="call">{address.email_id || 'Email not available'}</p> */}
                                                </div>
                                            </div>
                                            <div className="cnt_dtlrow">
                                                <div className={`social cnticons ${index % 2 === 0 ? 'bgyellow' : 'bgblue'}`}>
                                                    <div className="adrs">
                                                        <FaLocationDot />
                                                    </div>
                                                </div>
                                                <div className="cnttext">
                                                    <h4>Address</h4>
                                                    <p className="call">
                                                        {address.address || 'Address not available'}
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href="https://maps.app.goo.gl/DEpAMHAZvcztmNbv7"
                                                            className="gmbarrow"
                                                        >
                                                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            )}
                        </div>

                        {/* <div className="row">
                            <div className="locatemap">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.187026373967!2d72.51951219999997!3d23.05360390000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b5019549cb9%3A0x78529d9fa839e1d1!2sBuzzway%20%3A%20Luxury%20Cab%20Hire%20in%20Ahmedabad%2C%20Best%20One%20way%20Taxi%20service%20in%20Ahmedabad!5e0!3m2!1sen!2sin!4v1728886575584!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="locatemap">
                                <iframe
                                    src={`${webSetting.map_script}`}
                                    width="100%"
                                    height="450"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                >
                                </iframe>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <Home_testimonial />
            <Download_apps />

            <Pop_routes />

            <Footer />
        </>
    )
}


export default ContactUs;
