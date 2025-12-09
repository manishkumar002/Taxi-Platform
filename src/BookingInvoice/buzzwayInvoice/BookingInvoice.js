import React , {useState , useEffect} from 'react';
import logo from './logo.png'
import icons from './icon.png'
import carImage from './car.png';
import footerImage from './footer logo.png'
import { useParams } from 'react-router-dom';
import Config from '../../Config/Config';
import axios from 'axios';

const BookingConfirmationInvoice = () => {
    const { id } = useParams();
    const [ApiResponse , setApiResponse] = useState({});
    const [company_details , setCompanyDetails] = useState({});

    const BookingAPIResponse = async () => {
        
        let paylods = {
            "_id":"",
            "Booking_id":`${id}`
        }

        axios.post(`${Config.API_URL}/api/customer/booking/details` , paylods , {
            headers: {
                Authorization: `${Config.API_ACCESS_TOKEN}`
            }
        })
        .then((response) => {
            if(response.data.status){
                setApiResponse(response.data.data)
            }else{
                setApiResponse([])
            }
        })
        .catch(err => {
            console.log(err);
            setApiResponse([])
        })
    }

    const TripTypeName = (str) => {
        // Trim whitespace and handle empty string
        if(!str || str === ''){
            return "";
        }
        str = str.trim();
        // Capitalize the first character and concatenate with the rest of the string
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const CompanyDetails = async () => {
        try {
            
            let response = await axios.get(`${Config.API_URL}/api/customer/company_details` , {
                headers: {
                    Authorization: `${Config.API_ACCESS_TOKEN}`
                }
            })
            if (response.data.status) {
                setCompanyDetails(response.data.data[0]);
            } else {
                setCompanyDetails([]); // Ensure to handle cases where status is false
            }    
            
        } catch (error) {
            console.log(error , 'someTing is happened here');
            setCompanyDetails([])
        }
    }
    useEffect(() => {
        BookingAPIResponse();
        CompanyDetails();
    } , [])

    const dropCityName = () => {
        switch(ApiResponse.trip_type){
            case 'outstation':
                let TraveltRootsArrays = ApiResponse.travel_route.split('|');
                return  TraveltRootsArrays[TraveltRootsArrays.length - 2];
            case 'local':
                return ApiResponse.package_name;
            default: 
              return ApiResponse.to_city
        }
    }
    //  handle travel routes error
    const handleTravelRoutesError = () => {

      switch(ApiResponse.trip_type){
        case 'outstation':
            let response =  ApiResponse.travel_route.split('|');
            response.splice(response.length-1 , 1);
            return response.join('|');
        case 'local':
            return ApiResponse.travel_route
        default:
            return ApiResponse.travel_route
      }
    }

    return (
        <>
            <table style={{ padding: '0px 0%', width: '800px', borderSpacing: 0, margin: '0px auto', border: '1px solid #f1ecec' }}>
                <thead>
                    <tr>
                        <th scope="col" colSpan={11} style={{ textAlign: 'start', paddingLeft: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}><img src={logo} style={{ maxWidth: '100%', height: 'auto' }} /></div>
                        </th>
                        <th scope="col" colSpan={1} style={{ textAlign: 'start', padding: '12px 12px' }}>
                            <span style={{ paddingBottom: '6px' }}>
                                <span style={{ color: '#323c42', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, letterSpacing: '0.56px' }}>Booking ID: 
                                    {ApiResponse.booking_id}</span><br />
                                <span style={{ color: '#323c42', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, letterSpacing: '0.56px' }}>Cab booked on {ApiResponse.add_date}</span>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody style={{ background: 'white' }}>
                    <tr style={{ background: '#fcae21' }}>
                        <td scope="col" colSpan={12} style={{ padding: '6px 30px 6px 30px' }}>
                            <span style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <span> <img src={icons} /></span>
                                <span>
                                    <span style={{ color: '#323c42', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, letterSpacing: '0.56px' }}>Thank you for booking with us
                                    </span><br />
                                    <span style={{ color: '#323c42', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 500, letterSpacing: '0.56px' }}>Dzire or Similar cab for {ApiResponse.pickup_date} is confirmed.</span>
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr style={{ background: '#fcae21' }}>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '6px', display: 'flex', alignItems: 'center', gap: '5px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                    <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                </svg>
                                Your car and driver details will be shared
                                <span style={{ color: '#174eb6' }}> 30 mins </span> before the
                                departure
                                time via email.
                            </span>
                        </td>
                    </tr>
                    <tr style={{ background: '#fcae21' }}>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 6px' }}>
                            <span style={{ background: 'white', padding: '6px', display: 'flex', alignItems: 'center', gap: '5px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                    <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                </svg>
                                Your pickup time is schedule at
                                <span style={{ color: '#174eb6' }}>{ApiResponse.pickup_date}</span>
                            </span></td>
                    </tr>
                </tbody>
                <tbody style={{ background: '#E6E9EE' }}>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', background: 'white', marginTop: '10px', padding: '10px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                Trip Details
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', gap: '38px', background: 'white' }}>
                                <span style={{ background: 'white', display: 'block', border: '2px solid white', paddingLeft: '20px' }}><img src={ApiResponse.img_path} style={{minHeight:'150px'}} /> </span>
                                <span style={{ background: 'white', padding: '24.2px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block' }}>
                                    Dzire or Similar Petrol
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', background: 'white' }}>
                                <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '18.955px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.663px', padding: '2px', textAlign: 'center' }}>{ApiResponse.pickup_date} </span>
                                <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '18.955px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.663px', padding: '2px', textAlign: 'center' }}>{ApiResponse.drop_date} </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-evenly', background: 'white' }}>
                                <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '11.847px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.415px', display: 'block', textAlign: 'center', padding: '12px' }}>
                                    {ApiResponse.pickup_date}
                                    <hr width="180px" height="1px" color="#b9b6b6" />
                                </span>
                                <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '11.847px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.415px', display: 'block', textAlign: 'center', padding: '6px' }}>
                                    <br />
                                    <hr width="180px" height="1px" color="#b9b6b6" />
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', gap: '64px', justifyContent: 'center', alignItems: 'center', background: 'white' }}>
                                <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '11.847px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.415px', display: 'block', textAlign: 'center', padding: '6px' }}>
                                   {ApiResponse.from_city}
                                </span>
                                <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '11.847px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.415px', display: 'block', textAlign: 'center', padding: '6px' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={48} height={10} viewBox="0 0 68 16" fill="none">
                                        <path d="M67.2071 8.70711C67.5976 8.31658 67.5976 7.68342 67.2071 7.29289L60.8431 0.928932C60.4526 0.538408 59.8195 0.538408 59.4289 0.928932C59.0384 1.31946 59.0384 1.95262 59.4289 2.34315L65.0858 8L59.4289 13.6569C59.0384 14.0474 59.0384 14.6805 59.4289 15.0711C59.8195 15.4616 60.4526 15.4616 60.8431 15.0711L67.2071 8.70711ZM0 9H66.5V7H0V9Z" fill="#1E1E1E" />
                                    </svg>
                                </span>
                                <span style={{ background: 'white', padding: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '11.847px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.415px', display: 'block', textAlign: 'center' }}>
                                { dropCityName() }
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                                <span style={{ background: 'white', display: 'block', padding: '1px' }}>
                                    <span style={{ background: 'white', padding: '6px 18px 6px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                        Trip Type
                                    </span>
                                    <span style={{ padding: '0px 18px', display: 'block', color: '#000', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.56px', background: 'white' }}>
                                        {ApiResponse.trip_type} ({ApiResponse.estimated_kms} kms included)
                                    </span>
                                    <span style={{ padding: '10px 18px', display: 'block', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', background: 'white' }}>
                                        {ApiResponse.per_km_charge}/ Km after {ApiResponse.estimated_kms} kms
                                    </span>
                                </span>
                                <span style={{ textAlign: 'end' }}>
                                    <span style={{ background: 'white', padding: '6px 18px 6px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                        Booked for
                                    </span>
                                    <span style={{ padding: '0px 18px', display: 'block', color: '#000', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.56px', background: 'white' }}>
                                        {ApiResponse.user_name}
                                    </span>
                                    <span style={{ padding: '10px 18px', display: 'block', color: '#000', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.56px', background: 'white' }}>
                                      {ApiResponse.user_mobile}
                                    </span>
                                </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody style={{ background: '#E6E9EE' }}>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '12px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', background: 'white', borderRadius: '10px' }}>
                                <span>
                                    <span style={{ background: 'white', borderTopLeftRadius: '10px', padding: '6px 18px 6px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                        What is included ?
                                    </span>
                                    {
                                        parseInt(ApiResponse.driver_charge) <= 0 &&
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                        </svg>
                                        Driver Allowance
                                    </span>
                                        
                                    }
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                        </svg>
                                        Toll Charges
                                    </span>
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                        </svg>
                                        State Tax
                                    </span>
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                        </svg>
                                        {ApiResponse.estimated_kms} kms
                                    </span>
                                    {
                                        ApiResponse.trip_type === 'outstation'
                                        ?
                                        <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', borderBottomLeftRadius: '10px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                        </svg>
                                           Only one pickup, but there can be multiple drop locations.
                                       </span>
                                       :
                                       <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', borderBottomLeftRadius: '10px' }}>
                                       <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                           <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                           <path d="M6.5 12L2 7.49997L2.707 6.79297L6.5 10.5855L13.293 3.79297L14 4.49997L6.5 12Z" fill="#22B14C" />
                                       </svg>
                                          Only one Pickup and drop location
                                      </span>
                                    }

                                </span>
                                <span style={{ textAlign: 'end' }}>
                                    <span style={{ background: 'white', borderTopRightRadius: '10px', padding: '6px 18px 6px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                        What is not included ?
                                    </span>
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#FF0000" />
                                        </svg>
                                        Fare beyond  {ApiResponse.estimated_kms} kms Rs {ApiResponse.per_km_charge}/kms
                                    </span>
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#FF0000" />
                                        </svg>
                                        Parking charges
                                    </span>
                                    <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#FF0000" />
                                        </svg>
                                        Night charges
                                    </span>
                                    {
                                        parseInt(ApiResponse.driver_charge) > 0 &&
                                        <span style={{ background: 'white', padding: '3px 20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <rect width={16} height={16} fill="white" style={{ mixBlendMode: 'multiply' }} />
                                            <path d="M12 4.7L11.3 4L8 7.3L4.7 4L4 4.7L7.3 8L4 11.3L4.7 12L8 8.7L11.3 12L12 11.3L8.7 8L12 4.7Z" fill="#FF0000" />
                                        </svg>
                                           Driver Allowance {ApiResponse.driver_charge} Rs.
                                       </span>
                                    }
                                </span>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody style={{ background: '#E6E9EE' }}>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', marginTop: '12px', padding: '6px 18px 6px 18px', display: 'block', color: '#174eb6', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                Payment Details
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', background: 'white' }}>
                                <span>
                                    <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', padding: '3px 20px', textAlign: 'start' }}>Total Price </span>
                                    {/* <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', padding: '3px 20px', textAlign: 'start' }}>Cab Charges </span> */}
                                    <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', padding: '3px 20px', textAlign: 'start' }}>Driver Charges (Included in Total Amount) </span>
                                    <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', padding: '3px 20px', textAlign: 'start' }}>Service Charges </span>
                                </span>
                                <span>
                                    <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block', textAlign: 'end', padding: '3px 20px' }}>
                                        Rs {ApiResponse.total_trip_amount}
                                    </span>
                                    {/* <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block', textAlign: 'end', padding: '3px 20px' }}>
                                        Rs 1860.00
                                    </span> */}
                                    <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block', textAlign: 'end', padding: '3px 20px' }}>
                                        Rs {ApiResponse.driver_charge}
                                    </span>
                                    <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block', textAlign: 'end', padding: '3px 20px' }}>
                                        Rs {ApiResponse.gst_amount}
                                    </span>
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td cope="col" colSpan={12} style={{ padding: '0px 30px 0px 30px' }}>
                            <span style={{ display: 'flex', justifyContent: 'space-between', background: 'white', borderTop: '1px solid grey' }}>
                                <span style={{ background: 'white', display: 'block', paddingLeft: '13px', color: '#000', fontFamily: 'Cabin', fontSize: '14px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.49px', padding: '3px 20px', textAlign: 'start' }}>To be Paid to driver</span>
                                <span style={{ background: 'white', color: '#000', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.42px', display: 'block', textAlign: 'end', padding: '3px 20px' }}>
                                    Rs {ApiResponse.final_trip_amount}
                                </span>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 0px 0px 30px' }}>
                            <span style={{ color: '#F00', background: 'white', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 500, lineHeight: 'normal', letterSpacing: '0.42px', padding: '0px 0px 0px 10px', marginRight: '30px', display: 'block', paddingBottom: '13px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                *Final outstanding will be calculated after trip completion
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tbody style={{ background: '#E6E9EE' }}>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', marginTop: '10px', padding: '6px 18px 6px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '16px', fontStyle: 'normal', fontWeight: 600, lineHeight: 'normal', letterSpacing: '0.56px' }}>
                                Cab Policies
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '0px 18px 3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px' }}>
                                • Charges includes in your fare - Tax and fuel charges.
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px' }}>
                                • Km and timing will be charged from customer location.
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                •  Car shall not be used for local use in {ApiResponse.from_city} after completion of {TripTypeName(ApiResponse.trip)} duty.
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                • In case booking cancelled then inform to us before 24 hrs in then pickup time.
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                • This is an estimated cost and may vary depending upon Km/hrs driven.
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td scope="col" colSpan={12} style={{ padding: '0px 30px' }}>
                            <span style={{ background: 'white', padding: '3px 18px', display: 'block', color: '#020202', fontFamily: 'Cabin', fontSize: '12px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.35px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                • Night charge will be applicable from 10:00 PM to 7:00 AM.
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot style={{ background: '#E6E9EE' }}>
                    <tr>
                        <td cope="col" colSpan={6} style={{ padding: '14px 0px 0px 45px' }}><span><img src={footerImage} /></span>
                        </td>
                        <td cope="col" colSpan={6} style={{ padding: '0px 30px 0px 0px', textAlign: 'end' }}>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={12} height={13} viewBox="0 0 12 13" fill="none">
                                    <g clipPath="url(#clip0_179_2529)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.2927 10.7966C10.9378 11.8753 9.54704 12.4135 8.55344 12.3238C7.19644 12.2011 5.71984 11.4812 4.59897 10.6885C2.95141 9.52314 1.40811 7.72071 0.508806 5.80787C-0.126761 4.45624 -0.269361 2.79411 0.675939 1.56208C1.02554 1.10668 1.40427 0.863642 1.97161 0.835275C2.75974 0.796942 2.87014 1.24774 3.14077 1.95001C3.34241 2.47518 3.61151 3.01108 3.76177 3.55541C4.04314 4.57124 3.05951 4.61341 2.93531 5.44371C2.85864 5.96734 3.49267 6.66961 3.77941 7.04298C4.33208 7.77014 5.009 8.39384 5.77887 8.88527C6.21587 9.16051 6.91967 9.65654 7.41954 9.38284C8.18927 8.96117 8.11721 7.66321 9.19284 8.10251C9.75021 8.32944 10.2899 8.65681 10.822 8.94354C11.6446 9.38591 11.6063 9.84437 11.2927 10.7966C11.5273 10.0851 11.0581 11.508 11.2927 10.7966Z" fill="#174EB6" fillOpacity="0.76" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_179_2529">
                                            <rect width="11.5" height="11.5" fill="white" transform="translate(0 0.833008)" />
                                        </clipPath>
                                    </defs>
                                </svg><span style={{ paddingLeft: '6px', color: 'rgba(23, 78, 182, 0.76)', fontFamily: 'Cabin', fontSize: '12.778px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.447px' }}>{company_details.care_number}</span>
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', margin: '4px' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={13} height={14} viewBox="0 0 13 14" fill="none">
                                    <g clipPath="url(#clip0_179_2523)">
                                        <path d="M10.6483 2.68457H2.12976C1.54145 2.68457 1.07027 3.16107 1.07027 3.74939L1.06494 10.1383C1.06494 10.7266 1.54145 11.2031 2.12976 11.2031H10.6483C11.2366 11.2031 11.7131 10.7266 11.7131 10.1383V3.74939C11.7131 3.16107 11.2366 2.68457 10.6483 2.68457ZM10.6483 4.8142L6.38902 7.47624L2.12976 4.8142V3.74939L6.38902 6.41142L10.6483 3.74939V4.8142Z" fill="#174EB6" fillOpacity="0.76" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_179_2523">
                                            <rect width="12.7778" height="12.7778" fill="white" transform="translate(0 0.555176)" />
                                        </clipPath>
                                    </defs>
                                </svg><span style={{ paddingLeft: '6px', color: 'rgba(23, 78, 182, 0.76)', fontFamily: 'Cabin', fontSize: '12.778px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.447px' }}>{company_details.company_web}</span>
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" fill="none">
                                    <g clipPath="url(#clip0_179_2531)">
                                        <path d="M5.75 0C2.575 0 0 2.575 0 5.75C0 8.925 2.575 11.5 5.75 11.5C8.925 11.5 11.5 8.925 11.5 5.75C11.5 2.575 8.925 0 5.75 0ZM6.2125 10.475C6.1875 10.475 6.1625 10.475 6.125 10.4875V7.775C6.775 7.7625 7.3625 7.75 7.9 7.7125C7.425 9.175 6.5375 10.15 6.2125 10.475ZM5.2875 10.475C4.95 10.1375 4.075 9.1625 3.6 7.7125C4.125 7.75 4.725 7.775 5.375 7.775V10.4875C5.35 10.4875 5.325 10.475 5.2875 10.475ZM1 5.75C1 5.4375 1.0375 5.125 1.0875 4.825C1.3625 4.775 1.8875 4.7 2.625 4.625C2.5625 4.9875 2.525 5.3625 2.525 5.7625C2.525 6.1625 2.5625 6.5375 2.6125 6.8875C1.8875 6.8125 1.35 6.7375 1.075 6.6875C1.0375 6.375 1 6.0625 1 5.75ZM3.2875 5.75C3.2875 5.325 3.3375 4.925 3.4125 4.55C3.9875 4.5125 4.6375 4.475 5.375 4.475V7.025C4.65 7.0125 3.9875 6.9875 3.4 6.9375C3.3375 6.575 3.2875 6.175 3.2875 5.75ZM6.2 1.025C6.5375 1.3625 7.4 2.3625 7.8875 3.7875C7.3625 3.75 6.775 3.725 6.125 3.725V1.0125C6.15 1.0125 6.175 1.025 6.2 1.025ZM5.375 1.0125V3.725C4.725 3.7375 4.1375 3.75 3.6125 3.7875C4.0875 2.3625 4.9625 1.3625 5.2875 1.025C5.325 1.025 5.35 1.0125 5.375 1.0125ZM6.125 7.025V4.475C6.85 4.4875 7.5125 4.5125 8.0875 4.55C8.1625 4.925 8.2125 5.325 8.2125 5.75C8.2125 6.175 8.175 6.575 8.1 6.95C7.525 6.9875 6.8625 7.0125 6.125 7.025ZM8.8625 4.625C9.6 4.7 10.125 4.775 10.4 4.825C10.4625 5.125 10.5 5.4375 10.5 5.75C10.5 6.0625 10.4625 6.375 10.4125 6.675C10.1375 6.725 9.6125 6.8 8.875 6.875C8.9375 6.5125 8.9625 6.1375 8.9625 5.7375C8.9625 5.3625 8.925 4.975 8.8625 4.625ZM10.175 4.025C9.825 3.975 9.325 3.9125 8.6875 3.85C8.3875 2.775 7.8625 1.9125 7.425 1.3C8.6875 1.775 9.6875 2.775 10.175 4.025ZM4.075 1.3C3.625 1.9 3.1125 2.7625 2.8125 3.8375C2.1875 3.8875 1.6875 3.9625 1.325 4.0125C1.8125 2.775 2.825 1.775 4.075 1.3ZM1.325 7.475C1.675 7.525 2.175 7.5875 2.8 7.65C3.1 8.725 3.6 9.5875 4.05 10.1875C2.8 9.7 1.8125 8.7125 1.325 7.475ZM7.45 10.1875C7.9 9.5875 8.4 8.7375 8.7 7.6625C9.325 7.6125 9.825 7.5375 10.175 7.4875C9.6875 8.7125 8.7 9.7 7.45 10.1875Z" fill="#174EB6" fillOpacity="0.76" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_179_2531">
                                            <rect width="11.5" height="11.5" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span style={{ paddingLeft: '4px', color: 'rgba(23, 78, 182, 0.76)', fontFamily: 'Cabin', fontSize: '12.778px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '0.447px' }}>{company_details.care_email}</span>
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    )
};

export default BookingConfirmationInvoice;
