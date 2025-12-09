import React , {useEffect , useState} from "react";
import regsbnr from "../src/images/regsbnr.png";
import adbnr from "../src/images/adbnr.png";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Download_apps from './Download-apps';

import Home_testimonial from './Home-testimonial';
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Register_form from './Register-form';
import AlertPopupMessage from "./ErrorPopus/AlertPopus";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Config from "./Config/Config";

const Register = () => {
    const [DriverCms , setDriverCms] = useState({});
    const [metaData, setMetaData] = useState({
        meta_title: '',
        meta_description: '',
        meta_keyword: ''
    });

    const FetchDriverCmsRecords = async () => {
        try {
            let Payloads = {
                page_type: 'drive-with-us'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list` , Payloads);
            if(response.data.status){
                setDriverCms(response.data.data[0]);
            }else {
                setDriverCms({});
            }
        } catch (error) {
            setDriverCms({});
        }
    }

    useEffect(() => {
        setMetaData({
            meta_title:DriverCms.meta_title ,
            meta_description: DriverCms.meta_description,
            meta_keyword:DriverCms.meta_keyword
        });
    } , [DriverCms.meta_description, DriverCms.meta_keyword, DriverCms.meta_title])


    useEffect(() => {
        FetchDriverCmsRecords();
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
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
                <img src={regsbnr} />
                <div className="ovrlylefttext ovrlytext">
                    <h5> {DriverCms.h_one_tag} </h5>
                </div>
            </div>
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-7 order-mob-2">
                        <div className="abttxt" dangerouslySetInnerHTML={{ __html: Object.entries(DriverCms).length > 0 && DriverCms.content_data }} />
                        <div className="regst_ftrs">
                            <div className="rgst_ftrbx">
                                <TaskAltIcon />
                                <p>250+ Cities</p>
                            </div>
                            <div className="rgst_ftrbx">
                                <TaskAltIcon />
                                <p>2k+ rides per month</p>
                            </div>
                            <div className="rgst_ftrbx">
                                <TaskAltIcon />
                                <p>Pan India Presence</p>
                            </div>
                            <div className="rgst_ftrbx">
                                <TaskAltIcon />
                                <p>175 million app install</p>
                            </div>
                        </div>
                        <div className="midbnr">
                            <img src={adbnr} />
                        </div>
                    </div>
                    <div className="col-sm-5 order-mob-1">
                        <div className="regst_form_pos">
                            <div className="regst_form">
                                <h3>Register Now</h3>
                                <Register_form />
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


export default Register;
