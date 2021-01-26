import React from 'react';
import Header from './Tweet/Header';
import ActionBar from './Tweet/ActionBar'
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from "react-router-dom";

import {AiOutlineRetweet} from 'react-icons/ai';
import { COLORS } from '../constants';



const TweetListItem = ({tweet, isBig}) => {

    const history = useHistory();

    const handleTweetDetails = (e, tweetId) =>{
        e.stopPropagation();
        history.push(`/tweet/${tweetId}`)
    }


    
    return (<Wrapper tabIndex="0" onClick={(ev)=> handleTweetDetails(ev, tweet.id)}>

        {tweet.retweetFrom && 
            <div style={{margin: '20px', color:`${COLORS.grayColor}`}}>
                <AiOutlineRetweet />
                <span style={{padding: '0 15px'}}>
                    {tweet.retweetFrom.displayName}
                </span>
            </div>
        }

        <DivHeader>
            <Header  user={tweet.author} />

            {!isBig && <>
                <Timestamp>
                    {moment(tweet.timestamp).format("- MMM Do")}
                </Timestamp>
                </>
            }

        </DivHeader>

        <DivContent>
            <TweetContents >{tweet.status}</TweetContents>

            {tweet.media &&

            <div>
                {tweet.media.length !== 0 ? (
                    <ImgPost  src={tweet.media[0].url }/>     
                ) : ("")}
            </div>

            }

            {isBig && <div style={{ margin:'0 20px'}}>
                <Timestamp>
                    {moment(tweet.timestamp).format("h:mm a - MMM Do, YYYY")}
                </Timestamp>

                <div style={{display: 'flex',
                    margin:'20px 0' }}>
                    <div style={{ marginRight:'20px' }}>
                        <strong>{tweet.numLikes} </strong> Likes 
                    </div>
                    <div>
                        <strong>{tweet.numRetweets} </strong> Retweets  
                    </div>
                </div>
            </div>
            }

            <ActionBar tweet= {tweet} 
                    showNumberOfLikes={!isBig} 
                    showNumberOfRetweets={!isBig} />
        </DivContent>
        
        <Divider />

        
    </Wrapper>  );
}


const DivHeader = styled.div`
    display: flex;
`

const TweetContents = styled.div`
    font-size: 15px;
    padding: 15px;
`;

const DivContent = styled.div`
    margin: -25px 10px 15px 50px;
`

const Divider = styled.div`
    height: 1px;
    background: rgb(230, 236, 240);
    margin-bottom: 30px;
`;
const Timestamp = styled.div`
    color: rgb(101, 119, 134);
    font-size: 16px;
`;

const ImgPost = styled.img`
    height: 30rem;
    width: 100%;
    background-repeat: no-repeat;
    border-radius: 30px;
    padding: 10px;
    
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    text-align: left;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Ubuntu, "Helvetica Neue", sans-serif;

`
export default TweetListItem;