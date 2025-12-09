import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "rc-time-picker/assets/index.css";
// search tab for all
import OutStandingSearchTab from "./SearchTab/OutstandingCabSearch";
import LocalSearchTab from "./SearchTab/LocalSearchTab";
import AirPortSearchTab from "./SearchTab/AirportSearchTab";
import OneWaysSearchTab from "./SearchTab/OneWaySearchTab";

function SearchSoftware() {
    const LocalDate = JSON.parse(localStorage.getItem("cab_listing")) || {};

    const [selectedTab, setSelectedTab] = useState(
        LocalDate.hasOwnProperty('trip_type') ? LocalDate.trip_type : "local"
    ); // State to track the selected tab

    // Function to handle radio button change
    const handleRadioChange = (event) => {
        if(!event.target.checked){
           selectedTab('local')
        }
        setSelectedTab(event.target.value);
    };

    // Function to render the selected search tab
    const renderSearchTab = () => {
        switch (selectedTab) {
            case "outstation":
                return <OutStandingSearchTab tripType={selectedTab} />;
            case "oneway":
                return <OneWaysSearchTab tripType={selectedTab} />;
            case "airport":
                return <AirPortSearchTab tripType={selectedTab} />;
            case "local":
            default:
                return <LocalSearchTab tripType={selectedTab} />;
        }
    };

    return (
        
        <div className="softwarebox">
            <div className="ridetype">
                <label className="radio-button-container">
                    Outstation
                    <input
                        type="radio"
                        value={"outstation"}
                        name="radio"
                        checked={selectedTab === "outstation"}
                        onChange={handleRadioChange}
                    />
                    <span className="checkmark"></span>
                </label>
                <label className="radio-button-container">
                    Oneway
                    <input
                        type="radio"
                        name="radio"
                        value={"oneway"}
                        checked={selectedTab === "oneway"}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <span className="checkmark"></span>
                </label>
                <label className="radio-button-container">
                    Local
                    <input
                        type="radio"
                        name="radio"
                        value={"local"}
                        checked={selectedTab === "local"}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <span className="checkmark"></span>
                </label>
                <label className="radio-button-container">
                    Airport
                    <input
                        type="radio"
                        name="radio"
                        value={"airport"}
                        checked={selectedTab === "airport"}
                        onChange={(e) => handleRadioChange(e)}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
            {/* render the selected components components */}
            {renderSearchTab()}
        </div>
    );
}

export default SearchSoftware;
