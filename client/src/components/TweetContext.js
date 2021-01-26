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

        try{
            fetch(`/api/me/home-feed`)
            .then((res) => {
                if(res.status === 200){
                    return res.json()
                } else{
                    settweetStatus('error')
                }
            }).then((json) =>{

                console.log(json, 'json')
        
                    updateUserTweets(json)
                    settweetStatus('idle')
                    console.log('tweet', tweetStatus, userTweets)
            
            })
        }
        catch(error){
            settweetStatus('error')
            console.log(error, 'HomeFeed function')
        }
        
    }

    const location = useLocation();



    const [profileTweetsStatus, setProfileTweetsStatus ] =useState('loading');
    const [userTweetsProfile, setUserTweetsProfile] = useState([]);

    const updateUserTweetsProfile = (newData) => {
        setUserTweetsProfile({ ...userTweetsProfile, ...newData });
    };



    const getProfileFeed = (profileId) =>{

        try{
            fetch(`/api/${profileId}/feed`)
            .then((res) => {
                if(res.status === 200){
                    return res.json()
                } else{
                    setProfileTweetsStatus('error')
                }
            })
            .then((json) =>{    
                    updateUserTweetsProfile(json);
                    setProfileTweetsStatus('idle')
            })
        } 
        catch (error){
            setProfileTweetsStatus('error')
            console.log(error, 'profile Feed function')
        }

    }

    const [tweetStatusDetails, setTweetStatusDetails] =useState('loading');
    const [tweet, setTweet] = useState([]);


    const getTweetDetails = (tweetId) =>{

        try{
            fetch(`/api/tweet/${tweetId}`)
            .then((res) => {
                if(res.status === 200){
                    return res.json()
                } else{
                    setTweetStatusDetails('error')
                }
            }) 
            .then((json) =>{
                setTweet(json.tweet);
                setTweetStatusDetails('idle');
                })
            }
        catch(error){
            setTweetStatusDetails('error')
            console.log(error, 'tweetDtails function')
        }

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
