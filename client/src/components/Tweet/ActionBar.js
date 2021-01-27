import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";

import LikeButton from "../LikeButton";
import Action from "./Action";
import TweetActionIcon from "../TweetActionIcon";
import Retweet from "../RetweetButton";
import { TweetContext } from "../TweetContext";

        
const ActionBar = ({tweet, showNumberOfLikes, showNumberOfRetweets}) => {


    const { getHomeFeed, getProfileFeed, getTweetDetails, location } = useContext(TweetContext);
    
    const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(tweet.isLiked);

    const [isRetweetedByCurrentUser, setIsRetweetedByCurrentUser] = useState(tweet.retweet);


    const handleToggleLike = (ev, tweet) =>{
        ev.stopPropagation();

        const tweetId = tweet.id;
        const profileId = tweet.author.handle;


        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ like: true })
        };

        fetch(`/api/tweet/${tweetId}/like`, requestOptions)
            .then((res) => res.json())
            .then(json =>{
                const APIStatus = json
                if (APIStatus.error) {
                    console.log('error', APIStatus);
                    alert(APIStatus.error)

                } else if(APIStatus.success){
                    //console.log('json', json);
                    setIsLikedByCurrentUser(true);

                    if(location.pathname=== '/'){
                        //console.log('getHome feed is called');
                        getHomeFeed();
                    } else if(location.pathname ===`/${profileId}`){
                        //console.log('getProfile feed is called');
                        getProfileFeed(profileId);
                    } else if(location.pathname ===`/tweet/${tweetId}`){
                        getTweetDetails(tweetId)
                    }

                }
            })
    }


    const handleToggleRetweet = (ev, tweet) =>{
        ev.stopPropagation();

        const tweetId = tweet.id;
        const profileId = tweet.author.handle;

        console.log('profile', profileId)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ retweet: true })
        };

        fetch(`/api/tweet/${tweetId}/retweet`, requestOptions)
            .then((res) => res.json())
            .then(json =>{
                const APIStatus = json
                if (APIStatus.error) {
                    console.log('error', APIStatus);
                    alert(APIStatus.error)

                } else if(APIStatus.success){
                    //console.log('json succees', json);
                    setIsRetweetedByCurrentUser(true);
                    //console.log(location, 'location')

                    if(location.pathname=== '/'){
                        //console.log('getHome feed is called', location);
                        getHomeFeed();
                    } else if(location.pathname ===`/${profileId}`){
                        //console.log('getProfile feed is called', location );
                        getProfileFeed(profileId);
                    } else if(location.pathname ===`/tweet/${tweetId}`){
                        getTweetDetails(tweetId)
                    }
                }
            })
    }


    return (
    <Wrapper>
        <Action color="rgb(27, 149, 224)" size={40} onClick={(e) => e.stopPropagation()}>
            <TweetActionIcon kind="reply" />
        </Action>

        <Action color="rgb(23, 191, 99)" size={40} onClick={(e) => handleToggleRetweet(e, tweet)}>
            <Retweet isRetweetedByCurrentUser = {isRetweetedByCurrentUser} />
            {showNumberOfRetweets && (tweet.numRetweets) &&
                <div style={{color:'rgb(23, 191, 99',
                    marginLeft: '5px'}}> {tweet.numRetweets} </div>
            }
        </Action>

        <Action color="rgb(224, 36, 94)" size={40} onClick={(e) => handleToggleLike(e, tweet)}>
            <LikeButton  isLikedByCurrentUser={isLikedByCurrentUser}/>

            {showNumberOfLikes && (tweet.numLikes) &&
                <div style={{color:'rgb(224, 36, 94)',
                    marginLeft: '5px'}}> {tweet.numLikes} </div>
            }
            
        </Action>
        <Action color="rgb(27, 149, 224)" size={40} onClick={(e) => e.stopPropagation()}>
            <TweetActionIcon kind="share" />
        </Action>
    </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 48px;

`;

export default ActionBar;
