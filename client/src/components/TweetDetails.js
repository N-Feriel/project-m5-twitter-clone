import React, {useEffect, useState} from 'react';
import Tweet from './Tweet';

import {
    useParams
  } from "react-router-dom";


const TweetDetails = () => {

    
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState([]);

    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json()) 
        .then((json) =>{
            setTweet(json.tweet)
        })
        
    }, []);



    return ( <div> 
        {/* <Tweet /> */}
        test
    
    </div> );
}

export default TweetDetails;