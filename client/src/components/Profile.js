import React, {useContext, useEffect, useState} from 'react';
import { CurrentUserContext } from "./CurrentUserContext";
import styled from 'styled-components';
import {useParams} from "react-router-dom";
import moment from 'moment';
import TweetList from './TweetList';
import {IoLocationOutline} from 'react-icons/io5';
import {AiOutlineCalendar} from 'react-icons/ai';
import { COLORS } from "../constants";




const Profile = () => {
    
    //const {currentUser} = useContext(CurrentUserContext);

    const [userProfile, setUserProfile] = useState([]);

    const [profileStatus, setprofileStatus ] =useState('loading')

    const [userTweets, setUserTweets] = useState([]);

    const [isTweetsList , setisTweetsList] = useState(false);
    const [isBeingFollowedByYou, setIsBeingFollowedByYou] = useState(false);

    const [following, setFollowing] =useState({});

    const [followers, setFollowers] =useState({})




    const { profileId } = useParams();

    //console.log('profileId', profileId)

    const updateUserProfile = (newData) => {
        //console.log(newData, 'profile')
        setUserProfile({ ...userProfile, ...newData });
    };

    const updateUserTweets = (newData) => {
        console.log('data', newData)
        setUserTweets({ ...userTweets, ...newData });
    };




    useEffect(() => {
        
        fetch(`/api/${profileId}/profile`)
        .then((res) => res.json())
        .then((json) =>{
            const APIStatus = json.status; 
            if (APIStatus === 404) {
                console.log('error');
                setprofileStatus('error')
                
            } else{
                updateUserProfile(json.profile)
                setIsBeingFollowedByYou(json.profile.isBeingFollowedByYou)
                setprofileStatus('idle')
            }
        })

        
        
    }, []);


    const GetUserTweets = () =>{

        setprofileStatus('loading');
        setisTweetsList(true);;
        console.log('getTweets')

        fetch(`/api/${profileId}/feed`)
            .then((res) => res.json())
            .then((json) =>{
                const APIStatus = json.status; 
                if (APIStatus === 404) {
                    console.log('error');
                    setprofileStatus('error')

            } else{
                updateUserTweets(json);
                setprofileStatus('idle')
                
            }
        })
    }
            

    const HandleFolllowing = (ev) =>{

        if (isBeingFollowedByYou){
            //console.log('call unFollow')
            fetch(`/api/${profileId}/unfollow`, {
                method: "PUT",
                //body: JSON.stringify(profileId),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {res.json()})
            .then((json) => {
                setIsBeingFollowedByYou(false)
            })

        } else if(!(isBeingFollowedByYou)){
            //console.log('call Follow')
            fetch(`/api/${profileId}/follow`, {
                method: "PUT",
                //body: JSON.stringify(profileId),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {res.json()})
            .then((json) => {
                setIsBeingFollowedByYou(true);
            })
        }
    }

    useEffect(() => {
        
        fetch(`/api/${profileId}/following`)
        .then((res) => res.json())
        .then((json) =>{
            const APIStatus = json.status; 
            if (APIStatus === 404) {
                console.log('error');
                
            } else{
                setFollowing(json.following)
            }
        })

        fetch(`/api/${profileId}/followers`)
        .then((res) => res.json())
        .then((json) =>{
            const APIStatus = json.status; 
            if (APIStatus === 404) {
                console.log('error');
                
            } else{
                setFollowers(json.followers)
            }
        })

    }, [isBeingFollowedByYou]);



    if(profileStatus === 'loading'){

        return (
            <div>
                ... is loading
            </div>
        )
    }
    else if(profileStatus === 'error'){
        
        return (
            <div>
                ... error
            </div>
        )

    }


    return ( 
        <Wrapper>
        <Wrapper>
                <Banner src={userProfile.bannerSrc} />
            <DivHeader>
                <Avatar src={userProfile.avatarSrc} />
                <Button onClick= {() => HandleFolllowing(userProfile)}>{isBeingFollowedByYou ? "Following" : "Follow"}</Button>
            </DivHeader>
            <DivMain>

                <DisplayName>{userProfile.displayName}</DisplayName>
                <div style={{display:'flex'}}>
                    <UserInfo>@{userProfile.handle}</UserInfo>
                    <span style={{color:`${COLORS.grayColor}`, 
                                backgroundColor:`${COLORS.lightgrayColor}`,
                                marginLeft: '10px',
                                borderRadius: '5px',
                                padding: '2px 10px',
                                alignSelf: 'self-start'
                                }}>
                        {userProfile.isFollowingYou ? "Follows you" : "not Follows you"}</span>
                </div>

                <div style={{marginTop: '20px'}}>{userProfile.bio}</div>

                <Div> 
                    <span>
                        <IoLocationOutline /> {userProfile.location}
                    </span>

                    <span>
                        <AiOutlineCalendar /> Joined {moment(userProfile.joined).format("MMM, YYYY")}

                    </span>

                </Div>

                <Div>
                    <span>
                        <strong>{Object.keys(following).length}</strong> Followings
                    </span>
                    <span>
                        <strong>{Object.keys(followers).length}</strong> Followers
                    </span>

                </Div>
            </DivMain>


        </Wrapper>

        <DivButton>
            <button onClick= {GetUserTweets} >Tweets</button>
            <button>Media</button>
            <button>Likes</button>
        </DivButton>

            {profileStatus === 'idle' && isTweetsList &&
                    <TweetList userTweets= {userTweets} />
            }

        </Wrapper>

    );
};


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

`

const DivHeader = styled.div`
    display: flex;
    justify-content: space-between;

`
const DivMain = styled.div`
    margin: 10px 20px;
    display: flex;
    flex-direction: column;

`


const Banner = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    background-repeat: no-repeat;
`;

const Avatar = styled.img`
    width: 100px;
    height: 100px;
    border: 2px solid ${COLORS.whiteColor};
    border-radius: 50%;
    margin: -50px 20px 20px 20px; 
`;

const Div = styled.div`
    margin-top: 20px;
    display: flex;
    //justify-content: space-between;
    width: 30%;
    color: ${COLORS.grayColor};

    & span:last-of-type{
        margin-left: 20px; 
        
    }

`
const DisplayName = styled.div`
    font-size: 15px;
    line-height: 20px;
    margin-right: 10px;
    font-weight: bold;
`;

const UserInfo = styled.div`
    font-size: 15px;
    line-height: 20px;
    color: ${COLORS.grayColor};
`;

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

const DivButton = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    

    & button{
        padding: 10px;
        width: 33.33%;
        border: none;
        background-color: transparent;
        font-size: 18px;
        border-bottom: solid 1px ${COLORS.lightgrayColor};
    }

    & button:active, 
    & button:hover {
        color: ${COLORS.primary};
        border-bottom: solid 2px ${COLORS.primary};
    }


`


export default Profile;