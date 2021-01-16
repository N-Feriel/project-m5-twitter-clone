import React, { useState, useEffect } from 'react';


export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");


    // Fetch the user data from the API (/me/profile)
    // When the data is received, update currentUser.
    // Also, set `status` to `idle`

    useEffect(() => {
        fetch('api/me/profile')
        .then((res) => res.json())
        .then((json) =>{
            setCurrentUser(json.profile)
            setStatus('idle')
        })
        
    }, [setCurrentUser]);


    return (
        <CurrentUserContext.Provider value={{ currentUser, status }}>
        {children}
        </CurrentUserContext.Provider>
    );
    };