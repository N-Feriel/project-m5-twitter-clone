import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';


export const TweetContext = React.createContext(null);

export const TweetProvider =({children}) =>{

    const [tweetStatus, settweetStatus ] =useState('loading');

    const [userTweets, setUserTweets] = useState([]);

    const updateUserTweets = (newData) => {
        setUserTweets({ ...userTweets, ...newData });
    };

    const getHomeFeed =() =>{

        fetch(`/api/me/home-feed`)
        .then((res) => {
            if(res.status === 200){
                return res.json()
            } else{
                throw(res)
            }
        }).then((json) =>{

            console.log(json, 'json')
            updateUserTweets(json)
            settweetStatus('idle')
            console.log('tweet', tweetStatus, userTweets)
        
        }).catch((error) =>{    
            settweetStatus('error')
            console.log(error, 'home Feed function')
        })
        
    }

    const location = useLocation();



    const [profileTweetsStatus, setProfileTweetsStatus ] =useState('loading');
    const [userTweetsProfile, setUserTweetsProfile] = useState([]);

    const updateUserTweetsProfile = (newData) => {
        setUserTweetsProfile({ ...userTweetsProfile, ...newData });
    };



    const getProfileFeed = (profileId) =>{

        fetch(`/api/${profileId}/feed`)
        .then((res) => {
            if(res.status === 200){
                return res.json()
            } else{
                throw(res)
            }
        })
        .then((json) =>{    
                updateUserTweetsProfile(json);
                setProfileTweetsStatus('idle')
        })
        .catch((error) =>{    
            setProfileTweetsStatus('error')
            console.log(error, 'profile Feed function')
        })
        
    }

    const [tweetStatusDetails, setTweetStatusDetails] =useState('loading');
    const [tweet, setTweet] = useState([]);


    const getTweetDetails = (tweetId) =>{

        fetch(`/api/tweet/${tweetId}`)
        .then((res) => {
            if(res.status === 200){
                return res.json()
            } else{
                throw(res)
            }
        }) 
        .then((json) =>{
            setTweet(json.tweet);
            setTweetStatusDetails('idle');
            })
        .catch((error) =>{    
            setProfileTweetsStatus('error')
            console.log(error, 'tweet details function')
        })
    
    }

    return <TweetContext.Provider 
                value={{
                    getHomeFeed,
                    tweetStatus,
                    userTweets,
                    getProfileFeed,
                    setProfileTweetsStatus,
                    profileTweetsStatus, 
                    userTweetsProfile,
                    location,
                    tweetStatusDetails,
                    getTweetDetails,
                    tweet,
                }}
    >
        {children}
    </TweetContext.Provider>


}
