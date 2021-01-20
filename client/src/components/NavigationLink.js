import React from 'react';
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

import { COLORS } from "../constants";


const NavigationLink = ({iconName, route, name}) => {
    return ( <StyledNavLink exact to={route} >
        {iconName} {name}

    </StyledNavLink> );
}


const StyledNavLink = styled(NavLink)`

    display: flex;
    font-size: 18px;
    height: 42px;
    margin: 8px;
    padding: 10px;
    text-decoration: none;
    border-radius: 20px;
    align-self: baseline;
    justify-content: center;
    align-content: center;
    color: black;

    &:disabled {
    opacity: 0.5;
    }

    &.active, &:hover  {
        background-color: ${COLORS.secondary};
        color: ${COLORS.primary};
    }

`;

export default NavigationLink;