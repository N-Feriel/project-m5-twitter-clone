import React from 'react';
import styled from 'styled-components';
import TweetListItem from './TweetListItem';

const TweetMediaList = ({userTweets}) => {
    
        const { tweetsById, tweetIds } = userTweets;

        return ( 
            <>
                <ul>
                    {tweetIds.map(tweet =>{

                        return (

                            <Li key={tweet} >
                                { tweetsById[tweet].media.length > 0 &&
                                    <TweetListItem tweet={tweetsById[tweet]} />
                                }

                            </Li> 
                        )}


                    )
    
                }
                </ul>
        </> );
}

const Li = styled.li`
    list-style-type: none;
    margin-bottom: 10px;
`

export default TweetMediaList;