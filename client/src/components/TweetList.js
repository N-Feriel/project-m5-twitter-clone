import React from 'react';
import styled from 'styled-components';
import TweetListItem from './TweetListItem';




const TweetList = ({userTweets}) => {

    const { tweetsById, tweetIds } = userTweets;

    return ( 
        <>
            <ul>
                {tweetIds.map(tweet =>{

                    return(
                        <Li key={tweet} >
                            <TweetListItem tweet={tweetsById[tweet]} />
                        </Li> 

                    )
                })}
            </ul>
    </> );
}

const Li = styled.li`
    list-style-type: none;
    margin-bottom: 10px;
`



export default TweetList;