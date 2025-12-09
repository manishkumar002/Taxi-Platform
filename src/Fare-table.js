import React from "react";

const Fare_table = ({ fair_data }) => {
    // helper function for camel case
    function camel_Case(str) {
        if (!str || str === '') {
            return ''
        }
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className="cardlike faretable">
                <h5>{camel_Case(fair_data?.trip_type ? fair_data.trip_type : "outstation")} Car Rental Fare</h5>
                <table>
                    <tr>
                        <th>Vehicle Name</th>
                        <th>From</th>
                        <th>Rate/KM</th>
                        <th>Estimated cost</th>
                        <th>Min. KM/Day</th>
                    </tr>
                    {
                        fair_data ?
                            Array.isArray(fair_data.fair_data) && fair_data.fair_data.length > 0 ?
                                fair_data.fair_data.map((values, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{values.vehicle_name}</td>
                                                <td>{values.from_city}</td>
                                                <td>{values.rate_par_km} INR/KM</td>
                                                <td>{values.estimated_cost} INR</td>
                                                <td>{values.min_km}  KM</td>
                                            </tr>
                                        </>
                                    )
                                })
                                : <>
                                    <tr>
                                        <td colSpan="5" className="w-100 text-center">No Fair data available</td>
                                    </tr>
                                </>
                            : ''
                    }
                    {/* <tr>
                        <td>Etios</td>
                        <td>Ahmedabad</td>
                        <td>15 INR/KM</td>
                        <td>12999.00 INR</td>
                        <td>200 KM</td>
                    </tr>
                    <tr>
                        <td>Innova Ertiga</td>
                        <td>Ahmedabad</td>
                        <td>18 INR/KM</td>
                        <td>15999.00 INR</td>
                        <td>200 KM</td>
                    </tr>
                    <tr>
                        <td>Swift Dzire</td>
                        <td>Ahmedabad</td>
                        <td>10 INR/KM</td>
                        <td>8999.00 INR</td>
                        <td>200 KM</td>
                    </tr> */}
                </table>
            </div>
        </>
    )
}

export default Fare_table;

