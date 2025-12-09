import React, { useState, useCallback, useContext, useEffect , useRef } from "react";
import styled from "styled-components";
import Config from "./Config/Config";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import download from "../src/images/download.png";
import user from "../src/images/user.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import mob from "../src/images/mob.svg";
import axios from "axios";
import { AlertContext } from "./Context/AlertsPopusContext";
import { LoginPopupContext } from "./Context/ShowLoginPopup";
import AlertPopupMessage from "./ErrorPopus/AlertPopus";
import { useLocation } from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  align-items: center;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #fff;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(1000%)")};
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    padding: 2.5rem 1.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = ({ open }) => {
  // check users is Login so Please to print the users name on the
  const CurrentLocation = useLocation();
  const formRef = useRef(null); 
  const LoginStatus = JSON.parse(localStorage.getItem("AccessLogin")) ?? {};
  const { OpenLoginPops, setOpen } = useContext(LoginPopupContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setOpen(false);
  };
  const handleShow = () => setShow(true);
  const [number, setNumber] = useState();
  const [GetOtp, setOtp] = useState("");
  let [reSendOtpCounter, setResendOtpCounter] = useState(0);
  const [resendStatus, setResendStatus] = useState(false);
  const Navigations = useNavigate();
  const { setMessage, setStatus } = useContext(AlertContext);

  // Generate otp for mobile numbers
  const GeneratesOtp = (e) => {
    e.preventDefault();
    if (!number || String(number).length-1 > 10) {
      setMessage({
        status: false,
        message: `mobile number must be 10 digits`,
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    // called the Apis that we can get otp
    let Payloads = {
      mobile_no: number,
    };
    axios
      .post(
        `${Config.API_URL}/api/customer/login`,
        JSON.parse(JSON.stringify(Payloads)),
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      )
      .then((responses) => {
        // set the TimeOut counter
        if (responses.data.status) {
          setResendOtpCounter(60);
          setResendStatus(true);
          setMessage({
            status: true,
            message: `${responses.data.message}`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        } else {
          setMessage({
            status: false,
            message: `Internal server Error`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      })
      // handle errors Response
      .catch((err) => {
        console.log(err);
        setMessage({
          status: false,
          message: `${err.response.data.message}`,
        });
        setStatus(true);
        const timer = setTimeout(() => {
          setStatus(false);
        }, 3000);
        return () => clearTimeout(timer);
      });
  };
  // Re-send otp of otp and send User details
  const Re_Send_OTP = (e) => {
    e.preventDefault();
    if (number.length !== 10) {
      setMessage({
        status: false,
        message: `mobile number must be 10 digits`,
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    let Payloads = {
      mobile_no: parseInt(number),
    };
    axios
      .post(
        `${Config.API_URL}/api/customer/resendotp`,
        JSON.parse(JSON.stringify(Payloads)),
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        if(response.data.status){
          setMessage({
            status: true,
            message: `${response.data.message}`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        }else {
          setMessage({
            status: false,
            message: `${response.data.message}`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // clear the setTime interval to manage the Data
  useEffect(() => {
    let intervalId = setInterval(() => {
      setResendOtpCounter((prevCounter) => {
        if (prevCounter > 0) {
          return prevCounter - 1;
        } else {
          clearInterval(intervalId); // Clear the interval when counter reaches 0
          return prevCounter;
        }
      });
    }, 1000);
    // Clean up the interval
    return () => clearInterval(intervalId);
  }, [reSendOtpCounter]);

  // send the resend status is false
  useEffect(() => {
    if (reSendOtpCounter === 0) {
      setResendStatus(false);
    }
  }, [reSendOtpCounter]);

  // Match otp for the User
  const MatchOtp = (e) => {
    e.preventDefault();
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    // here is random string to
    const randomString =
      Math.random().toString(20).substring(2, 14) +
      Math.random().toString(20).substring(2, 14);

    const deviceID = `${userAgent}-${platform}-${randomString}`;
    // validating the input
    if (number.length !== 10) {
      setMessage({
        status: false,
        message: `mobile number must be 10 digits`,
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (GetOtp.length !== 4) {
      setMessage({
        status: false,
        message: `otp must be 4 digits`,
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    let Payloads = {
      mobile_no: number,
      otp: GetOtp,
      device_id: deviceID,
      fcm_id: randomString,
    };
    // called the API and send back to the Users Profiles channels
    axios
      .post(
        `${Config.API_URL}/api/customer/matchotp`,
        JSON.parse(JSON.stringify(Payloads)),
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        if (!response.data.status) {
          setMessage({
            status: false,
            message: `${response.data.message}`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
        localStorage.setItem("AccessLogin", JSON.stringify(response.data.data));

        // check if current location path name is root path something like that
        if(CurrentLocation.pathname === '/cab-listing'){
          setShow(false)
          // here reset the form using resets
          if(formRef.current){
             formRef.current.reset();
          }
          // closed the tabs
          setMessage({
            status: true,
            message: `Login success !`,
          });
          setStatus(true);
          const timer = setTimeout(() => {
            setStatus(false);
          }, 3000);
          return () => clearTimeout(timer);
        }else {
          Navigations("/dashboard/my-profile");
        }        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setShow(OpenLoginPops);
  }, [OpenLoginPops]);

  const LogoutUsers = useCallback((e) => {
    // clearing session storages
    e.preventDefault();
    let Payloads = {
      _id: LoginStatus._id,
    };
    // called the backend API to Logout
    axios
      .post(
        `${Config.API_URL}/api/customer/logout`,
        JSON.parse(JSON.stringify(Payloads)),
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status) {
          localStorage.removeItem("AccessLogin");
          Navigations("/");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <AlertPopupMessage />
      <Modal
        className="loginpop"
        show={show ?? OpenLoginPops}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={MatchOtp} ref={formRef}>
            <Form.Group className="mb-3 position-relative" controlId="">
              <Form.Label>Mobile Number</Form.Label>
              <img src={mob} />
              <Form.Control
                type="number"
                placeholder="Enter your mobile number"
                value={number}
                maxLength={10}
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value)) {
                    setNumber(e.target.value);
                  }
                }}
              />
              <button onClick={GeneratesOtp} className="smltrns_btn">
                Send OTP
              </button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Enter OTP received</Form.Label>
              {/* manage the OTP Errors */}
              <Form.Control
                type="number"
                placeholder="Enter 4 digit OTP"
                value={GetOtp}
                maxLength={4}
                onChange={(e) => {
                  if (/^\d{0,4}$/.test(e.target.value)) {
                    setOtp(e.target.value);
                  }
                }}
              />
              {resendStatus ? (
                <>
                  <p>Resend OTP in {reSendOtpCounter} Second</p>
                </>
              ) : (
                <>
                  <button onClick={Re_Send_OTP} className="smltrns_btn">
                    Resend
                  </button>
                </>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit <ArrowForwardIcon />
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Ul open={open}>
        <div className="mobprofl_menu">
          <img src={user} />
          <h6>Guest User</h6>
          <p>
            Sign up and get job or internship assurance benefits right from
            start
          </p>
        </div>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="/">
            {" "}
            Home{" "}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="register">
            {" "}
            Register your taxi{" "}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="https://play.google.com/store/apps/details?id=com.buzzwaycustomer&hl=en">
            <img src={download} alt='downloads apps'/> Download Our App
          </NavLink>
        </li>
        <li className="nav-item">
          <div class="hdrbtn">
            <a href="tel:+91-9054865866" className="sitehdrbtn">
              Call +91-9054865866
            </a>
          </div>
        </li>
        {Object.entries(LoginStatus).length === 0 ? (
          <li className="nav-item">
            <NavLink className="nav-link" onClick={handleShow}>
              <img src={user} /> Login
            </NavLink>
          </li>
        ) : (
          <li className="d-flex">
            <PersonIcon />
            <NavDropdown title={LoginStatus.full_name} id="basic-nav-dropdown">
              <NavDropdown.Item href="/dashboard/my-profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => LogoutUsers(e)}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        )}

        <div className="moblmenu_btn">
          <a href="" className="navbtn">
            Login
          </a>
        </div>
      </Ul>
    </>
  );
};

export default RightNav;
