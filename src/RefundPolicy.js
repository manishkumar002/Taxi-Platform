import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Config from "./Config/Config";
import axios from "axios";
import { Helmet } from "react-helmet-async";


const RefundPolicy = () => {
    const [RefundPolicy, setRefundPolicy] = useState({});

    const handleAboutUsAPI = async () => {
        try {
            let Payloads = {
                page_type: 'refund-policy'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list`, Payloads);
            if (response.data.status) {
                setRefundPolicy(response.data.data[0]);
            } else {
                setRefundPolicy([]);
            }
        } catch (error) {
            setRefundPolicy([]);

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
            {
                Object.entries(RefundPolicy).length > 0 &&
                <>
                    <Helmet>
                        <title>{RefundPolicy.meta_title}</title>
                        <meta name="title" content={Object.entries(RefundPolicy).length > 0 && RefundPolicy.meta_title} />
                        <meta name="description" content={Object.entries(RefundPolicy).length > 0 && RefundPolicy.meta_description} />
                        <meta name="keywords" content={Object.entries(RefundPolicy).length > 0 && RefundPolicy.meta_keyword} />
                    </Helmet>
                    <div className="full_txttop bgdarkblue">
                        <div className="container py-4">
                            <h3>{Object.entries(RefundPolicy).length > 0 && RefundPolicy.h_one_tag}</h3>
                        </div>
                    </div>
                    <div className="container py-4">
                        <div className="row">
                            <div className="abttxt" dangerouslySetInnerHTML={{ __html: Object.entries(RefundPolicy).length > 0 && RefundPolicy.content_data }} />
                        </div>
                    </div>

                    <Pop_routes />

                    <Footer />
                </>
            }
        </>
    )
}


export default RefundPolicy;

