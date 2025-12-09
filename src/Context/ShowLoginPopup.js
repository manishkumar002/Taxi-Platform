import React , {createContext, useState} from "react";

export const LoginPopupContext = createContext(null);

export const LoginProviders = ({children}) => {
    const [ OpenLoginPops , setOpen] =useState(false);
    return (
        <LoginPopupContext.Provider value={{ OpenLoginPops, setOpen}}>
           {children}
        </LoginPopupContext.Provider>
    )
}
