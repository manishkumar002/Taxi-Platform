import React , {useState , useEffect} from "react";
import moment from 'moment';
import { Link } from "react-router-dom";

const Pickupdrop = () => {
    let localStoragesData = JSON.parse(localStorage.getItem('cab_listing')) || {};
    let TimeDate = moment(localStoragesData.pickup_date);   
    let dropDate = moment(localStoragesData.drop_date)

    const helper_fun_camle_case = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className="pickdropup sidefaresum my-4">
                <h4>Pick-up and Drop-off</h4>

                <ul className="to-from">
                    <li>
                        <p>{localStoragesData.from_city}, India</p>
                        <span>{TimeDate.format('dddd')}, {TimeDate.date()} {TimeDate.format('MMMM')} {TimeDate.format('YYYY')}, {localStoragesData.trip_type === 'outstation' ? localStoragesData.pickup_time : TimeDate.format('hh:mm a')}</span>
                    </li>
                    <li>
                        {
                            localStoragesData.trip_type === 'outstation' 
                            && localStoragesData.travel_routes.length > 0 ?
                            localStoragesData.travel_routes.map((value) => {
                                return(
                                    <li>
                                        <p>{value.cityInput}, India</p>
                                    </li>
                                )
                            }) 
                            :  localStoragesData.trip_type === 'local' ?  <p>{localStoragesData.package} | {localStoragesData.from_city}, India</p>
                            : <p>{localStoragesData.to_city}, India</p>
                        }
                        {
                          localStoragesData.trip_type === 'outstation' ?
                            <span>{dropDate.format('dddd')}, {dropDate.date()} {dropDate.format('MMMM')} {dropDate.format('YYYY')}, {dropDate.format('hh:mm a')}</span>
                            : <span>{TimeDate.format('dddd')}, {TimeDate.date()} {TimeDate.format('MMMM')} {TimeDate.format('YYYY')}, {localStoragesData.pickup_time}</span>
                        }
                    </li>
                </ul>
                <div className="bkngtype">
                    <h4>Booking Type</h4>
                    <span>{helper_fun_camle_case(localStoragesData.trip_type)}</span>
                </div>
                <div className="modfy">
                    <Link to={'/'} className="sitebtn">Modify</Link>
                </div>
            </div>

            </>
    )
}
export default Pickupdrop;
