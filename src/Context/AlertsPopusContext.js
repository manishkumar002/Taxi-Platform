import React , { createContext, useState } from "react";

export const AlertContext = createContext(null);

export const AlertProviders = ({children}) => {
    const [message , setMessage] = useState({status:false , message:''});
    const [status , setStatus] = useState(false);

    return (
       <AlertContext.Provider value={{message , setMessage , status , setStatus}}>
         {children}
       </AlertContext.Provider>
    )
}