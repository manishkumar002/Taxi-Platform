import React from "react";
import bn from './images/bn.svg';
import call from './images/call.svg';
import whatsapp from './images/whatsapp.svg';

const Call_booknow = () => {

    const handleScrollBar = () => {
        console.log('hey im running')
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <>
            <div className="mx-0 callbknow">
                <div className="w30">
                <a href="tel:+91-9054865866">   
                    <div className="d-flex align-items-center">
                            <img src={call} alt="call"/>
                            <div className="cbntxt">
                               <span>Call Now</span>
                               <h5>+91-9054865866</h5>
                           </div>
                    </div>
                </a>
                </div>
                <div className="w25">
                <a href="tel:+91-9054865866">
                    <div className="d-flex align-items-center">
                       <img src={whatsapp} alt="what app images"/>
                           <div className="cbntxt">
                            <h5>Whatsapp Now</h5>
                           </div>
                    </div>
                </a>
                </div>
                <div className="w45" onClick={handleScrollBar}>
                    <div className="d-flex align-items-center">
                        <img src={bn} alt="cab Book"/>
                        <div className="cbntxt">
                            <h5>Book Now</h5>
                            <span>Hassle free booking your ride.</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Call_booknow;
