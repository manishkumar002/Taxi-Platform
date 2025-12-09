import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import axios from "axios";
import Config from "./Config/Config";
import { Helmet } from "react-helmet-async";


const PrivacyAndPolicy = () => {

    const [PrivacyAndPolicy, setPrivacyAndPolicy] = useState({});

    const handleAboutUsAPI = async () => {
        try {
            let Payloads = {
                page_type: 'privacy-policy'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list`, Payloads);
            if (response.data.status) {
                setPrivacyAndPolicy(response.data.data[0]);
            } else {
                setPrivacyAndPolicy({});
            }
        } catch (error) {
            console.log(error.message);
            setPrivacyAndPolicy({});

        }
    }

    // here handle the about use page
    useEffect(() => {
        handleAboutUsAPI();
    }, [])

    // handle the scroll bar
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, []);
    


    return (
        <>
            {Object.entries(PrivacyAndPolicy).length > 0 && (
                <>
                    <Helmet>
                        <meta name="title" content={PrivacyAndPolicy && PrivacyAndPolicy.meta_description}></meta>
                        <meta name="description" content={PrivacyAndPolicy && PrivacyAndPolicy.meta_description} />
                        <meta name="keywords" content={PrivacyAndPolicy && PrivacyAndPolicy.meta_keyword} />
                    </Helmet>
                    <div className="full_txttop bgdarkblue">
                        <div className="container py-4">
                            <h3>{PrivacyAndPolicy && PrivacyAndPolicy.h_one_tag}</h3>
                        </div>
                    </div>
                    <div className="container py-4">
                        <div className="row">
                            <div className="abttxt" dangerouslySetInnerHTML={{ __html: PrivacyAndPolicy && PrivacyAndPolicy.content_data }} />
                        </div>
                    </div>
                    <Pop_routes />
                    <Footer />
                </>
            )}
        </>
    )
}


export default PrivacyAndPolicy;

