import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../src/images/logo.png";
import logoclr from "../src/images/logoclr.png";

// import LockIcon from "@mui/icons-material/Lock";
// import PersonIcon from "@mui/icons-material/Person";
import styled from 'styled-components';
import Burger from './Burger';
// import { NavLink } from "react-router-dom";

const Nav = styled.nav`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items:center; 

  .logo {
    padding: 15px 0;
  }
`


const Navbar = () => {
  const [fixHeader, setFixHeader] = useState(false)
  let slug = document.URL.split("/")[3];
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 20) {
      setFixHeader(true)
    } else {
      setFixHeader(false)
    }
  })

  let innerheader = (slug) ? "innerheader" : "";
  return (
    <>
      <div className={`siteheader ${fixHeader ? "header-fixed" : ""}` +" "+ innerheader }>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mainmenu">
              <Nav>
                <div className="logo">
                  <NavLink className="navbar-brand" to="/">
                    <img src={logo} className="logoimg defaultlogo" alt="Logo" />
                    <img src={logoclr} className="logoimg hdrfxdlogo" alt="Logo" />
                  </NavLink>
                </div>
                <Burger />
              </Nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
