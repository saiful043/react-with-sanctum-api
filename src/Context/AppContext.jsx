import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
export const AppContext = createContext()
// import Login2 from '../Pages/Auth/Login2'
export default function AppProvider({children}) {
    const [isLoading, setIsLoading] = useState(true);  // Loading state
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null)

    
    useEffect(() => {
        async function getUser() {
            try {
                const res = await fetch('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token'); // Handle token expiration or invalid token
                    setIsAuthenticated(false);
                }
           
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            } finally {
                setIsLoading(false); // Done loading
            }
        }
        if(token) {
            getUser();
        } else {
            setIsLoading(false); // No token, not loading anymore
        }
    }, [token]);
    if (isLoading) {
        return (
            
                <div className="animate-spin">Loading...</div>
           
        ) // Show a loading indicator while fetching user info
    }
    // if (!isAuthenticated) {
    //     return <Login2/> // Render the Login component if not authenticated
    //   }
    return (
        <AppContext.Provider value={{token, setToken, user, setUser }}>
             {children}
        </AppContext.Provider>
    );
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,  // Validates that `children` is passed and can be any renderable content
};