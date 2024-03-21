import React, { useState, useEffect } from "react";

const AuthContext = React.createContext(); // call createContext() to create our Context object

function AuthProviderWrapper(props) {

    //set necessary states for the authentication process
    const [isLoggedIn, setIsLoggedIn] = useState(false); // state of being logged in
    const [isLoading, setIsLoading] = useState(true); // state of loading process while authentication is being done
    const [user, setUser] = useState(null); // state for storing the user

    //retrieve token from local storage to have it easily accessible
    const storeToken = (token) => {
        localStorage.setItem("authToken", token) //set item named authToken from local storage as token
    };

    

    return (
        //set the provider, to provide context values to other components, as a wrapper component
        <AuthContext.Provider value={""}

    );
}

export { AuthProviderWrapper, AuthContext };
