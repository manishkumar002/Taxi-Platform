import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import Config from './Config/Config';
import { Link } from 'react-router-dom';


const settings = {
    dots: false,
    centerMode: true,
    infinite: false,
    centerPadding: '60px',
    slidesToShow: 1.2,
    responsive: [
        {
            breakpoint: 640,
            settings: {
                slidesToShow: 1,
                infinite: true,
                dots: true,
                centerMode: false,
                arrows: false,
                slidesToScroll: 1,
                centerPadding: '0px'
            }
        }
    ]
};

const Whyslider = () => {
    const [service_list, setServiceList] = useState([]);
    const [loading, setLoding] = useState(false);

    const servicesListApi = async () => {
        try {
            let response = await axios.get(`${Config.API_URL}/api/customer/service/list`);
            if (response.data.status) {
                setServiceList(response.data.data);
            } else {
                setServiceList([])
            }
        } catch (error) {
            console.log(error.message);
            setServiceList([]);

        }
    }

    useEffect(() => {
        servicesListApi();
    }, [])
    return (
        <>
            <Slider {...settings}>
                {/* <div className='whysingl-item'>
                    <img src={w1} />
                    <div className='sldtxt'>
                        <h4>Outstation Cabs</h4>
                    </div>
                </div> */}
                {
                    service_list.length > 0
                    && service_list.map((items, index) => {
                        return (
                            <>
                                <a href={`${items.page_link}`} target="_blank" rel="noopener noreferrer">
                                    <div className='whysingl-item' key={index}>
                                        <img style={{ maxHeight: '11rem' }} src={`${Config.IMG}${items.image_url}`} alt={`${items.image_alt}`} />
                                        <div className='sldtxt'>
                                            <h4>{items.title}</h4>
                                        </div>
                                    </div>
                                </a>
                            </>
                        )
                    })
                }
                {/* <div className='whysingl-item'>
                    <img src={w1} />
                    <div className='sldtxt'>
                        <h4>Outstation Cabs</h4>
                    </div>
                </div>
                <div className='whysingl-item'>
                    <img src={w1} />
                    <div className='sldtxt'>
                        <h4>Outstation Cabs</h4>
                    </div>
                </div> */}
            </Slider>
        </>
    )
}

export default Whyslider;
