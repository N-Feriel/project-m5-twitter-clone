import React, {useContext} from 'react';
import { CurrentUserContext } from "./CurrentUserContext";
import styled from 'styled-components';
import {useParams} from "react-router-dom";

import Header from "./Tweet/Header";




const Profile = () => {
    
    const {currentUser} = useContext(CurrentUserContext);


    const { profileId } = useParams();

    //console.log('profileId', profileId)



    return ( 
        <>
        <Wrapper>
            <Img src={currentUser.bannerSrc} />
            <Header user={currentUser} style={{marginTop: "-100px"}}/>
            <Button >Folllow </Button>
        </Wrapper>
        </>

    );
};


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`

const Button = styled.button`
    width: 100px;
    padding: 10px;
    backgound-color: 
`


const Img = styled.img`
    height: 100px;
    width: 100%;
    object-fit: cover;
    background-repeat: no-repeat;
`
export default Profile;