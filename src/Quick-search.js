import React from "react";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Quick_search = () => {

    return (
        <>
            <div className="row services_row pb-5">
                <h5>Airport taxi quick search</h5>
                <div className="tablike">
                    <a href="" className="tabbtn active">
                        1 -2 Passengers
                    </a>
                    <a href="" className="tabbtn">
                        2+ Passengers
                    </a>
                </div>
                <div className="qsrchwrp">
                    <div className="qksrchbox">
                        <h5>Standard - Hatchback, Sedan or similar</h5>
                        <p><BusinessCenterIcon /> 2 standard bags</p>
                        <a href="" className="sitebtn">Search</a>
                    </div>
                    <div className="qksrchbox">
                        <h5>Standard - Hatchback, Sedan or similar</h5>
                        <p><BusinessCenterIcon /> 2 standard bags</p>
                        <a href="" className="sitebtn">Search</a>
                    </div>
                    <div className="qksrchbox">
                        <h5>Standard - Hatchback, Sedan or similar</h5>
                        <p><BusinessCenterIcon /> 2 standard bags</p>
                        <a href="" className="sitebtn">Search</a>
                    </div>
                </div>

            </div>

        </>
    )
}


export default Quick_search;
