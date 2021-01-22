import React from 'react';
import Header from './Tweet/Header';
import ActionBar from './Tweet/ActionBar'
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from "react-router-dom";



const TweetListItem = ({tweet}) => {

    const history = useHistory();


    const handleTweetDetails = (tweetId) =>{
        console.log(tweetId, 'tweetId')
        history.push(`/tweet/${tweetId}`)
    }
    


    
    return (<Wrapper>
        <DivHeader>
        <Header  user={tweet.author} />
        <Timestamp>
            {moment(tweet.timestamp).format("- MMM Do")}
        </Timestamp>
        </DivHeader>


        <DivContent>
            <TweetContents onClick={()=> handleTweetDetails(tweet.id)}>{tweet.status}</TweetContents>

            {tweet.media &&

            <div>
                {tweet.media.length !== 0 ? (
                    <ImgPost  src={tweet.media[0].url }/>     
                ) : ("")}
            </div>

            }

            <ActionBar />
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