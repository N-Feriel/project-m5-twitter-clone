import React from 'react';
import Header from './Tweet/Header';
import ActionBar from './Tweet/ActionBar'
import styled from 'styled-components';



const TweetListItem = ({tweet}) => {

    console.log(tweet.media.length , 'length')

    
    return (<Wrapper>
        <Header user={tweet.author} />
        <TweetContents >{tweet.status}</TweetContents>
        <div>

            {tweet.media.length > 0 && 
                <ImgPost  src={tweet.media[0].url}/>    
            }

            <ActionBar />
            <Divider />
        </div>

        
    </Wrapper>  );
}
 

const TweetContents = styled.div`
    font-size: 15px;
    margin: -25px 10px 15px 50px;
    padding: 15px;
`;

const Divider = styled.div`
    height: 1px;
    background: rgb(230, 236, 240);
`;

const ImgPost = styled.img`
    height: 30rem;
    width: 100%;
    background-repeat: no-repeat;
    border-radius: 10px;
    
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