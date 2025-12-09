import React from "react";
import rating from "../src/images/rating.png";
import Test_slider from './Testimonial-slider';
import { Link } from "react-router-dom";

const Home_testimonial = () => {
    return (
        <>
            <div className="container pt-4"> 
                <div className="row hdng_vwall align-items-center justify-content-between">
                    <div className="sitehdng">
                        <h2>Our Client Reviews</h2>
                    </div>
                    {/* <a className="vwall" href="">View all</a> */}
                    <Link className="vwall" to={'/reviews'}>View all</Link>
                </div>

                <div className="row">
                   <div className="col-sm-8 testmn_slider">
                      <Test_slider/>
                   </div>
                   <div className="col-sm-4 mob-hidden">
                      <img src={rating} />
                   </div>
                </div>
            </div>

</>
)
}

export default Home_testimonial; 