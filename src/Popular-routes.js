// import React, { useState, useEffect } from "react";
// import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
// import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
// import { AnimationOnScroll } from 'react-animation-on-scroll';
// import 'animate.css/animate.min.css';
// import axios from "axios";
// import Config from "./Config/Config";
// import { Link } from "react-router-dom";
// const Pop_routes = () => {
//     const [cms_data, set_cms_data] = useState([]);
//     const [city_routes, set_city_routes] = useState([]);
//     const [showAll, setShowAll] = useState(false);
//     const [showAllPopular, setShowAllPopular] = useState(false);
//     const [TotalPopupRecords , setTotalPopularRecords] = useState(0);
//     const [recordsToShow , setTotalRecords] = useState(0);

//     // city cms api call
//     const common_city_api = async () => {
//         try {
//             const response = await axios.get(`${Config.API_URL}/api/customer/cms/city_records`);
//             if (response.data.status) {
//                 set_cms_data(response.data.data);
//             } else {
//                 set_cms_data([]);
//             }
//         } catch (error) {
//             console.log(error)
//             set_cms_data([]);
//         }

//     }

//     const handle_city_routes_api = async () => {
//         try {
//             let response = await axios.get(`${Config.API_URL}/api/customer/cms/city_routes_page`);
//             if (response.data.status) {
//                 set_city_routes(response.data.data)
//             } else {
//                 set_city_routes([]);
//             }
//         } catch (error) {
//             console.log(error.message)
//             set_city_routes([]);
//         }
//     }



  

//     // convert to slug name
//     function convertToSlug(text) {
//         return text
//             .toLowerCase()
//             .replace(/ /g, '-')
//             .replace(/[^\w-]+/g, '')
//             .replace(/--+/g, '-')
//             .replace(/^-+/, '')
//             .replace(/-+$/, '');
//     }

//     // const Save_Data_in_LocalStorage = (data) => {
//     //     localStorage.removeItem('city_routes');
//     //     localStorage.setItem('common_cms', JSON.stringify(data))
//     // }

//     // const handle_city_routes_seo = (data) => {
//     //     localStorage.removeItem('common_cms');
//     //     localStorage.setItem('city_routes', JSON.stringify(data))
//     // }


//     useEffect(() => {
//         common_city_api();
//         handle_city_routes_api();
//     }, [])
//     useEffect(() => {
//         setTotalPopularRecords(showAllPopular ? city_routes.length : 9);
//         setTotalRecords(showAll ? cms_data.length : 6)
//     } , [city_routes.length, cms_data.length, showAll, showAllPopular]);
//     // here handle the Total records data other wise close the show button
//     // const recordsToShow = showAll ? cms_data.length : 6;
//     // const TotalPopupRecords = showAllPopular ? city_routes.length : 9;
//     return (
//         <>
//             <section className="bgdarkblue poprt_sect">
//                 <div className="container pt-4 py-4">
//                     <div className="row text-center">
//                         <h3 >Popular Cites</h3>
//                     </div>

//                     <div className="row">
//                         <ul className="pop_routs">
//                             {
//                                 cms_data.length > 0 && cms_data.slice(0, recordsToShow).map((data, index) => {
//                                     return (
//                                         <li key={index}>
//                                             <Link to={`/${convertToSlug(data.tab_data_records[0].tab_name + ' ' + data.from_city_name)}`}>
//                                                 {data.from_city_name}
//                                             </Link>
//                                         </li>
//                                     )
//                                 })
//                             }
//                         </ul>
//                         {/* <div className="downarrow">

//                             <AnimationOnScroll animateIn='animate__bounce'
//                                 initiallyVisible={false}>
//                                 <KeyboardDoubleArrowDownSharpIcon />
//                             </AnimationOnScroll>
//                         </div> */}
//                         {
//                             !showAll && cms_data.length > 4 && (
//                                 <div className="downarrow">
//                                     {/* Adding here Bounce Class in this tutorials */}
//                                     <AnimationOnScroll animateIn='animate__bounce' initiallyVisible={false}>
//                                         <button onClick={() => setShowAll(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                                             <KeyboardDoubleArrowDownSharpIcon />
//                                         </button>
//                                     </AnimationOnScroll>
//                                 </div>
//                             )
//                         }
//                         {
//                             showAll && cms_data.length > 6 && (
//                                 <div className="downarrow">
//                                     <AnimationOnScroll animateIn="animate__bounce" initiallyVisible={false}>
//                                         <button onClick={() => setShowAll(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                                             <KeyboardDoubleArrowUpIcon />
//                                         </button>
//                                     </AnimationOnScroll>
//                                 </div>
//                             )
//                         }

//                     </div>

