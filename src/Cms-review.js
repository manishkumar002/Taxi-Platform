import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "./Config/Config";
import quote from './images/quote.png';
import { Link } from "react-router-dom";

const Cms_review = () => {
    const [reviewsList, setReviewsList] = useState([]);
    const handle_reviews_api = async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/api/customer/reviews/reviews_list`)
            if (response.data.status) {
                setReviewsList(response.data.data);
            } else {
                setReviewsList([]);
            }
        } catch (error) {
            console.log(error.message);
            setReviewsList([]);
        }
    }
    useEffect(() => {
        handle_reviews_api();
    }, [])

    return (
        <>
            <div className="cardlike row mx-0 pb-4 mb-4 cms-testimonials">
                <div className="d-flex hdngrow m0 justify-content-between">
                    <h5>Reviews</h5>
                    {/* <a href=""> View All </a> */}
                    <Link to={'/reviews'}>View All</Link>
                </div>
                <div className="row m0">
                    {/* <div className="col-sm-4">
                        <div className='testsld'>
                            <img src={quote} />
                            <div className='sldtxt'>
                                <p>As a female traveller I highly recommend their cab services as Buzzway make sure about complete safety of their customers with
                                    well trained drivers and coordinated staff.</p>
                                <span className='clientname'>Maria Bharati, Gandhinagar</span>
                            </div>
                        </div>
                    </div> */}
                    {
                        reviewsList.length > 0
                        && reviewsList.slice(0, 3).map((item, index) => {
                            return (
                                <div className="col-sm-4" key={index}>
                                    <div className='testsld'>
                                        <img src={quote} alt="quote" />
                                        <div className='sldtxt'>
                                            <p>{item.description}</p>
                                            <span className='clientname'>{item.remark_by}, {item.city_name === '' ? 'Lucknow' : item.city_name}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* <div className="col-sm-4">
                        <div className='testsld'>
                            <img src={quote} />
                            <div className='sldtxt'>
                                <p>As a female traveller I highly recommend their cab services as Buzzway make sure about complete safety of their customers with
                                    well trained drivers and coordinated staff.</p>
                                <span className='clientname'>Aavni Singh, Ahmedabad</span>
                            </div>
                        </div>
                    </div> */}
                    {/* <div className="col-sm-4">
                        <div className='testsld'>
                            <img src={quote} />
                            <div className='sldtxt'>
                                <p>As a female traveller I highly recommend their cab services as Buzzway make sure about complete safety of their customers with
                                    well trained drivers and coordinated staff.</p>
                                <span className='clientname'>Raksha, Gandhinagar</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Cms_review;
