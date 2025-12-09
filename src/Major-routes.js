import React , {useState , useEffect , useCallback} from "react";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from "axios";
import Config from "./Config/Config";
import { Link } from "react-router-dom";

const Major_routes = ({Major_routes}) => {

    const [major_routes  , set_major_routes] = useState([]);
    const handle_tab_records_data = useCallback(async (city_name) => {
        try {
          const response = await axios.post(`${Config.API_URL}/api/customer/cms/major_routes`, { 'city_name':city_name });
          if (response.data.status) {
            set_major_routes(response.data.data);
          } else {
            set_major_routes([])
          }
        } catch (error) {
          console.log(error.message);
          set_major_routes([])
        }
      }, []);

    useEffect(() => {
        let city_name = Major_routes?.from_city_name ? Major_routes.from_city_name : Major_routes.popular_city_name;
        handle_tab_records_data(city_name)
    } , [Major_routes , handle_tab_records_data])

    return (
        <>
            <div className="row pb-4 m0 majorroutes">
                <div className="cardlike">
                    <h5>MAJOR ROUTES FOR CAB HIRE FROM {Major_routes.from_city_name}</h5>
                    <p>You will be able to get a large range of car hire options for you, which you can choose for your car rental service in Ahmedabad.
                        If you want to enjoy your trip hassle-free then the best is to book a car on rent service in Ahmedabad, a fully clean and air-conditioned car.</p>
                    <ul style={{display:'flex' , justifyContent:'space-between'}}>
                        {
                            major_routes.length > 0 &&
                            major_routes.map((items , index) => {
                                return (
                                    <li key={index}><Link to={`/${items.page_slug}`}><TaskAltIcon />{items.page_name}</Link></li>
                                )
                            })
                        }
                        {/* <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li> */}
                        {/* <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li> */}
                        {/* <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Surat</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Rajkot</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li>
                        <li> <a href=""><TaskAltIcon /> Ahmedabad to Vadodara</a> </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Major_routes;
