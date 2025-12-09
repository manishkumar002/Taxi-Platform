import React from "react";
import about from "../src/images/about.png";

const Home_about = () => {
    return (
        <>
            <div className="container pt-4 py-4">
                <div className="row">
                    <div className="sitehdng">
                        <h2>India’s leading cab network with pan India presence.</h2>
                        <p>More destinations. More Ease. More Affordability</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <img src={about} />
                    </div>
                    <div className="col-sm-5 steps">
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                1
                            </div>
                            <div className="nmtxt">
                               <h5>Search Cab</h5>
                               <p>Local, Outstation, Transfer or Oneway Drop simply select your trip type.</p>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                2
                            </div>
                            <div className="nmtxt">
                               <h5>Select Car</h5>
                               <p>Choose from wide range of fleet that suits your need.</p>
                            </div>
                        </div>
                        <div className="rightnumtxt d-flex">
                            <div className="numonly">
                                3
                            </div>
                            <div className="nmtxt">
                               <h5>Pay And Book</h5>
                               <p>Confirm your booking with flexible payment options.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home_about;
