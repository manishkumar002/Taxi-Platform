import React , {useEffect , useState} from "react";
// import abtbnr from "../src/images/abtbnr.png";
import abtbnr from '../../src/images/abtbnr.png'
import quote from '../../src/images/quote.png'

import abtt from "../../src/images/abtt.png";
import Connect from '../Connect';
import Home_testimonial from '../Home-testimonial';
import Footer from '../Footer';
import Pop_routes from '../Popular-routes';
import Abt_features from '../About-features';
import axios from "axios";
import Config from "../Config/Config";

const ReviewsList = () => {
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
   
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    

    return (
        <>
            <div className="fullbnr">
                <img src={abtbnr} />
                <div className="ovrlytext">
                    <h5> Our Customers Love Us!
                        Here Our Customers reviews and our satisfied customers have to say about Buzzway services
                    </h5>
                </div>
            </div>
            <div className="container">
            <div className="cardlike row mx-0 pb-4 mb-4 mt-5 cms-testimonials">
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
                        && reviewsList.map((item, index) => {
                            return (
                                <div className="col-sm-4 mt-5" key={index}>
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
            </div>
            <Abt_features />

            <Connect />

            <Home_testimonial />

            <Pop_routes />

            <Footer />
        </>
    )
}


export default ReviewsList;
