import React, { useCallback, useEffect , useState } from "react";
import { Form } from 'react-bootstrap'
import axios from "axios";
import Config from "../../Config/Config";

const CabSelectionInput = ({setPackagesValues ,handleFormatted }) => {

    const [PackagesDB , setPackegesDB] = useState([])
    // packages stores db for the database
    

    const LocalPackages  = JSON.parse(localStorage.getItem('cab_listing')) || {};
    const [Vahicle , setVahicleList] = useState('');

    const GetThePackagesAPIDate = () => {
        axios.get(`${Config.API_URL}/api/customer/vehiclelist` , {
            headers:{
                'Authorization':`${Config.API_ACCESS_TOKEN}`
            }
        })
        .then((response) => {
            if(response.data.status){
                setPackegesDB(response.data.data)
            }else{
                setPackegesDB([])
            }
        })
        .catch(err => {
            setPackegesDB([]);
        })
    }

    // on click the set values
    const ClickGetValues = (event) => {
        let [vahicalId , vahicalName] = event.target.value.split('-');
        setVahicleList(vahicalName);

        handleFormatted({'vehicle_name':vahicalName , 'vehicle_id':vahicalId})
    }

    const LoadTheAPIValues = useCallback((e) => {
        let timer;
        clearTimeout(timer)
        setTimeout(() => {
         GetThePackagesAPIDate();
        } , 1000)
    } , [])

    return (
        <>
            <Form.Select className="position-relative cityfield" controlId="" defaultValue={'welcome boys'} onChange={(e) => ClickGetValues(e)} onClick={(e) => LoadTheAPIValues(e)} >
                {
                    PackagesDB.length > 0 ?
                    PackagesDB.map((value) => {
                        return <>
                          <option key={value._id} value={`${value._id}-${value.category}`}>{value.category}</option>
                        </>
                    }) : <option>select Packages</option>
                }
            </Form.Select>
        </>
    );
};

export default CabSelectionInput