import React, { useCallback , useContext , useEffect } from 'react';
import { SwapCityContext } from '../../Context/SwapContext';
import twoway from '../../images/twoway.png'

const SwapCityCMP = () => {

    // called the context swap functions to handle the city swap
    const {to_city , setTo_city , from_city , setFrom_city , swapStatus,setSwapStatus} = useContext(SwapCityContext);

    const swapCityData = useCallback(() => {
        setSwapStatus(true);
        const tempCity = from_city;
        setFrom_city(to_city);
        setTo_city(tempCity);
        console.log(swapStatus , from_city , to_city);
    }, [swapStatus, from_city, to_city , setFrom_city , setTo_city , setSwapStatus]);

    return (
        <>
        <div className="w10 btweenimg" onClick={(e) => swapCityData(e)}>
            <img src={twoway} />
        </div>
        </>
    )
}

export default SwapCityCMP;