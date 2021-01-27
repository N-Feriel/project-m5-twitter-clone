import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const Header = ({user}) => {

    const history = useHistory();

    const handleProfileDetails = (e, profileId) =>{

        e.stopPropagation();
        history.push(`/${profileId}`)
    }

    const handleKeyPress = (event, userId) => {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
            handleProfileDetails(event, userId)
        }
    }

    
    return (
        <Wrapper  >
            <Avatar src={user.avatarSrc} />
            <Name>
                <DisplayName tabIndex="0" onKeyUp={(ev) => handleKeyPress(ev, user.handle)} onClick={(e) => handleProfileDetails(e, user.handle)}>
                    {user.displayName}
                </DisplayName>
                <Username >@{user.handle}</Username>
            </Name>
        </Wrapper>
    );
};

const Wrapper = styled.header`
    display: flex;
`;

const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
`;

const Name = styled.div`
    flex: 1;
    display: flex;
    /* flex-direction: column;
    justify-content: center; */
    padding: 0px 16px;
`;

const DisplayName = styled.div`
    font-size: 15px;
    line-height: 20px;
    margin-right: 10px;
    font-weight: bold;

    :hover{
        text-decoration: underline;
    }
`;

const Username = styled.div`
    font-size: 15px;
    line-height: 20px;
    color: rgb(101, 119, 134);
`;

export default Header;