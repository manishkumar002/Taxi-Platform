import React, { useCallback , useState , useEffect } from "react";
import Sidebars from "./Dash-sidebar";
import NotificationsIcon from '@mui/icons-material/Notifications';
import user from "../../src/images/user.png";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ProfileEditContext } from "../Context/EditProfileContext";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config/Config";

function Dash_nav() {
    const getLocalStorageData = JSON.parse(localStorage.getItem('AccessLogin')) || {};
    const Navigation = useNavigate();
    const [notification , setNotification] = useState([]);

    /************************ fetch the notification details ************/
    const fetchNotification = useCallback( async () => {
        try {
            let payloads = {
                "user_id": getLocalStorageData.id,
                "app_type": 'Customer',
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/notification/list` , payloads)
            if(response.data.status){
                setNotification(response.data.data);
            }else {
                setNotification([]);
            }
        } catch (error) {
            console.log(error);
            setNotification([]);
        }
    } , [getLocalStorageData.id])

    const LogoutUsers = useCallback((e) => {
         // clearing session storages 
         let Payloads = {
            _id:getLocalStorageData._id
         }
         // called the backend API to Logout
         axios.post(`${Config.API_URL}/api/customer/logout` , JSON.parse(JSON.stringify(Payloads)) , {
            headers: {
                'Authorization':`${Config.API_ACCESS_TOKEN}`
            }
         })
          .then((response) => {
             console.log(response);
            if(response.data.status){
                localStorage.removeItem('AccessLogin');
                Navigation('/');
                return;
            }
          })
         .catch((err) => {
            console.log(err);
         })
    })

    useEffect(() => {
        fetchNotification();
    } , [])
    return (
        <>
            <Sidebars />
            <div className="wd80 d-flex justify-content-end">
                <div className="topdashhdr d-flex align-items-center">
                    <div className="d-flex align-items-center hdrprof_menu">
                        <img src={user} />
                        <NavDropdown title={getLocalStorageData.full_name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                Book Cab
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={LogoutUsers} >Logout</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <div className="notf_icn">
                        <NotificationsIcon />
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dash_nav;