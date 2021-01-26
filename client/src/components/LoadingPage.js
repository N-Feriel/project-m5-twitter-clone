import React from 'react';
import styled from "styled-components";
import AnimationLoad from './AnimationLoad';
import {FiLoader} from 'react-icons/fi';

const LoadingPage = () => {
    return ( 

        <Wrapper>
            <AnimationLoad>    
                <FiLoader  size= '40px' />
            </AnimationLoad>
        </Wrapper>

    );
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 80vw;

`

export default LoadingPage;