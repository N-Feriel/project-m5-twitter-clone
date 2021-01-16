import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { COLORS } from "../constants";

import { BiHomeAlt, BiBookmark , BiUser} from 'react-icons/bi'
import {MdNotificationsNone} from 'react-icons/md';
import styled from 'styled-components';
import logo from "../assets/logo.svg";
import NavigationLink from './NavigationLink';



const Sidebar = () => {
    return ( 

    <Wrapper>

            <Logo src={logo}/> 
        
        <Nav>

            <>
                <NavigationLink route={'/'} iconName= {<BiHomeAlt />} name={'Home'} />
                <NavigationLink route={"/:profileId"} iconName= {<BiUser />} name={'Profile'} />
                <NavigationLink route={'/notifications'} iconName= {<MdNotificationsNone />} name={'Notifications'} />
                <NavigationLink route={'/bookmarks'} iconName= {<BiBookmark />} name={'Bookmarks'} />
                
            </>
            
        </Nav> 
    </Wrapper>
    );
};


const Wrapper = styled.div`

    margin: 10px 20px 10px 0;
    padding: 10px;

`

const Logo = styled.img`
    margin-bottom: 20px;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;

`

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


export default Sidebar;