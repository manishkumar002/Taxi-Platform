import React, { useState, useEffect } from "react";
import Footer from './Footer';
import Pop_routes from './Popular-routes';
import Config from "./Config/Config";
import axios from "axios";
import { Helmet } from "react-helmet-async";



const Terms_conditions = () => {

    const [TermCondition, setTermsCondition] = useState({});

    const handleAboutUsAPI = async () => {
        try {
            let Payloads = {
                page_type: 'terms-and-conditions'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list`, Payloads);
            if (response.data.status) {
                setTermsCondition(response.data.data[0]);
            } else {
                setTermsCondition([]);
            }
        } catch (error) {
            setTermsCondition([]);

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
                Object.entries(TermCondition).length > 0 && TermCondition &&
                <>
                    <Helmet>
                        <title>{TermCondition.meta_title}</title>
                        <meta name="title" content={TermCondition && TermCondition.meta_title} />
                        <meta name="description" content={TermCondition && TermCondition.meta_description} />
                        <meta name="keywords" content={TermCondition && TermCondition.meta_keyword} />
                    </Helmet>
                    <div className="full_txttop bgdarkblue">
                        <div className="container py-4">
                            <h3>{TermCondition && TermCondition.h_one_tag}</h3>
                        </div>
                    </div>
                    <div className="container py-4">
                        <div className="row">
                            <div className="abttxt" dangerouslySetInnerHTML={{ __html: TermCondition && TermCondition.content_data }} />
                        </div>
                    </div>

                    <Pop_routes />

                    <Footer />
                </>
            }
        </>
    )
}


export default Terms_conditions;

