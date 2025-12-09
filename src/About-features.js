import React from "react";
import ai1 from "../src/images/ai1.png";
import ai2 from "../src/images/ai2.png";
import ai3 from "../src/images/ai3.png";
import ai4 from "../src/images/ai4.png";


const Abt_features = () => {

    return (
        <>
            <div className="bgdarkblue ftrs_sec">
                <div className="container">
                    <div className="row py-5 align-content-between h450">
                        <div className="col-sm-6">
                            <div className="ftrbox">
                                <div className="ftrimg">
                                    <img src={ai1} />
                                </div>
                                <div className="ftrtxt">
                                    <h6>10K+ Cabs</h6>
                                    <p>Local, Outstation, Transfer or Oneway Drop simply select your trip type.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ftrbox">
                                <div className="ftrimg">
                                    <img src={ai2} />
                                </div>
                                <div className="ftrtxt">
                                    <h6>250+ Cities</h6>
                                    <p>We want you reach your destination on time every time.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ftrbox">
                                <div className="ftrimg">
                                    <img src={ai4} />
                                </div>
                                <div className="ftrtxt">
                                    <h6>Verified chauffeurs</h6>
                                    <p>Empowered entrepreneurs as drivers-partners network.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="ftrbox">
                                <div className="ftrimg">
                                    <img src={ai3} />
                                </div>
                                <div className="ftrtxt">
                                    <h6>Premium rides</h6>
                                    <p>Premium rides network serving corporates.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Abt_features;
