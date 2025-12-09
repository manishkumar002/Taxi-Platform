import React from "react";
import Whyslider from './Why-slider';
import { Link } from "react-router-dom";

const Why_buzz = () => {
    return (
        <>
            <div className="container pt-4"> 
                <div className="row hdng_vwall align-items-center justify-content-between">
                    <div className="sitehdng">
                        <h2>Why Buzzway?</h2>
                    </div>
                    <Link className="vwall" to={'/services'}>View All</Link>
                </div>
            </div>

            <div className="whynum_sliderow pt-2">
                <div className="w5 bgwhybz">
                    <div className="stepswhite">
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                1
                            </div>
                            <div className="nmtxt">
                                <h5>Clean Car</h5>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                2
                            </div>
                            <div className="nmtxt">
                                <h5>Fair Fares</h5>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                3
                            </div>
                            <div className="nmtxt">
                                <h5>Transparent Billing</h5>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                4
                            </div>
                            <div className="nmtxt">
                                <h5>Professional Drivers</h5>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                5
                            </div>
                            <div className="nmtxt">
                                <h5>Reliable Service</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w7">
                    <div className="whysldrwrap">
                        <Whyslider />
                    </div>
                </div>

            </div>

        </>
    )
}

export default Why_buzz;
