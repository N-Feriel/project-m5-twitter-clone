import React, {useContext} from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const Header = ({user}) => {

    const history = useHistory();

    const handleProfileDetails = (profileId) =>{
        console.log(profileId, 'profile')
        history.push(`/${profileId}`)

    }

    
    return (
        <Wrapper onClick={() => handleProfileDetails(user.handle)}>
            <Avatar src={user.avatarSrc} />
            <Name>
            <DisplayName>{user.displayName}</DisplayName>
            <Username>@{user.handle}</Username>
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
`;

const Username = styled.div`
    font-size: 15px;
    line-height: 20px;
    color: rgb(101, 119, 134);
`;

export default Header;