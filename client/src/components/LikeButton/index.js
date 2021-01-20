import React, { useContext } from 'react';
import styled from "styled-components";

import Heart from './Heart';
import AnimateLike from './AnimateLike';
import {TweetContext} from '../TweetContext'


const LikeButton = ({size=40}) => {
    const { isLikedByCurrentUser} =  useContext(TweetContext);

    const heartSize = size * 0.6;

    return ( 

        <Wrapper style={{ width: size, height: size }}>
        {isLikedByCurrentUser ? (
        <AnimateLike >
            <Heart width={heartSize} isToggled={isLikedByCurrentUser} />
        </AnimateLike>
        ) : <Heart width={heartSize} isToggled={isLikedByCurrentUser} /> }
    </Wrapper>

    );
}

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default LikeButton;