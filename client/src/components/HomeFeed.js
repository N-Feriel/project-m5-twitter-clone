import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TweetList from './TweetList';

import {CurrentUserContext} from './CurrentUserContext';
import { COLORS } from "../constants";

const HomeFeed = () => {
    const {currentUser} = useContext(CurrentUserContext);

    const [userTweets, setUserTweets] = useState([]);

    const [tweetStatus, settweetStatus ] =useState('loading');

    const [newTweetStatus, setNewTweetStatus ] =useState('loading');

    const [addOpacity, setAddOpacity] = useState(false);

    const [remainingSpaceTweet, setRemainingSpaceTweet] =useState(280);



    const initialValue = "What's happining? ";

    const [valueTweet, setvalueTweet] = useState(initialValue);

    const updateUserTweets = (newData) => {
        setUserTweets({ ...userTweets, ...newData });
    };

    const HandleChange = (event) =>{
        setAddOpacity(true);
        setvalueTweet(event)
        setRemainingSpaceTweet(280 - event.length);

    }

    const HandleSubmit = (ev) =>{

        setNewTweetStatus('loading');

        fetch(`/api/tweet`, {
            method: "POST",
            body: JSON.stringify({status: ev}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        
        .then((res) =>{
            //console.log(json, 'res json')
            const APIStatus = res.status 
            if (APIStatus === 404) {
                setNewTweetStatus('error')
                console.log('error', APIStatus);
                
            } else{

                //res.json().then(res => (console.log(res)))
                setNewTweetStatus('succes');
                setvalueTweet(initialValue);
                setAddOpacity(false);
            }
        })

    }

    useEffect(() => {        
        fetch(`/api/me/home-feed`)
        .then((res) => res.json())
        .then((json) =>{
            const APIStatus = json.status; 
            if (APIStatus === 404) {
                console.log('error');
                settweetStatus('error')
                
            } else{
                updateUserTweets(json)
                settweetStatus('idle')
            }
        })
        
    }, [newTweetStatus]);

    
    if(tweetStatus === 'loading'){

        console.log('load', userTweets)
        return (
            <div>
                ... is loading
            </div>
        )
    }
    else if(tweetStatus === 'error' || newTweetStatus === 'error'){
        
        return (
            <div>
                ... error
            </div>
        )

    }

    else if (tweetStatus === 'idle'){

        return ( 
    
            <Wrapper>
                <div >
                    <Header> Home </Header>
                    <TweetPost className= {addOpacity ? 'isFocus' : ''}> 
                        <div style={{display:'flex', alignSelf:'flex-start'}}>
                            <Avatar src={currentUser.avatarSrc} />
                            <label htmlFor={valueTweet} />
                            <Input
                                type='text'
                                name= 'newTweet'
                                onChange={(ev) => HandleChange(ev.target.value)}
                                value={valueTweet}
                                />
                        </div>
                        <div  style={{display:'flex', alignSelf:'flex-end'}}>
                            <div style={{alignSelf:'center'}}>{remainingSpaceTweet}</div>
                            <Button  onClick={() =>HandleSubmit(valueTweet)} >Meow</Button>
                        </div>
                    </TweetPost>
                </div>
                <TweetList userTweets= {userTweets} />
        
            </Wrapper>        
        )
    }

}


const Wrapper = styled.header`
    display: flex;
    flex-direction: column;
    margin: 20px 0;

`;

const Header = styled.h1`
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
    border-bottom: solid 1px ${COLORS.lightgrayColor};

`

const Input = styled.input`
    border: none;
    height: 200px;
    width: 600px;
    margin: 10px;
    text-align: top;
    padding: 10px;


`

const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`;


const TweetPost = styled.div`
    opacity: 0.2;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: solid 1px ${COLORS.lightgrayColor};
    margin: 20px;
    width: 90%;

    &.isFocus{
        opacity: 1;
    }

`

const Button = styled.button`
    width: 100px;
    align-self: flex-end;
    padding: 8px 10px;
    margin: 20px;
    font-weight: bold;
    font-size: 18px;
    border-radius: 20px;
    border: none;
    background-color: ${COLORS.primary};
    color: ${COLORS.whiteColor};
`

export default HomeFeed;