//                     <div className="row text-center">
//                         <h3>Popular Routes</h3>
//                     </div>
//                     <div className="row">
//                         <ul className="pop_routs">
//                             {
//                                 city_routes.length > 0 &&
//                                 city_routes.slice(0, TotalPopupRecords).map((data, index) => {
//                                     return (
//                                         <li key={index}>
//                                             <Link to={`/${data.page_slug}`}>{data.page_name}</Link>
//                                         </li>
//                                     )
//                                 })
//                             }
//                         </ul>
//                         {
//                             !showAllPopular && city_routes.length > 5 && (
//                                 <div className="downarrow">
//                                     {/* Adding here Bounce Class in this tutorials */}
//                                     <AnimationOnScroll animateIn='animate__bounce' initiallyVisible={false}>
//                                         <button onClick={() => setShowAllPopular(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                                             <KeyboardDoubleArrowDownSharpIcon />
//                                         </button>
//                                     </AnimationOnScroll>
//                                 </div>
//                             )
//                         }
//                         {
//                             showAllPopular && city_routes.length > 9 && (
//                                 <div className="downarrow">
//                                     <AnimationOnScroll animateIn="animate__bounce" initiallyVisible={false}>
//                                         <button onClick={() => setShowAllPopular(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
//                                             <KeyboardDoubleArrowUpIcon />
//                                         </button>
//                                     </AnimationOnScroll>
//                                 </div>
//                             )
//                         }
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Pop_routes; 



import React, { useState, useEffect } from "react";
import KeyboardDoubleArrowDownSharpIcon from '@mui/icons-material/KeyboardDoubleArrowDownSharp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';
import axios from "axios";
import Config from "./Config/Config";
import { Link } from "react-router-dom";

const Pop_routes = () => {
    const [cms_data, set_cms_data] = useState([]);
    const [city_routes, set_city_routes] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [showAllPopular, setShowAllPopular] = useState(false);
    const [TotalPopupRecords , setTotalPopularRecords] = useState(0);
    const [recordsToShow , setTotalRecords] = useState(0);

    // city cms api call
    const common_city_api = async () => {
        try {
            const response = await axios.get(`${Config.API_URL}/api/customer/cms/city_records`);
            if (response.data.status) {
                set_cms_data(response.data.data);
            } else {
                set_cms_data([]);
            }
        } catch (error) {
            console.log(error)
            set_cms_data([]);
        }

    }

    const handle_city_routes_api = async () => {
        try {
            let response = await axios.get(`${Config.API_URL}/api/customer/cms/city_routes_page`);
            if (response.data.status) {
                set_city_routes(response.data.data)
            } else {
                set_city_routes([]);
            }
        } catch (error) {
            console.log(error.message)
            set_city_routes([]);
        }
    }

    // convert to slug name
    function convertToSlug(text) {
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    useEffect(() => {
        common_city_api();
        handle_city_routes_api();
    }, [])

    useEffect(() => {
        setTotalPopularRecords(showAllPopular ? city_routes.length : 9);
        setTotalRecords(showAll ? cms_data.length : 6)
    } , [city_routes.length, cms_data.length, showAll, showAllPopular]);

    return (
        <>
            <section className="bgdarkblue poprt_sect">
                <div className="container pt-4 py-4">
                    <div className="row text-center">
                        <h3>Popular Cites</h3>
                    </div>
                    
                    <div className="row">
                        <ul className="pop_routs">
                            {
                                cms_data.length > 0 && cms_data.slice(0, recordsToShow).map((data, index) => {
                                  
                                    if (data.tab_data_records && data.tab_data_records.length > 0) {
                                        return (
                                            <li key={index}>
                                                <Link to={`/${convertToSlug(data.tab_data_records[0].tab_name + ' ' + data.from_city_name)}`}>
                                                    {data.from_city_name}
                                                </Link>
                                            </li>
                                        )
                                    } else {
                                        return null; 
                                    }
                                })
                            }
                        </ul>

                        {
                            !showAll && cms_data.length > 4 && (
                                <div className="downarrow">
                                   
                                    <AnimationOnScroll animateIn='animate__bounce' initiallyVisible={false}>
                                        <button onClick={() => setShowAll(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <KeyboardDoubleArrowDownSharpIcon />
                                        </button>
                                    </AnimationOnScroll>
                                </div>
                            )
                        }
                        {
                            showAll && cms_data.length > 6 && (
                                <div className="downarrow">
                                    <AnimationOnScroll animateIn="animate__bounce" initiallyVisible={false}>
                                        <button onClick={() => setShowAll(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <KeyboardDoubleArrowUpIcon />
                                        </button>
                                    </AnimationOnScroll>
                                </div>
                            )
                        }

                    </div>

                    <div className="row text-center">
                        <h3>Popular Routes</h3>
                    </div>
                    <div className="row">
                        <ul className="pop_routs">
                            {
                                city_routes.length > 0 &&
                                city_routes.slice(0, TotalPopupRecords).map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <Link to={`/${data.page_slug}`}>{data.page_name}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        {
                            !showAllPopular && city_routes.length > 5 && (
                                <div className="downarrow">
                                    <AnimationOnScroll animateIn='animate__bounce' initiallyVisible={false}>
                                        <button onClick={() => setShowAllPopular(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <KeyboardDoubleArrowDownSharpIcon />
                                        </button>
                                    </AnimationOnScroll>
                                </div>
                            )
                        }
                        {
                            showAllPopular && city_routes.length > 9 && (
                                <div className="downarrow">
                                    <AnimationOnScroll animateIn="animate__bounce" initiallyVisible={false}>
                                        <button onClick={() => setShowAllPopular(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                            <KeyboardDoubleArrowUpIcon />
                                        </button>
                                    </AnimationOnScroll>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Pop_routes;


