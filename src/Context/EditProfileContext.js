import React , {createContext, useState} from "react";

export const ProfileEditContext = createContext({});

export const ProfileProviders = ({children}) => {
    const [stateVAlues , setStateValues] =useState({});
    return (
        <ProfileEditContext.Provider value={{stateVAlues , setStateValues}}>
           {children}
        </ProfileEditContext.Provider>
    )
}


