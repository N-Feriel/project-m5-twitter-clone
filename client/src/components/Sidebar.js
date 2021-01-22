import React, {useContext} from 'react';

import { BiHomeAlt, BiBookmark , BiUser} from 'react-icons/bi'
import {MdNotificationsNone} from 'react-icons/md';
import styled from 'styled-components';
import logo from "../assets/logo.svg";
import NavigationLink from './NavigationLink';
import {CurrentUserContext} from './CurrentUserContext';
import { COLORS } from "../constants";




const Sidebar = () => {

    const {currentUser} = useContext(CurrentUserContext);

    return ( 

    <Wrapper>

        <Logo src={logo}/> 
        
        <Nav>

            <>
                <NavigationLink route={'/'} iconName= {<BiHomeAlt />} name={'Home'} />
                <NavigationLink route={`/${currentUser.handle}`} iconName= {<BiUser />} name={'Profile'} />
                <NavigationLink route={'/notifications'} iconName= {<MdNotificationsNone />} name={'Notifications'} />
                <NavigationLink route={'/bookmarks'} iconName= {<BiBookmark />} name={'Bookmarks'} />
                <Button>Meow</Button>
                
            </>
            
        </Nav> 
    </Wrapper>
    );
};


const Wrapper = styled.div`

    margin: 50px 30px 0  30px;

`

const Logo = styled.img`
    margin-bottom: 20px;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: column;

`

const Button = styled.button`
    width: 100px;
    padding: 8px 10px;
    margin: 20px;
    font-weight: bold;
    font-size: 18px;
    border-radius: 20px;
    border: none;
    background-color: ${COLORS.primary};
    color: ${COLORS.whiteColor};
`

export default Sidebar;