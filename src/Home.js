import React, { useEffect, useState } from "react";
//import PhoneIcon from '@mui/icons-material/Phone';

import SearchSoftware from './Software';
import Home_about from './Home-about';
import Why_buzz from './Why-buzzway';
import Connect from './Connect';
import Download_apps from './Download-apps';
import Home_testimonial from './Home-testimonial';
import Pop_routes from './Popular-routes';
import Footer from './Footer';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import AlertPopupMessage from "./ErrorPopus/AlertPopus";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Config from "./Config/Config";
import { useLocation } from "react-router-dom";

const Home = () => {
    const [HomePageCms, setHomePageCms] = useState([])
    const currentLocation = useLocation();
    console.log(currentLocation, 'this is path name here');
    const [metaTags, setMetaTags] = useState({
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        meta_image: '',
    })

    const HomePageCmsApiCall = async () => {
        try {
            let Payloads = {
                page_type: 'home-page'
            }
            let response = await axios.post(`${Config.API_URL}/api/customer/common/cms/list`, Payloads);
            if (response.data.status) {
                setHomePageCms(response.data.data[0])
            } else {
                setHomePageCms([]);
            }
        } catch (error) {
            console.log(error.message);
            setHomePageCms([]);
        }
    }

    useEffect(() => {
        HomePageCmsApiCall();
    }, [])

    // handle travels handle script data
    const travelAgencyJsonLd = {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "name": "Buzzway",
        "image": metaTags.meta_image ? `${Config.IMG}` + metaTags.meta_image : `${Config.BASE_URL}/logo.png`,
        "@id": metaTags.meta_image ? `${Config.IMG}` + metaTags.meta_image : `${Config.BASE_URL}/logo.png`,
        "url": "https://www.buzzway.in/",
        "telephone": "+919054865866",
        "priceRange": "0",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": ", Shital House, near Denny Coffee Bar, opp. New York Tower A, Thaltej",
            "addressLocality": "Ahmedabad",
            "postalCode": "360001",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.0536039,
            "longitude": 72.5195122
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
        },
        "sameAs": [
            "https://www.buzzway.in/",
            "https://in.pinterest.com/Buzzwaycar/",
            "https://www.linkedin.com/in/buzzway/",
            "https://youtube.com/channel/UCmk1a_siIybosrgdJrHCcww",
            "https://www.instagram.com/buzzwaytaxiservice/",
            "https://www.facebook.com/buzzway01/",
            "https://twitter.com/Buzzway01",
            "https://www.tumblr.com/buzzwaytaxi"
        ]
    };

    const videoObjectJsonLd = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Buzzway No.1 Taxi Service in Gujarat, Ahmedabad, Hire best One way & Outstation Taxi car Rental",
        "description": "Ahmedabad Taxi Service Contact Number +91-9054865866\nBuzzway\nAhmedabad Taxi Contact Number to Book a Reliable Taxi Service\nAhmedabad has a depth of cultural and regional feel with a historic vibe. You’re gonna tad-bit confused when it comes to exploring Ahmedabad on a day tour because there are a lot of places to visit. So, we are here to serve you with our one-day sightseeing taxi service in Ahmedabad. Keeping trust in us makes your journey more comfortable and effortless.",
        "thumbnailUrl":metaTags.meta_image ? `${Config.IMG}` + metaTags.meta_image : `${Config.BASE_URL}/logo.png`,
        "uploadDate": "2022-11-10",
        "duration": "PT0M40S",
        "contentUrl": "https://youtu.be/yJNIy1EEY0Y",
        "embedUrl": "https://youtu.be/yJNIy1EEY0Y",
        "potentialAction": {
            "@type": "SeekToAction",
            "target": "https://youtu.be/yJNIy1EEY0Y={seek_to_second_number}",
            "startOffset-input": "required name=seek_to_second_number"
        }
    };

    // set the meta content here 
    useEffect(() => {
        setMetaTags({
            meta_title: HomePageCms.meta_title,
            meta_description: HomePageCms.meta_description,
            meta_keywords: HomePageCms.meta_keyword,
            meta_image: HomePageCms.banner_image_jpeg,
        })
    }, [HomePageCms.banner_image_jpeg, HomePageCms.meta_description, HomePageCms.meta_keyword, HomePageCms.meta_title])

    return (
        <>
            <AlertPopupMessage />
            <Helmet>
                <title>{metaTags.meta_title}</title>
                <meta name="title" content={metaTags.meta_title} />
                <meta name="description" content={metaTags.meta_description} />
                <meta name="keywords" content={metaTags.meta_keywords} />
                <meta name="google-site-verification" content="dMykwgpTO3yBh8Sm8NId-Mq83xHT27v3Qhgh6I1fGys" />
                {/* Facebook OG */}
                <meta property="og:title" content={metaTags.meta_title} />
                <meta property="og:url" content={`${Config.BASE_URL}` + currentLocation.pathname} />
                <meta property="og:type" content="article" />
                <meta property="og:description" content={metaTags.meta_description} />
                <meta property="og:image" content={`${Config.IMG}` + metaTags.meta_image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="msvalidate.01" content="9D36FAD1457C3E2D065F32D20C0823D5" />
                <meta name="p:domain_verify" content="4c8587df519cc06075b55ae06c613007"/>
                <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
                {/* Twitter OG */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metaTags.meta_title} />
                <meta name="twitter:description" content={metaTags.meta_description} />
                <meta name="twitter:url" content={`${Config.BASE_URL}` + currentLocation.pathname} />
                <meta name="twitter:image" content={`${Config.IMG}` + metaTags.meta_image} />
                <link rel="canonical" href={`${Config.BASE_URL}` + currentLocation.pathname} />

                <script type="application/ld+json">
                    {JSON.stringify(travelAgencyJsonLd)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(videoObjectJsonLd)}
                </script>

            </Helmet>
            <AnimationOnScroll animateIn="animate__fadeInDown">

                <section className="homebanner">
                    <div className="container">
                        <div className="bnrtext">
                            <h1>Ride with ease and arrive in style with our trusted taxi service.</h1>
                        </div>
                        <SearchSoftware />

                    </div>
                </section>
            </AnimationOnScroll>
            <Home_about />

            <Why_buzz />

            <Connect />

            <Download_apps />

            <Home_testimonial />

            <Pop_routes />

            <Footer />
        </>
    );
};

export default Home;
