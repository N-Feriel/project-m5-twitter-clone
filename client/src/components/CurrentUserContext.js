import React, { useState, useEffect } from 'react';


export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");


    // Fetch the user data from the API (/me/profile)
    // When the data is received, update currentUser.
    // Also, set `status` to `idle`

    useEffect(() => {

        setStatus('loading')
    
        fetch('/api/me/profile')
        .then((res) => res.json())
        .then((json) =>{

            const APIStatus = json.status;
            if (APIStatus === 404) {
                console.log('error userContext')
                setStatus('error')
            } else{
                setCurrentUser(json.profile)
                console.log(json, 'currentUser')
                setStatus('idle')
            }
        })
        
    }, []);


    return (
        <CurrentUserContext.Provider value={{ currentUser, status, setStatus }}>
        {children}
        </CurrentUserContext.Provider>
    );
    };