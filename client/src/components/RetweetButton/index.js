import React from 'react';
import styled from "styled-components";
import AnimateRetweet from './AnimateRetweet';
import PoppingCircle from '../LikeButton/PoppingCircle';

import Retweet from './Retweet';



const RetweetButton = ({size=40, isRetweetedByCurrentUser}) => {

    const RetweetSize = size * 0.6;

    return ( 

        <Wrapper style={{ width: size, height: size }}>
            {isRetweetedByCurrentUser && <PoppingCircle size={size} color="#43a047" />}

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