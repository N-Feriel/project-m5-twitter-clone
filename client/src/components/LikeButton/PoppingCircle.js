import React from 'react';
import styled, {keyframes} from "styled-components";


const scale = keyframes`
    from {
        transform: scale(0)
    }
    to {
        transform: scale(2)
    }
`;

const fade = keyframes`
    from {
        opacity: 1;   
    }
    to {
        opacity: 0;
    }
`;

const Wrapper = styled.div`
    border-radius: 50%;
    animation: ${scale} 300ms forwards, ${fade} 500ms forwards;
`;

const PoppingCircle = ({size, color}) => {
    
    
    return ( <Wrapper style={{backgroundColor: color , width: size, height: size}} />
    
        );

}



export default PoppingCircle;