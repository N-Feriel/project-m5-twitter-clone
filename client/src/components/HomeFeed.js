import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import TweetList from './TweetList';

import {CurrentUserContext} from './CurrentUserContext';
import { COLORS } from "../constants";
import { TweetContext } from './TweetContext';
import AnimationLoad from './AnimationLoad';

import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';

const HomeFeed = () => {
    const {currentUser} = useContext(CurrentUserContext);

    const {getHomeFeed , tweetStatus, userTweets, location} = useContext(TweetContext)

    const [newTweetStatus, setNewTweetStatus ] =useState('loading');

    const [addOpacity, setAddOpacity] = useState(false);

    const maxSpace = 280;

    const [remainingSpaceTweet, setRemainingSpaceTweet] =useState(maxSpace);

    const [warnningSpace, setWarnningSpace] =useState('');

    const [isDisabled, setIsDisabled] = useState(false);

    const initialValue = "What's happining? ";

    const [valueTweet, setvalueTweet] = useState(initialValue);

    // const updateUserTweets = (newData) => {
    //     setUserTweets({ ...userTweets, ...newData });
    // };

    const HandleChange = (event) =>{
        setAddOpacity(true);
        setvalueTweet(event)
        setRemainingSpaceTweet(maxSpace - event.length);

        if(remainingSpaceTweet > 55 && remainingSpaceTweet < maxSpace ){
            setWarnningSpace('')
        }

        else if(remainingSpaceTweet <= 55 && remainingSpaceTweet > 0){
            setWarnningSpace('warning')
            setIsDisabled(false)

        } else if(remainingSpaceTweet < 0){
            setWarnningSpace('danger')
            setIsDisabled(true)
        }
    }


    // console.log(location.pathname, 'HomeFeed');

    const HandleSubmit = (ev) =>{

        setNewTweetStatus('loading');

        if(remainingSpaceTweet > 0){

            fetch(`/api/tweet`, {
                method: "POST",
                body: JSON.stringify({status: ev}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            
            .then((res) =>{
                console.log(res, 'res json')
                const APIStatus = res.status 
                if (APIStatus === 404) {
                    setNewTweetStatus('error')
                    console.log('error', APIStatus);
                    
                } else{
                    //res.json().then(res => (console.log(res)))
                    setNewTweetStatus('success');
                    setvalueTweet(initialValue);
                    setAddOpacity(false);
                }
            })
        }
        

    }


    useEffect(() => {    

        getHomeFeed()
        
    }, [newTweetStatus]);

    
    if(tweetStatus === 'loading'){

        return (
            <LoadingPage />

        )
    }
    else if(tweetStatus === 'error' || newTweetStatus === 'error'){
        
        return (
            <ErrorPage />
        )

    }

    else if (tweetStatus === 'idle'){

        return ( 
    
            <Wrapper>

                <div>
                    <Header> Home </Header>
                    <TweetPost className= {addOpacity ? 'isFocus' : ''}> 
                        <div style={{display:'flex', alignSelf:'flex-start'}}>
                            <Avatar src={currentUser.avatarSrc} />
                            <label htmlFor={valueTweet} />
                            <Input  id={valueTweet} 
                                rows= "8"
                                cols='100'
                                type='text'
                                name= 'newTweet'
                                onChange={(ev) => HandleChange(ev.target.value)}
                                value={valueTweet}
                            />
                    
                        </div>
                        <div  style={{display:'flex', alignSelf:'flex-end'}}>
                            <DivRemaining className={`${warnningSpace}`}>{remainingSpaceTweet}</DivRemaining>
                            <Button  className={`${isDisabled ? 'disable' : ''}`}
                                onClick={() =>HandleSubmit(valueTweet)} >Meow</Button>
                        </div>
                    </TweetPost>
                </div>
                <TweetList userTweets= {userTweets}  isHome/>
        
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

const Input = styled.textarea`
    border: none;
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

    &.disable{
        opacity: 0.1;
    }

`

const DivRemaining = styled.div`
    align-self: center;

    &.warning{
        color: orange;
    }

    &.danger{
        color: red;
    }

`

export default HomeFeed;