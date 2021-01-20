import React from 'react';
import styled from 'styled-components';
import TweetListItem from './TweetListItem';


const TweetList = ({userTweets}) => {

    

    const { tweetsById, tweetIds } = userTweets;
    console.log(userTweets, 'TweetList')

    
    return ( 
        <>
            
            <ul>
                {tweetIds.map(tweet =>{
                    
                    return(
                        <Li key={tweet}>
                            <TweetListItem tweet={tweetsById[tweet]} />
                        </Li> 

                    )
                })}
            </ul>
    </> );
}

const Li = styled.li`
    list-style-type: none;
`
 



export default TweetList;