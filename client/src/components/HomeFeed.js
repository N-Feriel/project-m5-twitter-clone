import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TweetList from './TweetList';
import {useParams} from "react-router-dom";
import { TweetProvider } from './TweetContext';
import {CurrentUserContext} from './CurrentUserContext';
import Header from "./Tweet/Header"

const HomeFeed = () => {

    const [userTweets, setUserTweets] = useState([]);

    const {currentUser, status, setStatus} = useContext(CurrentUserContext);

    const updateUserTweets = (newData) => {
        setUserTweets({ ...userTweets, ...newData });
    };

    // const { handle } = useParams();

    
    useEffect(() => {
        setStatus('loading')
        
        fetch(`/api/me/home-feed`)
        .then((res) => res.json())
        .then((json) =>{
            const APIStatus = json.status; 
            if (APIStatus === 404) {
                console.log('error');
                setStatus('error')
                
            } else{
                updateUserTweets(json)
                setStatus('idle')
                console.log(updateUserTweets(json), status, 'tweetFetch')
            }
        })
        
        
    }, []);
    
    const { tweetsById, tweetIds } = userTweets;

    
    if(status === 'loading'){

        console.log('load', userTweets)
        return (
            <div>
                ... is loading
            </div>
        )
    }
    else if(status === 'error'){
        console.log('error', userTweets)
        return (
            <div>
                ... error
            </div>
        )

    }

    return ( 

        <Wrapper>

            <TweetList userTweets= {userTweets} />

            
            
            {/* <ul>
                {tweetIds.map(tweet =>{
                    return(
                        <li key={tweet}>
                            {tweet}
                        </li> 

                    )
                })}

            
            
            </ul> */}
            

        

        

        
        
    
        </Wrapper>        
    );
}


const Wrapper = styled.header`
    display: flex;
`;

const Content = styled.div`
    padding: 0 24px 24px;
`;

export default HomeFeed;