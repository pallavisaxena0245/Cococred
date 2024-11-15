import React, { createContext, useState, useEffect } from "react";

// Create a context to manage authentication state
export const AuthContext = createContext();

// Define AuthService as an arrow function component
function AuthService ({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const storedAuthState = localStorage.getItem('authenticated');
        if(storedAuthState == 'true')
          setAuthenticated('true') ;

    }, []);


    useEffect(() =>{
        localStorage.setItem('authenticated', authenticated.toString())

    },[authenticated])

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthService;
