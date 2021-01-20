import React, { useContext } from 'react';
import {TweetContext} from '../TweetContext';
import styled from "styled-components";

import Retweet from './Retweet';
import AnimateRetweet from './AnimateRetweet';


const RetweetButton = ({size=40}) => {
    const { isRetweetedByCurrentUser} =  useContext(TweetContext);

    const RetweetSize = size * 0.6;

    return ( 

        <Wrapper style={{ width: size, height: size }}>
            {isRetweetedByCurrentUser ? (
            <AnimateRetweet >
                <Retweet width={RetweetSize} isToggled={isRetweetedByCurrentUser} />
            </AnimateRetweet>
            ) : <Retweet width={RetweetSize} isToggled={isRetweetedByCurrentUser} /> }
        </Wrapper>

    );
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default RetweetButton;