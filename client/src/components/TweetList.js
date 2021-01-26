import React from 'react';
import styled from 'styled-components';
import TweetListItem from './TweetListItem';





const TweetList = ({userTweets,isTweetsList, isMedia, islikes, isHome}) => {

    const { tweetsById, tweetIds } = userTweets;

    return ( 
        <>
            <ul>
                {tweetIds.map(tweet =>{

                    return(

                        
                        <Li key={tweet} >

                            {isHome &&
                                    <TweetListItem tweet={tweetsById[tweet]} />
                            }
                            {isTweetsList &&
                                <TweetListItem tweet={tweetsById[tweet]} isMedia={isMedia}/>
                            }

                            {isMedia && tweetsById[tweet].media.length > 0 &&
                                    <TweetListItem tweet={tweetsById[tweet]} />
                            }

                            {islikes && tweetsById[tweet].isLiked &&
                                    <TweetListItem tweet={tweetsById[tweet]} />
                            }


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