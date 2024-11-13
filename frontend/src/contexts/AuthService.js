import React, { createContext, useState } from "react";

// Create a context to manage authentication state
export const AuthContext = createContext();

// Define AuthService as an arrow function component
function AuthService ({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthService;
