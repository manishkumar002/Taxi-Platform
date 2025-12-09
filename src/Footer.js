// import React from "react";
// import logo from "../src/images/logo.png";
// import fb from "../src/images/facebook.svg";
// import insta from "../src/images/insta.svg";
// import twitter from "../src/images/twitter.svg";
// import yt from "../src/images/yt.svg";
// import copyrightline from "../src/images/copyright-line.svg";
// import { Link } from "react-router-dom";
// import moment from 'moment'
// import Config from "./Config/Config";



// const Footer = () => {
//     return (
//         <>
//             <footer className="bgblack">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-sm-6 logo-email">
//                             <img src={logo} />
//                             <p>Connect: <a href="">booking@buzzway.in</a></p>
//                         </div>
//                         <div className="col-sm-6 social">
//                             <ul>
//                                 <li> <a href="https://www.facebook.com/buzzway01/"><img src={fb} /> </a> </li>
//                                 <li> <a href="https://www.instagram.com/buzzwaytaxiservice/"><img src={insta} /> </a> </li>
//                                 <li> <a href="https://twitter.com/buzzway01/"><img src={twitter} /> </a> </li>
//                                 <li> <a href="https://www.youtube.com/channel/UCmk1a_siIybosrgdJrHCcww"><img src={yt} /> </a> </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="row footrmenu">
//                         <ul>
//                             {/* <li><a href="/about-us">About Us</a></li> */}
//                             <li><Link to={`/about-us`}>About Us</Link></li>
//                             <li><Link to={`/contact-us`}>Contact Us</Link></li>
//                             <li><Link to={`/register`}>Drivers</Link></li>
//                             <li><Link to={`/terms-conditions`}>Terms & Conditions</Link></li>
//                             <li><Link to={`/privacy-policy`}>Privacy Policy</Link></li>
//                             <li><Link to={`/refund-Policy`}>Refund Policy</Link></li>
//                             <li><a href={`/sitemap.xml`}>Site Map</a></li>
//                         </ul>
//                     </div>
//                     <div className="row">
//                         <div className="copyr">
//                             <p> <img src={copyrightline} /> Copyright {moment().year()} Duplex Technologies Pvt. Ltd. All Right Reserved.</p>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </>
//     )
// }

// export default Footer; 









import React, { useEffect, useState } from "react";
import logo from "../src/images/logo.png";
import fb from "../src/images/facebook.svg";
import insta from "../src/images/insta.svg";
import twitter from "../src/images/twitter.svg";
import yt from "../src/images/yt.svg";
import copyrightline from "../src/images/copyright-line.svg";
import { Link } from "react-router-dom";
import moment from 'moment';
import Config from "./Config/Config";
import axios from 'axios';

const Footer = () => {
    const [setting, setSetting] = useState({});

    const handleSettingAPI = async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/api/customer/setting/web_setting`);
            if (response.data && response.data.data && response.data.data.length > 0) {
                setSetting(response.data.data[0]);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        }
    };

    useEffect(() => {
        handleSettingAPI();
    }, []);

    return (
        <>
            <footer className="bgblack">
                <div className="container">
                    {setting && (
                        <div className="row">
                            <div className="col-sm-6 logo-email">
                                {/* <img src={logo} /> */}
                                <img src={`${Config.IMG}/${setting.logo}`} alt="Buzzway Logo" />
                                {/* <p>Connect: <a href="">booking@buzzway.in</a></p> */}
                                <p>Connect: <a href={`mailto:${setting.care_email_id || 'booking@buzzway.in'}`}>
                                    {setting.care_email_id || 'booking@buzzway.in'}
                                </a></p>
                            </div>
                            <div className="col-sm-6 social">
                                <ul>
                                    <li>
                                        <a href={`${setting.facebook_link || 'https://www.facebook.com/buzzway01/'}`} target="_blank" rel="noopener noreferrer">
                                            <img src={fb} alt="Facebook" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`${setting.instagram_link || 'https://www.instagram.com/buzzwaytaxiservice/'}`} target="_blank" rel="noopener noreferrer">
                                            <img src={insta} alt="Instagram" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`${setting.twitter_link || 'https://www.youtube.com/channel/UCmk1a_siIybosrgdJrHCcww/'}`} target="_blank" rel="noopener noreferrer">
                                            <img src={twitter} alt="Twitter" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`${setting.youtube_link || '#'}`} target="_blank" rel="noopener noreferrer">
                                            <img src={yt} alt="YouTube" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="row footrmenu">
                        <ul>
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="/contact-us">Contact Us</Link></li>
                            <li><Link to="/register">Drivers</Link></li>
                            <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/refund-Policy">Refund Policy</Link></li>
                            <li><a href="/sitemap.xml">Site Map</a></li>
                        </ul>
                    </div>

                    <div className="row">
                        <div className="copyr">
                            <p>
                                <img src={copyrightline} alt="Copyright Line" />
                                Copyright {moment().year()} Duplex Technologies Pvt. Ltd. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;