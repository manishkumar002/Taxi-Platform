import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import Config from "./Config/Config";

const Cms_tablike = ({ common_cms, tab_records_data, Tabs_data, context_data, routesPages }) => {
  const currentPosition = useRef(null);
  const location = useLocation();
  const [tab_data, set_tabs] = useState({});
  const [city_routes, set_city_routes] = useState({});
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handle_tab_records_data = useCallback(async (page_slug) => {
    try {
      const response = await axios.post(`${Config.API_URL}/api/customer/cms/city_records`, { page_slug });
      if (response.data.status) {
        set_tabs(response.data.data);
        tab_records_data(response.data.data);
      } else {
        set_tabs({});
      }
    } catch (error) {
      console.log(error.message);
      set_tabs({});
    }
  }, [tab_records_data]);

  // const Get_city_routes_records = async (id, page_slug, from_city_name) => {
  //   try {
  //     const response = await axios.post(`${Config.API_URL}/api/customer/cms/city_routes_page`, { id, page_slug, from_city_name });
  //     if (response.data.status) {
  //       set_city_routes(response.data.data);
  //       // set_tabs({});
  //       // tab_records_data(response.data.data);
  //     }else {
  //       set_city_routes({});
  //       // set_tabs({});
  //       // tab_records_data({});
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }


  // useEffect(() => {
  //   console.log(Object.entries(city_routes_schema).length);
  //   if (Object.entries(city_routes_schema).length > 0 && !_.isEqual(city_routes_schema, city_routes)) {
  //     // set_tabs({});
  //       tab_records_data([]);
  //       set_tabs({})
  //       Tabs_data([])
  //       // called the api here
  //       let Payloads = {
  //         id:city_routes_schema._id,
  //         page_slug:city_routes_schema.page_slug,
  //         from_city_name:city_routes_schema.from_city_name
  //       }
  //       axios.post(`${Config.API_URL}/api/customer/cms/city_routes_page` , Payloads)
  //       .then((response) => {
  //           if(response.data.status){
  //             tab_records_data(response.data.data);
  //           }
  //       }).catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }, [location.pathname,city_routes]);

  useEffect(() => {
    if (Object.entries(routesPages).length > 0) {
      tab_records_data([]);
      set_tabs({})
      Tabs_data([])
      tab_records_data(routesPages)
    }

  }, [Tabs_data, location.pathname, routesPages, tab_records_data])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    if (common_cms && common_cms.length > 0) {
      handle_tab_records_data(common_cms[selectedTabIndex]?.page_slug);
    }
  }, [common_cms, handle_tab_records_data, selectedTabIndex]);

  useEffect(() => {
    // Set the tab records based on the current URL path
    if (common_cms && common_cms.length > 0) {
      const slug = location.pathname.slice(1);
      const tabIndex = common_cms.findIndex(tab => tab.page_slug === slug);
      if (tabIndex !== -1) {
        setSelectedTabIndex(tabIndex);
        handle_tab_records_data(slug);
      }
    }
  }, [location.pathname, common_cms]);

  const handleTabClick = (index, pageSlug) => {
    setSelectedTabIndex(index);
    handle_tab_records_data(pageSlug);
  };

  return (
    <>
      <div className="tabwrppr my-4" ref={currentPosition}>
        {common_cms.length > 0 && (
          <div className="cmstablike">
            {common_cms.map((value, index) => (
              <Link
                key={value.page_slug}
                onClick={(e) => handleTabClick(index, value.page_slug)}
                to={`/${value.page_slug}`}
                className={`cmstabbtn ${selectedTabIndex === index ? 'active' : ''}`}
              >
                {value.page_name}
              </Link>
            ))}
          </div>
        )}
        {Object.entries(tab_data).length > 0 ? (
          <div className="cmstabcontent" dangerouslySetInnerHTML={{ __html: tab_data.content_data }} />
        ) : (
          Object.entries(context_data).length > 0 && (
            <div className="cmstabcontent" dangerouslySetInnerHTML={{ __html: context_data.content_data }} />
          )
        )}
      </div>
    </>
  );
};

export default Cms_tablike;
