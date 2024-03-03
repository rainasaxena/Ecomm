import React, {useState, useEffect} from "react";
import { UserAuthContext } from "./userAuthContext";
import { checkTokenValidity, getUserDetails } from "../../utils/authUtils";

export const UserAuthContextProvider = ({children}) => {
    const [userObject, setUserObject] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(()=>{
        const authTokens = JSON.parse(localStorage.getItem("authTokens"));
        const userDetails = JSON.parse(localStorage.getItem("user"));

        const getUserObj = async () =>{
            const isValid = await checkTokenValidity();
            if(isValid){
                const data = await getUserDetails(userDetails.username, userDetails.email, authTokens.access);
                setUserObject(data);
                setIsLoggedIn(true);
            } else{
                setIsLoggedIn(false);
            }  
        };

        if(authTokens||userDetails){
            setAuthTokens(authTokens);
            setUserObject(userDetails);
            getUserObj();
        }

    },[]);

    return (
        <UserAuthContext.Provider value = {{userObject, setUserObject, authTokens, setAuthTokens, isLoggedIn, setIsLoggedIn}}>
            {children}
        </UserAuthContext.Provider>

    );

};