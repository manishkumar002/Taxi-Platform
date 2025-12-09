import React  , {useState , useEffect} from "react";
import abtbnr from "../src/images/abtbnr.png";
import abtt from "../src/images/abtt.png";
import Connect from './Connect';
import Home_testimonial from './Home-testimonial';
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import { Helmet } from "react-helmet-async";
import Abt_features from './About-features';
import axios from "axios";
import Config from "./Config/Config";

const About = () => {
    const [aboutUs , setAboutUs] = useState({});

    const handleAboutUsAPI = async () => {
        try {
            let Payloads = {
                page_type:'about-us'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list` , Payloads);
            if(response.data.status){
                console.log(response.data.data , 'this is data here');
                setAboutUs(response.data.data[0]);
            }else {
                setAboutUs([]);
            }
        } catch (error) {
            console.log(error.message);
            setAboutUs([]);
            
        }
    }

    // here handle the about use page
    useEffect(() => {
        handleAboutUsAPI();
    } , [])

    // handle the scroll bar
    useEffect(() => {
        window.scrollTo(0, 0);
    } , [])

    return (
        <>
            <Helmet>
                <title>{aboutUs && aboutUs.meta_title}</title>
                <meta name="description" content={aboutUs.meta_description} />
                <meta name="keywords" content={aboutUs.meta_keyword} />
            </Helmet>
            <div className="fullbnr">
                <img src={abtbnr} />
                <div className="ovrlytext">
                    <h5> {aboutUs && aboutUs.h_one_tag} </h5>
                </div>
            </div>
            <div className="container">
                <div className="row py-5">
                    <div className="col-sm-7">
                        <div className="abttxt" dangerouslySetInnerHTML={{ __html: aboutUs.content_data }} />
                    </div>
                    <div className="col-sm-5">
                        <img src={`${Config.IMG}${aboutUs.banner_image_jpeg}`}  alt={`${aboutUs.banner_image_alt}`}/>
                    </div>
                </div>
            </div>
            <Abt_features />

            <Connect/>

            <Home_testimonial/>

            <Pop_routes />

            <Footer />
        </>
    )
}


export default About;
