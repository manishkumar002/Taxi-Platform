import React, { useState, useEffect } from 'react';
import Slider from "react-slick";

import quote from './images/quote.png';
import axios from 'axios';
import Config from './Config/Config';


const settings = {
    dots: true,
    centerMode: false,
    infinite: false,
    slidesToShow: 2,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                infinite: true,
                dots: true,
                arrows: false,
                slidesToScroll: 1,
            }
        }
    ]
};

const Test_slider = () => {
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
            <Slider {...settings}>
                <div className='test-item'>
                    <div className='d-flex testsld align-items-start'>
                        <img src={quote} />
                        <div className='sldtxt'>
                            <p>As a female traveller I highly recommend their cab services as Buzzway make sure about complete safety of their customers with
                                well trained drivers and coordinated staff.</p>
                            <span className='clientname'>Maria Bharati, Gandhinagar</span>
                        </div>
                    </div>
                </div>
                {
                    reviewsList.length > 0
                    && reviewsList.map((item, index) => {
                        return (
                            <>
                                <div className='test-item' key={index}>
                                    <div className='d-flex testsld align-items-start'>
                                        <img src={quote} />
                                        <div className='sldtxt'>
                                            <p>{item.description}</p>
                                            <span className='clientname'>{item.remark_by}, {item.city_name}</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
                {/*   <div className='test-item'>
                    <div className='d-flex testsld align-items-start'>
                        <img src={quote} />
                        <div className='sldtxt'>
                            <p>Buzzway has been the most reliable cab services I've opted for so far. Kudos to the team for providing safe
                                taxi services in today's given conditions.</p>
                            <span className='clientname'>Vinay Shukla, Morbi</span>
                        </div>
                    </div>
                </div>
                <div className='test-item'>
                    <div className='d-flex testsld align-items-start'>
                        <img src={quote} />
                        <div className='sldtxt'>
                            <p>As a female traveller I highly recommend their cab services as Buzzway make sure about complete safety of their customers with
                                well trained drivers and coordinated staff.</p>
                            <span className='clientname'>Maria Bharati, Gandhinagar</span>
                        </div>
                    </div>
                </div>
                <div className='test-item'>
                    <div className='d-flex testsld align-items-start'>
                        <img src={quote} />
                        <div className='sldtxt'>
                            <p>Buzzway has been the most reliable cab services I've opted for so far. Kudos to the team for providing
                                safe taxi services in today's given conditions.</p>
                            <span className='clientname'>Vinay Shukla, Morbi</span>
                        </div>
                    </div>
                </div> */}
            </Slider>
        </>
    )
}

export default Test_slider;
