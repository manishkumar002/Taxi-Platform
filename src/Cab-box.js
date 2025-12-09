import React, { useState, useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import Modal from "react-bootstrap/Modal";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Spinner from "react-bootstrap/Spinner";
import Config from "./Config/Config";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Card,
} from "react-bootstrap";
import { LoginPopupContext } from "./Context/ShowLoginPopup";
import moment from "moment";
import axios from "axios";
import { AlertContext } from "./Context/AlertsPopusContext";
import { PropagateLoader } from "react-spinners";

const Cab_box = ({ values, vahicleList, fairList }) => {
  const { OpenLoginPops, setOpen } = useContext(LoginPopupContext);
  const { setMessage, setStatus } = useContext(AlertContext);
  const Navigate = useNavigate();
  const LoginUsers = JSON.parse(localStorage.getItem("AccessLogin")) ?? {};
  const CabListingData = JSON.parse(localStorage.getItem("cab_listing")) ?? {};
  const [generateId, setGenerateId] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [handleReferalCode, setReferralCode] = useState(true);
  const [handleFliteInput, setFliteInput] = useState(true);
  const [full_name, setFull_name] = useState("");
  const [mobile_no, setMobileNumber] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [address, setAddress] = useState(
    CabListingData.to_city ? CabListingData.to_city : ""
  );
  const [PaymentMode, setPaymentMode] = useState("");
  const [createBookingResponse, setCreateBookingResponse] = useState({});
  const [buttonSpiner, setButtonSpiner] = useState(false);
  const [rechargeResponse, setRespone] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showCouponModels, setCouponModels] = useState(false);
  const [coupon_code, setCoupon_code] = useState("");
  const [coupon_Api_Response, set_Coupon_Api_Response] = useState([]);
  const [CouponSpinner, setCouponSpinner] = useState(false);
  const [seats, setSeates] = useState(0);
  const [advancePayment, setAdvancePayment] = useState(0);

  // use useMemo to handle the login users dependency

  // handle the new pages open
  const handleLinkClick = (event) => {
    event.preventDefault();
    window.open("/terms-conditions", "_blank", "noopener,noreferrer");
  };

  // handle open coupon models here
  const handleShowCoupon = () => setCouponModels(true);
  // handle close coupon models
  const handleCloseCoupon = () => setCouponModels(false);

  // handle booking models
  const [showBook, setShowBook] = useState(false);
  const handleShowBookClose = () => setShowBook(false);
  // const LoginUsers = useMemo(() => {
  //    return JSON.parse(localStorage.getItem('AccessLogin')) ?? {};
  //  }, [showBook]);
  const handleShowBookOpen = () => {
    // check the user is login ? if not Login render open the Login Popup
    if (Object.entries(LoginUsers).length < 1) {
      return setOpen(true);
    }
    setShowBook(true);
  };

  /***************** create a Book api users data check if users have data *********/
  useEffect(() => {
    if (Object.entries(LoginUsers).length > 0) {
      setFull_name(LoginUsers.full_name);
      setMobileNumber(LoginUsers.mobile_no);
      setEmail_id(LoginUsers.email_id);
    }
  }, [showBook]);
  /************** create Booking API response ****************************/
  const HandleCreateBookingAPI = async (e) => {
    e.preventDefault();
    setButtonSpiner(true);
    if (PaymentMode === "" || PaymentMode.length < 1) {
      e.preventDefault();
      setMessage({
        status: false,
        message: "Please select the Payment mode",
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      // Return a cleanup function to clear the timeout when the component unmount
      setButtonSpiner(false);
      return () => clearTimeout(timer);
    }
    if (seats <= 0) {
      setMessage({
        status: false,
        message: "Please select the Passenger",
      });
      setStatus(true);
      const timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      // Return a cleanup function to clear the timeout when the component unmount
      setButtonSpiner(false);
      return () => clearTimeout(timer);
    }
    // CabListing payloads
    let Payloads = {
      trip_type: `${CabListingData.trip_type}`,
      user_id: `${LoginUsers._id}`,
      user_name: `${full_name}`,
      user_mobile: `${mobile_no}`,
      user_email: `${email_id}`,
      from_city_id: `${CabListingData.from_city_id}`,
      from_state_id: `${CabListingData.from_state_id}`,
      from_city: `${CabListingData.from_city}`,
      pickup_date: `${moment(CabListingData.pickup_date).format(
        "DD-MMM-YYYY"
      )}`,
      pickup_time: `${
        CabListingData.pickup_time.length < 1
          ? moment().format("hh:mm a")
          : CabListingData.pickup_time
      }`,
      drop_date: `${moment(CabListingData.drop_date).format("DD-MMM-YYYY")}`,
      package_name: `${
        CabListingData.trip_type === "local" ? CabListingData.package : ""
      }`,
      to_city_id: `${CabListingData.to_city_id}`,
      to_city_name: `${CabListingData.to_city}`,
      google_kms: `${values.fare_details.fixed_km}`,
      travel_route: `${values.travel_route}`,
      days: values.days,
      base_fixed_fare: `${values.fare_details.base_fixed_fare}`,
      fixed_kms: `${values.fare_details.fixed_kms}`,
      fixed_hours:
        values.fare_details.fixed_hours &&
        values.fare_details.fixed_hours !== ""
          ? values.fare_details.fixed_hours
          : "",
      per_km_charge: `${values.fare_details.per_km_charge}`,
      driver_charge: `${values.fare_details.driver_charge}`,
      night_charge: `${values.fare_details.night_charge}`,
      per_min_charge: values.fare_details.per_min_charge,
      ex_pickup_charge: values.fare_details.ex_pickup_charge,
      ex_drop_charge: values.fare_details.ex_drop_charge,
      estimated_kms: `${values.fare_details.estimated_kms}`,
      total_trip_amount: `${values.fare_details.total_trip_amount}`,
      gst_percentage: `${values.fare_details.gst_percentage}`,
      gst_amount_on_total_trip_amount: `${values.fare_details.gst_amount_on_total_trip_amount}`,
      coupon_code: coupon_code.length > 0 ? coupon_code : "",
      discount_amount: discountAmount > 0 ? discountAmount : "",
      payment_mode: `${PaymentMode}`,
      cab_id: `${values.vehicle_category_id}`,
      total_trip_amount_with_gst: `${values.fare_details.total_trip_amount_with_gst}`,
      category_name: `${vahicleList[0].category}`,
      model_name: `${vahicleList[0].model_list.modelname}`,
      cab_image: `${vahicleList[0].model_list.image_name}`,
      seats: seats,
      advance_payment: advancePayment ? advancePayment : values.Advance_payment,
    };
    // called the APi response here to manage the data
    try {
      let response = await axios.post(
        `${Config.API_URL}/api/customer/booking/create`,
        Payloads
      );
      if (response.data.status) {
        setCreateBookingResponse(response.data.data);
      } else {
        setCreateBookingResponse({});
        setButtonSpiner(false);
        setMessage({
          status: false,
          message: "Something went wrong",
        });
        setStatus(true);
        const timer = setTimeout(() => {
          setStatus(false);
        }, 3000);
        // Return a cleanup function to clear the timeout when the component unmount
        setButtonSpiner(false);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.log(error);
      setCreateBookingResponse({});
    }
  };
  /*********************** booking capture  ********************************/

  /****************************  features  *******************************************/
  const BookingCaptureAPI = async (userId, booking_doc_id) => {
    let PayLoads = {
      user_id: `${userId}`,
      booking_collection_id: `${booking_doc_id}`,
    };
    axios
      .post(`${Config.API_URL}/api/customer/booking/capture`, PayLoads)
      .then((response) => {
        if (response.data.status) {
          localStorage.setItem(
            "Booking_id",
            JSON.stringify(response.data.data)
          );
          let PayLoads = {
            _id: "",
            Booking_id: `${response.data.data.booking_id}`,
          };
          axios
            .post(`${Config.API_URL}/admin_api/sendMail`, PayLoads)
            .then((response) => {
              console.log(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
          if (PaymentMode === "advance") {
            LoginUsers["wallet_balance"] =
              LoginUsers.wallet_balance - values.Advance_payment;
          } else {
            LoginUsers["wallet_balance"] =
              LoginUsers.wallet_balance -
              values.fare_details.total_trip_amount_with_gst;
          }
          localStorage.removeItem("AccessLogin");
          localStorage.setItem("AccessLogin", JSON.stringify(LoginUsers));
          Navigate("/booking/success");
        }
      })
      .catch((err) => {
        console.log(err);
        setButtonSpiner(false);
      });
  };

  /************************* Send Email for Confirm Booking  ************/

  /****************************  features  *******************************************/

  useEffect(() => {
    if (Object.entries(createBookingResponse).length > 0) {
      /********* here if payment mode cash then called the booking capture API */
      if (PaymentMode === "cash") {
        setButtonSpiner(true);
        BookingCaptureAPI(LoginUsers._id, createBookingResponse.booking_doc_id);
      } else if (
        ["wallet"].includes(PaymentMode) &&
        parseInt(values.fare_details.total_trip_amount_with_gst) >
          LoginUsers.wallet_balance
      ) {
        let addAmount = 0;
        if (["wallet"].includes(PaymentMode)) {
          let totalTripAmountWithGST =
            values.fare_details.total_trip_amount_with_gst;
          totalTripAmountWithGST = parseFloat(totalTripAmountWithGST);
          // Check if the parsing was successful and it's not NaN
          if (
            !isNaN(totalTripAmountWithGST) &&
            !isNaN(LoginUsers.wallet_balance)
          ) {
            addAmount = totalTripAmountWithGST - LoginUsers.wallet_balance;
            // Proceed with your calculations or operations
          } else {
            console.log(
              "Error: Unable to parse total trip amount with GST or wallet amount as a number."
            );
          }
        }
        // Prepare the Payload for the Betters API call
        let GenIdPayload = {
          user_id: LoginUsers._id,
          amount: addAmount, // Ensure addAmount is rounded to 2 decimal places
          online_charge: "2.33",
        };
        // called payment Initialed Api here
        console.log(GenIdPayload, "this is id payloads data ,");
        axios
          .post(
            `${Config.API_URL}/api/customer/generate_order_id`,
            GenIdPayload,
            {
              headers: {
                Authorization: `${Config.API_ACCESS_TOKEN}`,
              },
            }
          )
          .then((response) => {
            console.log(response.data, "generates id data");
            if (response.data.status) {
              setGenerateId(response.data.data);
              const options = {
                key: `${Config.ROZAR_PAY_KEY}`,
                amount: response.data.data.amount,
                currency: "INR",
                image: `${LoginUsers.profile_image}`,
                description: "this is test transaction ",
                name: "Buzzway Payment",
                handler: function (response) {
                  setRespone(response);
                },
                prefill: {
                  name: `${LoginUsers.full_name}`,
                  email: `${LoginUsers.email_id}`,
                  contact: `${LoginUsers.mobile_no}`,
                },
                theme: {
                  color: "#F37254",
                },
              };

              const rzp = new window.Razorpay(options);
              rzp.open();
            } else {
              setGenerateId({});
            }
          })
          .catch((err) => {
            setGenerateId({});
            console.log(err);
          });
        // here the capture Amount is that there are tow
      } else if (
        ["wallet"].includes(PaymentMode) &&
        parseInt(values.fare_details.total_trip_amount_with_gst) <=
          LoginUsers.wallet_balance &&
        values.Advance_payment <= LoginUsers.wallet_balance
      ) {
        setButtonSpiner(true);
        BookingCaptureAPI(LoginUsers._id, createBookingResponse.booking_doc_id);
      } else if (["advance"].includes(PaymentMode)) {
        let addAmount = 0;
        if (
          ["advance"].includes(PaymentMode) &&
          advancePayment > LoginUsers.wallet_balance
        ) {
          let totalTripAmountWithGST = advancePayment;
          totalTripAmountWithGST = parseFloat(totalTripAmountWithGST);
          // Check if the parsing was successful and it's not NaN
          if (
            !isNaN(totalTripAmountWithGST) &&
            !isNaN(LoginUsers.wallet_balance)
          ) {
            addAmount = totalTripAmountWithGST - LoginUsers.wallet_balance;
            // Proceed with your calculations or operations
          } else {
            console.log(
              "Error: Unable to parse total trip amount with GST or wallet amount as a number."
            );
          }

          let GenIdPayload = {
            user_id: LoginUsers._id,
            amount: addAmount, // Ensure addAmount is rounded to 2 decimal places
            online_charge: "2.33",
          };
          // called payment Initialed Api here
          axios
            .post(
              `${Config.API_URL}/api/customer/generate_order_id`,
              GenIdPayload,
              {
                headers: {
                  Authorization: `${Config.API_ACCESS_TOKEN}`,
                },
              }
            )
            .then((response) => {
              console.log(response.data, "generates id data");
              if (response.data.status) {
                setGenerateId(response.data.data);
                const options = {
                  key: `${Config.ROZAR_PAY_KEY}`,
                  amount: response.data.data.amount,
                  currency: "INR",
                  image: `${LoginUsers.profile_image}`,
                  description: "this is test transaction ",
                  name: "Buzzway Payment",
                  handler: function (response) {
                    setRespone(response);
                  },
                  prefill: {
                    name: `${LoginUsers.full_name}`,
                    email: `${LoginUsers.email_id}`,
                    contact: `${LoginUsers.mobile_no}`,
                  },
                  theme: {
                    color: "#F37254",
                  },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
              } else {
                setGenerateId({});
              }
            })
            .catch((err) => {
              setGenerateId({});
              console.log(err);
            });
        } else if (
          ["advance"].includes(PaymentMode) &&
          advancePayment <= LoginUsers.wallet_balance
        ) {
          setButtonSpiner(true);
          BookingCaptureAPI(
            LoginUsers._id,
            createBookingResponse.booking_doc_id
          );
        }
      }
    }
  }, [createBookingResponse]);
  /**************************** Recharge capture Amount *******************************/
  useEffect(() => {
    if (Object.entries(generateId).length > 0) {
      const payloads = {
        user_id: `${generateId.user_id}`,
        orderid: `${generateId.orderid}`,
        razor_payid: `${rechargeResponse.razorpay_payment_id}`,
      };
      axios
        .post(`${Config.API_URL}/api/customer/capture_amount`, payloads, {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          if (response.data.status) {
            LoginUsers["wallet_balance"] = response.data.data.wallet_balance;
            localStorage.removeItem("AccessLogin");
            localStorage.setItem("AccessLogin", JSON.stringify(LoginUsers));
            // called the Booking API here
            BookingCaptureAPI(
              LoginUsers._id,
              createBookingResponse.booking_doc_id
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rechargeResponse]);

  const handleDiscountAmount = async (coupon) => {
    let Paylods = {
      trip_type: `${values.trip}`,
      coupon_code: `${coupon}`,
      total_amount: `${values.fare_details.total_trip_amount_with_gst}`,
    };
    setCoupon_code(coupon);
    setButtonSpiner(true);
    try {
      let response = await axios.post(
        `${Config.API_URL}/api/customer/coupon/apply`,
        Paylods,
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      );
      if (response.data.status) {
        setDiscountAmount(response.data.data.discount_amount);
        setCouponModels(false);
        setButtonSpiner(false);
        setMessage({
          status: true,
          message: `${response.data.message}`,
        });
        setStatus(true);
        let timer = setTimeout(() => {
          setStatus(false);
        }, 3000);
        return () => clearTimeout(timer);
      } else {
        setButtonSpiner(false);
        setMessage({
          status: false,
          message: `${response.data.message}`,
        });
        setStatus(true);
        let timer = setTimeout(() => {
          setStatus(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      setButtonSpiner(false);
      setMessage({
        status: false,
        message: `${error}`,
      });
      setStatus(true);
      let timer = setTimeout(() => {
        setStatus(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  };

  // called the coupon Api and render the data in Api called
  const handleCoupanApi = async () => {
    setCouponSpinner(true);
    let Paylods = {
      trip_type: `${values.trip}`,
      city_id: `${values.from_city_id}`,
    };

    // called coupon api
    try {
      let response = await axios.post(
        `${Config.API_URL}/api/customer/coupon/list`,
        Paylods,
        {
          headers: {
            Authorization: `${Config.API_ACCESS_TOKEN}`,
          },
        }
      );
      if (response.data.status) {
        set_Coupon_Api_Response(response.data.data);
        setCouponSpinner(false);
      } else {
        set_Coupon_Api_Response([]);
        setCouponSpinner(false);
      }
    } catch (error) {
      console.log(error);
      set_Coupon_Api_Response([]);
      setCouponSpinner(false);
    }
  };
  useEffect(() => {
    if (showCouponModels) {
      handleCoupanApi();
    }
  }, [showCouponModels]);

  /************** create Booking Api end *********************************/
  const imagePath = `${Config.IMG}${vahicleList[0].model_list.image_name}`;

  /******************* Helper functions for Camel case **********************/
  const TripTypeName = (str) => {
    let first = str[0];
    let rest = str.slice(1);
    return first.toUpperCase() + rest.toLowerCase();
  };

  /********************* handle the seats options here */
  const numberOfSeats = vahicleList[0].model_list?.no_of_seats || 0;

  const seatOptions = [];
  for (let i = 1; i <= numberOfSeats; i++) {
    seatOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  /******************** Handle throw the useEffect to Make a Advance payment **********/
  useEffect(() => {
    const calculateAdvancePayment = () => {
      if (PaymentMode === "advance") {
        const totalAmount = values.fare_details.total_trip_amount_with_gst;
        const advancePaymentPayment = values.Advance_payment;
        let withDiscountTotal = totalAmount - discountAmount;
        const totalTripAmountApplyCoupon = discountAmount
          ? (30 / 100) * withDiscountTotal
          : advancePaymentPayment;
        setAdvancePayment(totalTripAmountApplyCoupon);
      }
    };

    calculateAdvancePayment();
  }, [PaymentMode, values, discountAmount, advancePayment]);

  /*************************** handle this is button for show Booking */
  const getButtonText = () => {
    if (Object.entries(values).length === 0) {
      return "";
    }

    const totalAmount = values.fare_details.total_trip_amount_with_gst;

    const discountApplied = discountAmount > 0;

    switch (PaymentMode) {
      case "cash":
        const cashAmount = discountApplied
          ? totalAmount - discountAmount
          : totalAmount;
        return `₹${cashAmount} Book Now`;
      case "advance":
        //  const advanceAmount = discountApplied ? advancePayment - discountAmount : advancePayment;
        //  let withDiscountTotal = totalAmount - discountAmount;
        //  const totalTripAmountApplyCoupon = discountAmount ? (30 / 100) * withDiscountTotal : advancePayment
        //  setAdvancePayment(totalTripAmountApplyCoupon)
        return `₹${Math.ceil(advancePayment)} Make Payment in Advance`;
      default:
        const defaultAmount = discountApplied
          ? totalAmount - discountAmount
          : totalAmount;
        return `₹${defaultAmount} Make a Payment`;
    }
  };

  return (
    <>
      <div className="cabbox">
        <div className="cabimg">
          <img src={imagePath} />
        </div>
        <div className="cabtxt">
          <h5>
            {vahicleList[0].model_list.modelname} <span>or similar cars</span>
          </h5>
          <h4 className="fare">
            ₹{" "}
            {values.trip === "outstation"
              ? values.fare_details.total_trip_amount_with_gst
              : values.fare_details.total_trip_amount_with_gst}{" "}
          </h4>
          <div className="kms">
            <div className="d-flex justify-content-between">
              <p>Included Km</p>
              <p>{values.fare_details.estimated_kms} Km</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Extra fare Km</p>
              <p>₹ {values.fare_details.per_km_charge}/km</p>
            </div>
          </div>
          <div className="faresmry">
            <p onClick={handleShow}>
              <InfoIcon /> Fare Summary
            </p>
          </div>
          <div className="bookbtnrow">
            {/* <a href="#" className="sitebtn">Book Now</a> */}
            <Link className="sitebtn" onClick={handleShowBookOpen}>
              Book Now
            </Link>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        className="farepop"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Fare Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            <TaskAltIcon /> Fare Breakup
          </h4>
          <div className="w85 bt-dash d-flex justify-content-between">
            <p>Estimated Kms:</p>
            <p>{values.fare_details.estimated_kms} Km</p>
          </div>

          <div className="w85 bt-dash d-flex justify-content-between">
            <p>Estimated Amount:</p>
            <p>₹{values.fare_details.total_trip_amount}</p>
          </div>

          <div className="w85 bt-dash d-flex justify-content-between">
            <p>GST Amount ({values.fare_details.gst_percentage}%):</p>
            <p>₹{values.fare_details.gst_amount_on_total_trip_amount}</p>
          </div>

          <div className="w85 bt-dash d-flex justify-content-between">
            <p>Total Amount:</p>
            <p>
              ₹
              {parseFloat(
                values.fare_details.total_trip_amount_with_gst
              ).toFixed(2)}
            </p>
          </div>

          <h4>
            <TaskAltIcon /> Additional Charges (if any)
          </h4>
          <div className="w85 d-flex justify-content-between">
            <p>
              Usable {TripTypeName(values.trip)} Limit{" "}
              {values.fare_details.fixed_kms} kms
            </p>
          </div>
          <div className="w85 d-flex justify-content-between">
            <p>
              After {values.fare_details.fixed_kms} Km extra charges ₹
              {values.fare_details.per_km_charge} per Km{" "}
            </p>
          </div>
          <h5>
            <TaskAltIcon /> Inclusion: Base Fare, vehicle and fuel.
          </h5>
          <h5>
            <TaskAltIcon /> Exclusion: Parking Charge, Airport Entry Charge
          </h5>

          <h6 className="note">Note</h6>
          <ul className="notslist">
            <li>Charges includes in your fare - Tax and fuel charges.</li>
            <li>Km and timing will be charged from customer location.</li>
            <li>
              Car shall not be used for local use in {values.from_city} after
              completion of {TripTypeName(values.trip)} duty.
            </li>
            <li>
              In case booking cancelled then inform to us before 24 hrs in then
              pickup time.
            </li>
            <li>
              This is an estimated cost and may vary depending upon Km/hrs
              driven.
            </li>
            <li>Night charge will be applicable from 10:00 PM to 7:00 AM.</li>
          </ul>
        </Modal.Body>
      </Modal>
      {/* handle show books models */}
      <Modal
        size="lg"
        className="farepop"
        show={showBook}
        onHide={handleShowBookClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* form create is here */}
          <Container>
            <Form onSubmit={(e) => HandleCreateBookingAPI(e)}>
              <Form.Group controlId="formFullName">
                <Form.Label>Your full name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMobileNumber">
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+91-your mobile number"
                  value={mobile_no}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmailID">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="xyz@mail.com"
                  value={email_id}
                  onChange={(e) => setEmail_id(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPickupAddress">
                <Form.Label>Pickup address</Form.Label>
                <Form.Control
                  placeholder="complete Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group
                controlId="formNumberOfPassengers"
                className="Passenger_d_changes"
              >
                <Form.Label style={{ width: "50%" }}>
                  Number of passengers
                </Form.Label>
                {/* <Form.Control style={{ width: '50%' }} type="number" min="1" max="4" placeholder="Enter number between 1-4" /> */}
                {/* <Form.Select style={{ width: '50%' }} aria-label="Default select example" onChange={(e) => setSeates(e.target.value)} required>
                           <option>Select the Seats Between 1 to {numberOfSeats}</option>
                           {seatOptions}
                        </Form.Select> */}
                <Form.Select
                  style={{ width: "50%" }}
                  aria-label="Select seats"
                  onChange={(e) => setSeates(e.target.value)}
                  required
                >
                  <option>Select the Seats Between 1 to 10</option>

                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {handleReferalCode ? (
                <Form.Group
                  controlId="formFlightNumber"
                  className="Removable-input"
                >
                  <div className="removeInputStyle">
                    <Form.Label>Coupon Code</Form.Label>
                    <RemoveIcon
                      style={{ fontSize: "2rem", color: "black" }}
                      onClick={(e) => setReferralCode(false)}
                    />
                  </div>
                  <div style={{ width: "95%" }}>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon_code}
                        onChange={(e) => setCoupon_code(e.target.value)}
                      />
                      {discountAmount > 0 ? (
                        <Button
                          variant="primary"
                          id="button-addon2"
                          onClick={(e) => {
                            setCoupon_code("");
                            setDiscountAmount(0);
                          }}
                        >
                          Cancel Coupon
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          id="button-addon2"
                          onClick={handleShowCoupon}
                        >
                          Check Coupon
                        </Button>
                      )}
                    </InputGroup>
                  </div>
                </Form.Group>
              ) : (
                <div
                  className="d-flex align-content-center justify-content-end mt-3"
                  style={{ backgroundColor: "#E4EEFF", width: "100%" }}
                >
                  <AddIcon
                    style={{ fontSize: "2rem", color: "black" }}
                    onClick={(e) => {
                      // console.log('hey im running');
                      e.preventDefault();
                      setReferralCode(true);
                    }}
                  />
                </div>
              )}

              {handleFliteInput ? (
                <Form.Group
                  controlId="formFlightNumber"
                  className="Removable-input"
                >
                  <div className="removeInputStyle">
                    <Form.Label>Flight details</Form.Label>
                    <RemoveIcon
                      style={{ fontSize: "2rem", color: "black" }}
                      onClick={(e) => setFliteInput(false)}
                    />
                  </div>
                  <div style={{ width: "95%" }}>
                    <Form.Control
                      type="text"
                      placeholder="Enter flight number"
                      className="inputBox"
                    />
                  </div>
                </Form.Group>
              ) : (
                <div
                  className="d-flex align-content-center justify-content-end mt-3"
                  style={{ backgroundColor: "#E4EEFF", width: "100%" }}
                >
                  <AddIcon
                    style={{ fontSize: "2rem", color: "black" }}
                    onClick={(e) => {
                      //   console.log('hey im running');
                      e.preventDefault();
                      setFliteInput(true);
                    }}
                  />
                </div>
              )}

              <Form.Group>
                <p>
                  By Clicking 'Make Payment', you are confirming that you have
                  read, understood accept out{" "}
                  <Link to={"/terms-conditions"} onClick={handleLinkClick}>
                    <span style={{ color: "blue" }}>Terms & Conditions</span>
                  </Link>
                </p>
              </Form.Group>

              <Form.Group className="FootersHandle">
                <Form.Label>Payment Mode *</Form.Label>
                <Row className="g-2">
                  <Col md>
                    <Form.Select
                      aria-label="Floating label select example"
                      value={PaymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    >
                      <option>Select A payment Method</option>
                      <option value="cash">Pay To Driver</option>
                      <option value="wallet">Pay Full Payment</option>
                      <option value="advance">Pay Advance</option>
                    </Form.Select>
                  </Col>
                  <Col md>
                    {buttonSpiner ? (
                      <Button
                        variant="primary"
                        style={{ width: "100%" }}
                        disabled
                      >
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : (
                      <Button
                        className=""
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        {/* {
                                          PaymentMode === 'cash' ? `₹${Object.entries(values).length > 0 ? (discountAmount > 0 ? values.fare_details.total_trip_amount_with_gst - discountAmount : values.fare_details.total_trip_amount_with_gst) : ''} Book Now`
                                          ? PaymentMode === 'Advance'   ? `₹${Object.entries(values).length > 0 ? (discountAmount > 0  ? values.Advance_payment - discountAmount : values.Advance_payment) : ''} Make Payment in Advance`:''                                             
                                          : `₹${Object.entries(values).length > 0 ? (discountAmount > 0 ? values.fare_details.total_trip_amount_with_gst - discountAmount : values.fare_details.total_trip_amount_with_gst) : ''} Make a Payment`
                                       } */}
                        {getButtonText()}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Coupon models showing pops */}

      <Modal
        show={showCouponModels}
        onHide={handleCloseCoupon}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Available Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {CouponSpinner ? (
            <Container>
              <Col className="d-flex align-items-center justify-content-center">
                <PropagateLoader size={18} color="#185dcc" />
              </Col>
            </Container>
          ) : coupon_Api_Response.length > 0 ? (
            coupon_Api_Response.map((value, index) => {
              return (
                <>
                  <Container key={index} className="coupon_style">
                    <Row>
                      <Col className="col_style">
                        <Button
                          className="btn_style"
                          style={{
                            backgroundColor: "white",
                            border: "2px dashed green",
                            color: "black",
                          }}
                        >
                          {value.coupon_code}
                        </Button>
                        <p
                          style={{ textAlign: "center", paddingTop: "0.5rem" }}
                        >
                          {value.coupon_title}
                        </p>
                      </Col>
                      <Col
                        className="col_style"
                        style={{ justifyContent: "space-around" }}
                      >
                        <h4>FLAT {value.coupon_value} INR of</h4>
                        <Button
                          onClick={(e) =>
                            handleDiscountAmount(value.coupon_code)
                          }
                        >
                          Apply Coupon
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                  <hr></hr>
                </>
              );
            })
          ) : (
            <>
              <h2>Discount Coupon is not available on perticular roots</h2>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Cab_box;
