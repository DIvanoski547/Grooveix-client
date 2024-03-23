import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext(); // call createContext() to create our Context object


function AuthProviderWrapper(props) {
  //set necessary states for the authentication process
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state of being logged in
  const [isLoading, setIsLoading] = useState(true); // state of loading process while authentication is being done
    const [user, setUser] = useState(null); // state for storing the user
    const [isAdmin, setIsAdmin] = useState(false);


  const storeToken = (token) => {
    localStorage.setItem("authToken", token); //set item named authToken to local storage
  };

  //set new function for authenticating user
  const authenticateUser = () => {
    //get stored token from local storage
    const storedToken = localStorage.getItem("authToken");

    //if authToken is found in local storage
    if (storedToken) {
      authService
        .verify(storedToken)
        .then((response) => {
            const user = response.data;
            console.log("user",response.data)
          //update all state variables
          setIsLoggedIn(true);
          setIsLoading(false);
            setUser(user);
            if (response.data.role === "admin") {
                setIsAdmin(true)
            }
        })
        .catch((error) => {
          //if server sends error response it means the token is invalid
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      //for when the token is not found
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // set function for removing token item from local storage (useful for logout)
  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  // set log out function
  const logOutUser = () => {
    //callback functions
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    //right after components in App get rendered, run this function (only once since it depends on nothing)
    authenticateUser();
  }, []);

  return (
    //set the provider, to provide context values to other components, as a wrapper component
    // pass state and callback functions to children
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,isAdmin
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
