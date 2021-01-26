
import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';

import { Icon } from 'react-icons-kit';
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';


const ErrorPage = () => {

    return (
        <Wrapper >
            <Icon icon={bomb} size='50px' />
            <h1>An unknown error has occurred.</h1>
            <div>
                Please try refreshing the page, or <Link onClick={(e) =>{e.stopPropagation()}}> contact support</Link>   
                if the problem persists.
                
            </div>  
        </Wrapper> );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80vw; 
    height:100vh;

    & h1{
        margin: 20px;
    }
    & div{
        margin: 20px;
    }

`

export default ErrorPage;