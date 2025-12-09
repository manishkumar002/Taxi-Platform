import React  , {useState , useEffect} from "react";
import logo from './logo.png'
import { useParams } from "react-router-dom";
import Config from "../Config/Config";
import axios from 'axios'


const BookingSlip = () => {
    const { id } = useParams();
    const [ApiResponse , setApiResponse] = useState({});
    const [company_details , setCompanyDetails] = useState([]);
    const LoginUsers = JSON.parse(localStorage.getItem('AccessLogin')) ?? {};

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
            console.log(response.data , 'this is Booking details')
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
            setCompanyDetails([])
        }
    }
    useEffect(() => {
        BookingAPIResponse();
        CompanyDetails();
    } , [])

    // handle the drop city name
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
    // show handle payment show
    const handlePaymentShow = () => {
        // ApiResponse.payment_mode === 'wallet' ? 'Online' : 'Cash'
        switch(ApiResponse.payment_mode){
            case 'wallet':
                return 'Online'
            case 'advance':
                return 'Advance'
            default:
                return 'Cash'
        }
    }
    // handle payment show 
    const handlePaymentShowTripAmount = () => {

        switch(ApiResponse.payment_mode){
            case 'cash':
                return parseInt(ApiResponse.final_trip_amount) - parseInt(ApiResponse.booking_amount)
            case 'advance':
                return parseInt(ApiResponse.final_trip_amount) - parseInt(ApiResponse.booking_amount)
            default: 
                return parseInt(ApiResponse.final_trip_amount) - parseInt(ApiResponse.booking_amount)
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
        case 'airport':
            return ApiResponse.travel_route + " " +ApiResponse.to_city
        default:
            return ApiResponse.travel_route
      }
    }
    return (
        <>
            <div>
                <br /><table style={{ padding: '0px 0%', width: '800px', borderSpacing: 0, margin: '0px auto', border: '1px solid #f1ecec' }}>
                    <thead>
                        <tr>
                            <th scope="col" colSpan={11} style={{ textAlign: 'start', paddingLeft: '20px' }}>
                                <div style={{ paddingBottom: '6px' }}><img src={logo} style={{ maxWidth: '100%', height: 'auto' }} /></div>
                                <div><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Company
                                    Name:</b> <span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{company_details.company_name}</span></div>
                                <div><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>GST IN:</b>
                                    <span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{company_details.company_gstin}</span>
                                </div>
                                <div><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Pan
                                    Number:</b> <span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{company_details.company_pan}</span>
                                </div>
                            </th>
                            <th scope="col" colSpan={1} style={{ textAlign: 'start', background: '#F4B045', padding: '12px 12px' }}>
                                <span style={{ paddingBottom: '6px' }}>
                                    <span style={{ color: '#174EB6', fontSize: '30px', fontFamily: 'Arial', borderBottom: '5px solid #174EB6' }}>Booking slip</span>
                                </span>
                                <br />
                                <br />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 9 9" fill="none">
                                        <g clipPath="url(#clip0_0_3893)">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.83769 7.79757C8.55989 8.64177 7.47149 9.06297 6.69389 8.99277C5.63189 8.89677 4.47629 8.33337 3.59909 7.71297C2.30969 6.80097 1.10189 5.39037 0.39809 3.89337C-0.0993103 2.83557 -0.21091 1.53477 0.52889 0.570575C0.80249 0.214175 1.09889 0.0239747 1.54289 0.00177468C2.15969 -0.0282253 2.24609 0.324575 2.45789 0.874175C2.61569 1.28517 2.82629 1.70457 2.94389 2.13057C3.16409 2.92557 2.39429 2.95857 2.29709 3.60837C2.23709 4.01817 2.73329 4.56777 2.95769 4.85997C3.39022 5.42906 3.91998 5.91717 4.52249 6.30177C4.86449 6.51717 5.41529 6.90537 5.80649 6.69117C6.40889 6.36117 6.35249 5.34537 7.19429 5.68917C7.63049 5.86677 8.05289 6.12297 8.46929 6.34737C9.11309 6.69357 9.08309 7.05237 8.83769 7.79757C9.02129 7.24077 8.65409 8.35437 8.83769 7.79757Z" fill="#2A2C2D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_3893">
                                                <rect width={9} height={9} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg><span style={{ paddingLeft: '6px', color: '#2A2C2D', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400 }}>{company_details.care_number}</span>
                                </span>
                                <br />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={11} height={11} viewBox="0 0 10 10" fill="none">
                                        <g clipPath="url(#clip0_0_3887)">
                                            <path d="M8.3335 1.6665H1.66683C1.20641 1.6665 0.837663 2.03942 0.837663 2.49984L0.833496 7.49984C0.833496 7.96025 1.20641 8.33317 1.66683 8.33317H8.3335C8.79391 8.33317 9.16683 7.96025 9.16683 7.49984V2.49984C9.16683 2.03942 8.79391 1.6665 8.3335 1.6665ZM8.3335 3.33317L5.00016 5.4165L1.66683 3.33317V2.49984L5.00016 4.58317L8.3335 2.49984V3.33317Z" fill="#2A2C2D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_3887">
                                                <rect width={10} height={10} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg><span style={{ paddingLeft: '6px', color: '#2A2C2D', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400 }}>{company_details.company_web}</span>
                                </span>  <br />
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 9 9" fill="none">
                                        <g clipPath="url(#clip0_0_3895)">
                                            <path d="M4.5 0C2.01522 0 0 2.01522 0 4.5C0 6.98478 2.01522 9 4.5 9C6.98478 9 9 6.98478 9 4.5C9 2.01522 6.98478 0 4.5 0ZM4.86196 8.19783C4.84239 8.19783 4.82283 8.19783 4.79348 8.20761V6.08478C5.30217 6.075 5.76196 6.06522 6.18261 6.03587C5.81087 7.18043 5.1163 7.94348 4.86196 8.19783ZM4.13804 8.19783C3.87391 7.9337 3.18913 7.17065 2.81739 6.03587C3.22826 6.06522 3.69783 6.08478 4.20652 6.08478V8.20761C4.18696 8.20761 4.16739 8.19783 4.13804 8.19783ZM0.782609 4.5C0.782609 4.25543 0.811956 4.01087 0.851087 3.77609C1.0663 3.73696 1.47717 3.67826 2.05435 3.61957C2.00543 3.90326 1.97609 4.19674 1.97609 4.50978C1.97609 4.82283 2.00543 5.1163 2.04457 5.39022C1.47717 5.33152 1.05652 5.27283 0.841304 5.2337C0.811957 4.98913 0.782609 4.74457 0.782609 4.5ZM2.57283 4.5C2.57283 4.16739 2.61196 3.85435 2.67065 3.56087C3.12065 3.53152 3.62935 3.50217 4.20652 3.50217V5.49783C3.63913 5.48804 3.12065 5.46848 2.66087 5.42935C2.61196 5.14565 2.57283 4.83261 2.57283 4.5ZM4.85217 0.802174C5.1163 1.0663 5.7913 1.84891 6.17283 2.96413C5.76196 2.93478 5.30217 2.91522 4.79348 2.91522V0.792391C4.81304 0.792391 4.83261 0.802174 4.85217 0.802174ZM4.20652 0.792391V2.91522C3.69783 2.925 3.23804 2.93478 2.82717 2.96413C3.19891 1.84891 3.8837 1.0663 4.13804 0.802174C4.16739 0.802174 4.18696 0.792391 4.20652 0.792391ZM4.79348 5.49783V3.50217C5.36087 3.51196 5.87935 3.53152 6.32935 3.56087C6.38804 3.85435 6.42717 4.16739 6.42717 4.5C6.42717 4.83261 6.39783 5.14565 6.33913 5.43913C5.88913 5.46848 5.37065 5.48804 4.79348 5.49783ZM6.93587 3.61957C7.51304 3.67826 7.92391 3.73696 8.13913 3.77609C8.18804 4.01087 8.21739 4.25543 8.21739 4.5C8.21739 4.74457 8.18804 4.98913 8.14891 5.22391C7.9337 5.26304 7.52283 5.32174 6.94565 5.38043C6.99457 5.09674 7.01413 4.80326 7.01413 4.49022C7.01413 4.19674 6.98478 3.89348 6.93587 3.61957ZM7.96304 3.15C7.68913 3.11087 7.29783 3.06196 6.79891 3.01304C6.56413 2.17174 6.15326 1.49674 5.81087 1.01739C6.79891 1.38913 7.58152 2.17174 7.96304 3.15ZM3.18913 1.01739C2.83696 1.48696 2.43587 2.16196 2.20109 3.00326C1.71196 3.04239 1.32065 3.10109 1.03696 3.14022C1.41848 2.17174 2.21087 1.38913 3.18913 1.01739ZM1.03696 5.85C1.31087 5.88913 1.70217 5.93804 2.1913 5.98696C2.42609 6.82826 2.81739 7.50326 3.16957 7.97283C2.1913 7.5913 1.41848 6.81848 1.03696 5.85ZM5.83043 7.97283C6.18261 7.50326 6.57391 6.83804 6.8087 5.99674C7.29783 5.95761 7.68913 5.89891 7.96304 5.85978C7.58152 6.81848 6.8087 7.5913 5.83043 7.97283Z" fill="#2A2C2D" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_0_3895">
                                                <rect width={9} height={9} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span style={{ paddingLeft: '4px', color: '#2A2C2D', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400 }}>{company_details.care_email}</span>
                                </span>
                                <br />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ background: '#E3EDFF' }}>
                            <td scope="col" colSpan={4} style={{ padding: '6px 0px 3px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Booking {ApiResponse.booking_id}</b>
                            </td>
                            <td scope="col" colSpan={4}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Trip Type: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> {ApiResponse.trip_type} </span>
                            </td>
                            <td scope="col" colSpan={4}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Vehicle: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.vehicle_model}</span></td>
                        </tr>
                        <tr style={{ background: '#E3EDFF' }}>
                            <td scope="col" colSpan={4} style={{ padding: '3px 0px 3px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Pickup from:
                            </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.from_city}</span></td>
                            <td scope="col" colSpan={4}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Drop To: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{dropCityName()}</span></td>
                            <td scope="col" colSpan={4} />
                        </tr>
                        <tr style={{ background: '#E3EDFF' }}>
                            <td scope="col" colSpan={4} style={{ padding: '3px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Pickup Date:
                            </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.pickup_date}</span></td>
                            <td scope="col" colSpan={4}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Drop date: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.drop_date && ApiResponse.drop_date.split(',')[0]}</span>
                            </td>
                            <td scope="col" colSpan={4} />
                        </tr>
                        <tr style={{ background: '#F4B045' }}>
                            <td scope="col" colSpan={12} style={{ padding: '12px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Route: </b><span style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{handleTravelRoutesError()}</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '12px 0px 0px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Customer Name: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.user_name}</span>
                            </td>
                            <td scope="col"  colSpan={6}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Company name: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{LoginUsers?.company_name ? LoginUsers.company_name : 'N/A'}</span>
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '4px 0px 0px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Email ID: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.user_email ? ApiResponse.user_email : 'N/A' }</span>
                            </td>
                            <td scope="col" colSpan={6}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>GST IN: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{LoginUsers?.gstin_number ? LoginUsers.gstin_number : 'N/A' }</span>
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '4px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Mobile number: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.user_mobile ? ApiResponse.user_mobile : 'N/A' }</span>
                            </td>
                            <td scope="col" colSpan={6}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Flight number: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>N/A</span>
                            </td>
                        </tr>
                        <tr style={{ background: '#F1F1F1', textAlign: 'center' }}>
                            <td scope="col" colSpan={12} style={{ padding: '12px 0px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '14px', fontWeight: 700 }}>Fare Summary</b></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '8px 0px 8px 20px', borderBottom: '1px solid #98B0DE', borderTop: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Fare / KM: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>₹ {ApiResponse.per_km_charge} INR</span>
                            </td>
                            <td scope="col" colSpan={6} style={{ padding: '8px 0px 8px 20px', borderBottom: '1px solid #98B0DE', borderTop: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Minimum billable KM / day: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.estimated_kms} KMs</span>
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '8px 0px 8px 20px', borderBottom: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Estimated chargable KM: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>{ApiResponse.estimated_kms} KMs</span>
                            </td>
                            <td scope="col" colSpan={6} style={{ padding: '8px 0px 8px 20px', borderBottom: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Extra charge after {ApiResponse.estimated_kms} KMs: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>₹{ApiResponse.per_km_charge} per KM</span>
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '10px 0px 3px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '16px', fontWeight: 700 }}>Payment details</b></td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Estimated Amount: </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>₹ {ApiResponse.total_trip_amount}</span>
                            </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Transaction ID:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}> {ApiResponse.booking_id}</span> </td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>GST Amount ({ApiResponse.gst_percentage}% @ ₹{ApiResponse.total_trip_amount} ):</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>₹ {ApiResponse.gst_amount} </span> </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Payment Mode:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}> {ApiResponse.payment_mode}</span> </td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Coupon Discount : </b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>(-) ₹ {ApiResponse.discount_amount ? ApiResponse.discount_amount : 'N/A' }</span> </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Payment Type:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}> {handlePaymentShow()} </span> </td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Payable amount:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>₹ { parseInt(ApiResponse.discount_amount) > 0 ? parseFloat(ApiResponse.total_trip_amount_with_gst) - parseFloat(ApiResponse.discount_amount) : ApiResponse.total_trip_amount_with_gst   }</span> </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}></b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}></span> </td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Booking Amount:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>₹ { ApiResponse.booking_amount }</span> </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Transaction date:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>{ApiResponse.add_date}</span> </td>
                            <td scope="col" colSpan={6} style={{ padding: '6px 0px 6px 20px', borderBottom: '1px solid #98B0DE', borderLeft: '1px solid #98B0DE', background: '#F1F6FF' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 700 }}>Balance amount:</b><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px', paddingLeft: '10px' }}>₹ { handlePaymentShowTripAmount() }</span> </td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingTop: '20px', paddingLeft: '20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '16px', fontWeight: 700 }}>Terms &amp; Conditions</b></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 1. Inclusion: Base Fare, vehicle and fuel.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 2. Exclusion: Parking Charge, Airport Entry Charge.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 3. Charges includes in your fare - Tax and fuel charges.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 4. Km and timing will be charged from customer location.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 5. Car shall not be used for local use in {ApiResponse.from_city} after completion of {ApiResponse.trip_type} duty.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 6. In case booking cancelled then inform to us before 24 hrs in then pickup time.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 7. This is an estimated cost and may vary depending upon Km/hrs driven.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> 8. Night charge will be applicable from 10:00 PM to 7:00 AM.</span></td>
                        </tr>
                        <tr>
                            <td scope="col" colSpan={12} style={{ paddingTop: '2rem', paddingBottom: '12px', paddingLeft: '20px' }}><span style={{ color: '#777879', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}> This is an electronically generated, hence does not require a signature*</span></td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr><td scope="col" colSpan={12} style={{ textAlign: 'center', background: '#F4B045', padding: '12px 0px 12px 20px' }}><b style={{ color: '#323C42', fontFamily: 'Arial', fontSize: '12px', fontWeight: 400, letterSpacing: '0.35px' }}>Shakti Plaza, 15 A Jagnath Plot Opp. Hotel Imperial Palace Rajkot, Gujarat 360001</b></td>
                        </tr></tfoot>
                </table>
            </div>
        </>
    )
}

export default BookingSlip