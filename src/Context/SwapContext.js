import React, { createContext, useState , useEffect } from 'react'

export const SwapCityContext = createContext(null);

export const SwapProviders = ({children}) => {
    let [to_city , setTo_city] = useState('');
    let [from_city , setFrom_city] = useState('');
    let [swapStatus , setSwapStatus] = useState(false);

    useEffect(() => {
        if (swapStatus) {
            setSwapStatus(false);
        }
    }, [to_city, from_city, swapStatus]);


    return (
        <>
           <SwapCityContext.Provider value={{to_city , setTo_city , from_city , setFrom_city , swapStatus , setSwapStatus}}>
            {children}
           </SwapCityContext.Provider>
        </>
    )
}