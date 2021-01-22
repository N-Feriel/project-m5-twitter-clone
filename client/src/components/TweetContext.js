import moment from 'moment';
import React, { useState } from 'react';
import { CurrentUserContext } from "./CurrentUserContext";


export const TweetContext = React.createContext(null);

export const TweetProvider =({children}) =>{

    //const date(time) = moment().format('h:mm a - MMM Do, YYYY');

    //var date = moment(time).format("h:mm a - MMM Do, YYYY'")

    //const {currentUser} = useContext(CurrentUserContext)

    const [numOfLikes, setNumofLikes]= useState(0);
    const [numOfRetweets, setNumofRetweets]= useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isRetweeted, setIsRetweeted] = useState(false);

    const handleToggleLike = () =>{
        setIsLiked(!isLiked);
        console.log('like')
        !isLiked ? setNumofLikes(numOfLikes + 1) : setNumofLikes(numOfLikes -1);

    }

    const handleToggleRetweet = () =>{
        setIsRetweeted(!isRetweeted);
        !isRetweeted ? setNumofRetweets(numOfRetweets + 1) : setNumofRetweets(numOfRetweets -1);

    }


   
    const data = {
            "id": "1209791721099411456r1",
            "timestamp": "2019-12-26T14:38:00+00:00",
            "status": "If you're a 🇬🇧 diplomat abroad today, let me know where you are and what you're up to!",
            "media": [],
            "retweetFrom": {
                "handle": "treasurymog",
                "displayName": "Gladstone, Esq.",
                "avatarSrc": "/assets/treasurymog-avatar.jpg",
                "bannerSrc": "/assets/treasurymog-banner.jpeg",
                "location": "Whitehall, London",
                "joined": "2016-10-12T12:00",
                "bio": "I live and work at the Treasury as a mouser but I also have a paw in the finances. Here to help lighten up the political world. Unofficial.",
                "numFollowing": 2,
                "numFollowers": 2,
                "numLikes": 1,
                "isFollowingYou": false,
                "isBeingFollowedByYou": false
            },
            "author": {
                "handle": "diplomog",
                "displayName": "Palmerston",
                "avatarSrc": "/assets/diplomog-avatar.jpg",
                "bannerSrc": "/assets/diplomog-banner.jpeg",
                "location": "Whitehall",
                "url": "http://fco.gov.uk",
                "joined": "2016-02-02T12:00",
                "bio": "Best friends with @treasurymog.",
                "numFollowing": 1,
                "numFollowers": 1,
                "numLikes": 1,
                "isFollowingYou": true,
                "isBeingFollowedByYou": true
            },
            "isLiked": false,
            "isRetweeted": false,
            "numLikes": 0,
            "numRetweets": 0
        
    };





    return <TweetContext.Provider 
                value={{
                    handleToggleLike,
                    handleToggleRetweet
                    
                }}
    >
        {children}
    </TweetContext.Provider>


}
