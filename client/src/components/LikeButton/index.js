import React from 'react';
import styled from "styled-components";

import Heart from './Heart';
import AnimateLike from './AnimateLike';
import PoppingCircle from './PoppingCircle';



const LikeButton = ({size=40, isLikedByCurrentUser}) => {
    //const { isLikedByCurrentUser} =  useContext(TweetContext);

    const heartSize = size * 0.6;

    return ( 
        <Wrapper style={{ width: size, height: size }}>

            {isLikedByCurrentUser && <PoppingCircle size={size} color="#E790F7" />}

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