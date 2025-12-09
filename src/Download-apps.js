import React from "react";
import app1 from "../src/images/app1.png";
import app2 from "../src/images/app2.png";
import gplay from "../src/images/gplay.png";
import qr from "../src/images/qr.png";
import sideapp from "../src/images/sideapp.png";

const Download_apps = () => {
    return (
        <>
            <section className="bglight_blue mob-hidden">
                <div className="container pt-4 py-4 appsect">
                    <div className="row hdng_vwall align-items-center justify-content-between">
                        <div className="sitehdng">
                            <h2>Download Our Apps</h2>
                        </div>
                    </div>
                    <div className="row pt-4">
                        <div className="col-sm-3 text-center app1">
                            <img src={app2} />
                        </div>
                        <div className="col-sm-6 ">
                            <div className="apptext app1">
                                <h4>Our Customer App</h4>
                                <div className="approw d-flex align-items-center">
                                    <div className="apptxt">
                                        <p>Scan the QR code with your smartphone camera</p>
                                        <a href="https://play.google.com/store/apps/details?id=com.buzzwaycustomer&hl=en">
                                          <img src={gplay} alt="gplay"/>
                                        </a>
                                    </div>
                                    <div className="appqr">
                                        <img src={qr} />
                                    </div>
                                </div>
                            </div>
                            <div className="apptext app2">
                                <h4>Our Partner App</h4>
                                <div className="approw d-flex align-items-center">
                                    <div className="apptxt">
                                        <p>Scan the QR code with your smartphone camera</p>
                                        <a href="https://play.google.com/store/apps/details?id=com.buzzwaycustomer&hl=en">
                                          <img src={gplay} alt="gplay"/>
                                        </a>
                                    </div>
                                    <div className="appqr">
                                        <img src={qr} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 text-center app2">
                            <img src={app1} />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mob-show">
                <div className="container pt-4 py-4">
                    <img src={sideapp} />
                </div>
            </section>
        </>
    )
}

export default Download_apps;