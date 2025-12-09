import "./dash-styles.css";
import React, { useCallback, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { HiUser } from "react-icons/hi";
import { FaWallet } from "react-icons/fa";
import { AiOutlineCar } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import logoclr from "../images/logoclr.png";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config/Config";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
function Sidebars() {
    //const { collapseSidebar } = useProSidebar();
    const [collapsed, setCollapsed] = useState(false);

    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = () => {
        setCollapsed(!collapsed);
    };
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    const getLocalStorageData = JSON.parse(localStorage.getItem('AccessLogin')) || {};
    const Navigation = useNavigate();

    const LogoutUsers = useCallback((e) => {
        // clearing session storages 
        let Payloads = {
            _id: getLocalStorageData._id
        }
        // called the backend API to Logout
        axios.post(`${Config.API_URL}/api/customer/logout`, JSON.parse(JSON.stringify(Payloads)), {
            headers: {
                'Authorization': `${Config.API_ACCESS_TOKEN}`
            }
        })
            .then((response) => {
                console.log(response);
                if (response.data.status) {
                    localStorage.removeItem('AccessLogin');
                    Navigation('/');
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    })

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="Explore your personal analytics and insights with our intuitive dashboard. Monitor your performance, track key metrics, and make data-driven decisions with ease." />
                <meta name="keywords" content="dashboard, analytics, insights, performance tracking, data-driven decisions, key metrics, personal analytics" />
            </Helmet>
            <Sidebar className={`app ${toggled ? "toggled" : ""}`} style={{ height: "100%", position: "absolute" }} collapsed={collapsed} toggled={toggled}
                handleToggleSidebar={handleToggleSidebar} handleCollapsedChange={handleCollapsedChange}>
                <main>
                    <Menu>
                        {collapsed ? (<MenuItem icon={<FiChevronsRight />} onClick={handleCollapsedChange}></MenuItem>) : (
                            <MenuItem suffix={<FiChevronsLeft />} onClick={handleCollapsedChange} >
                                <div className="dashlogo">
                                    <img src={logoclr} />
                                </div>
                            </MenuItem>
                        )}
                        <hr />
                    </Menu>

                    <Menu>
                        <MenuItem active component={<Link to={'/dashboard/my-bookings'} />} icon={<CgNotes />}>My Bookings</MenuItem>
                        <MenuItem active component={<Link to={'/dashboard/my-profile'} />} icon={<HiUser />}>My Profile</MenuItem>
                        <MenuItem active component={<Link to={'/dashboard/wallet'} />} icon={<FaWallet />}>My Wallet</MenuItem>
                        <MenuItem active component={<Link to={'/dashboard/refer-earn'} />} icon={<GiTakeMyMoney />}>Refer and Earn</MenuItem>
                        <MenuItem active component={<Link to={'/'} />} icon={<AiOutlineCar />}>Book Cab</MenuItem>
                        <MenuItem active onClick={(e) => LogoutUsers(e)} icon={<LuLogOut />}>Logout</MenuItem>
                    </Menu>
                </main>
            </Sidebar>


        </>
    );
}
export default Sidebars;
