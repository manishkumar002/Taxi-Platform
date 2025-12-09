import React , {useState , useEffect} from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

import Home from "./Home";
import Navbar from "./Navbar";
import Cab_listing from "./Cab-listing";
import Success from "./Success";
import About from "./About";
import Register from "./Register";
import Services from "./Services";
import Service_details from "./Service-details";
import Cms from "./Cms-page";
import Terms_conditions from "./Terms-conditions";
import ProtectedRoutes from "./ProtectedRoutes.js";

import { Route, Routes, Navigate } from "react-router-dom";



import Dash_nav from "./Dashboard/Dash-nav";
import My_bookings from "./Dashboard/MY-bookings";
import View_booking from "./Dashboard/View-bookings";
import My_profile from "./Dashboard/My-profile";
import Wallet from "./Dashboard/Wallet";
import Referearn from "./Dashboard/Refer-earn";
import { useLocation } from "react-router-dom";
import PrivacyAndPolicy from "./PrivacyPolicy.js";
import RefundPolicy from "./RefundPolicy.js";
import BookingSlip from "./BookingSlip/BookingSlips.js";
import ReviewsList from "./reviews_list/reviews_list.js";
import BookingConfirmationInvoice from "./BookingInvoice/buzzwayInvoice/BookingInvoice.js";
import ContactUs from "./ContactUs.js";
import saveSitemap from "./sidemap.js";



function App() {
 // here i'm calling the webpages in to save the files data
  // useEffect(() => {
  //   saveSitemap();
  // } , [])

  const CurrentLocations = useLocation();
  return (
    <>
    {
       CurrentLocations.pathname.includes('dashboard') ?
        <Dash_nav/> : <Navbar /> 
    }
     <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/cab-listing' element={<Cab_listing/>} />
            <Route exact path='/booking/success' element={<Success/>} />
            <Route exact path='/about-us' element={<About/>} />
            <Route exact path='/contact-us' element={<ContactUs/>} />
            <Route exact path='/register' element={<Register/>} />
            <Route exact path='/services' element={<Services/>} />
            <Route exact path='/service-details' element={<Service_details/>} />
            <Route exact path='/:city_seo_url' element={<Cms/>} />
            <Route exact path='/terms-conditions' element={<Terms_conditions/>} />
            <Route exact path="/privacy-policy" element={<PrivacyAndPolicy />}/>
            <Route  path="/refund-Policy" element={<RefundPolicy />}/>
            <Route path="/reviews" element={<ReviewsList />} />
          
            <Route exact path='dashboard/my-bookings' element={<ProtectedRoutes Components={My_bookings} />} />
            <Route exact path='dashboard/view-booking/:id' element={<ProtectedRoutes Components={View_booking} />} />
            <Route exact path='dashboard/my-profile' element={<ProtectedRoutes Components={My_profile} />} />
            <Route exact path='dashboard/wallet' element={<ProtectedRoutes Components={Wallet} />} />
            <Route exact path='dashboard/refer-earn' element={<ProtectedRoutes Components={Referearn} />} />
            <Route exact path='Booking/slip/:id' element={<ProtectedRoutes Components={BookingSlip} />}  />
            <Route exact path='Booking/invoice/:id' element={<ProtectedRoutes Components={BookingConfirmationInvoice} />}  />
        </Routes>
    </>
  );
}

export default App;
