import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { COLORS } from "../constants";
import {useParams} from "react-router-dom";
import TweetListItem from './TweetListItem';
import {BsArrowLeft} from 'react-icons/bs';
import { useHistory } from "react-router-dom";


const TweetDetails = () => {

    
    const { tweetId } = useParams();
    const [tweet, setTweet] = useState([]);
    const history = useHistory();
    const [tweetStatus, setTweetStatus] =useState('loading');

    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json()) 
        .then((json) =>{

            const APIStatus = json.status; 
                if (APIStatus === 404) {
                    console.log('error');
                    setTweetStatus('error')

            } else{
                setTweet(json.tweet);
                setTweetStatus('idle');
                console.log(json, 'tweet')
            }
        })
        
    }, []);

    const handleClick = () =>{

        history.push(`/`)
    }

    if(tweetStatus === 'loading'){

        return (
            <div>
                ... is loading
            </div>
        )
    }
    else if(tweetStatus === 'error'){
        
        return (
            <div>
                ... error
            </div>
        )

    }



    return ( 
        <Wrapper>
        <HeaderDiv>
            <BsArrowLeft /> <button onClick={handleClick}> Meow</button>

        </HeaderDiv>
    
        <div> 
            <TweetListItem tweet={tweet} /> 
        </div> 
        </Wrapper>);
}

const Wrapper = styled.div`
    height: fit-content;

`;

const HeaderDiv = styled.div`
    list-style-type: none;
    border-bottom: solid 2px ${COLORS.lightgrayColor};
    padding: 20px;

    & button{
        border: none;
        background-color: white;
        font-size: 20px;
        font-weight: bold;
    }
`

export default TweetDetails;