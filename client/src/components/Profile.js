import React, {useContext, useEffect, useState} from 'react';
import { CurrentUserContext } from "./CurrentUserContext";
import {TweetContext} from './TweetContext';
import styled from 'styled-components';
import {useParams} from "react-router-dom";
import moment from 'moment';
import TweetList from './TweetList';
import {IoLocationOutline} from 'react-icons/io5';
import {AiOutlineCalendar} from 'react-icons/ai';
import { COLORS } from "../constants";
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';





const Profile = () => {
    
    const {currentUser} = useContext(CurrentUserContext);


    const {getProfileFeed,
        setProfileTweetsStatus,
        profileTweetsStatus,
        userTweetsProfile} = useContext(TweetContext)
        
        
    const [userProfile, setUserProfile] = useState([]);
        
    const [profileStatus, setprofileStatus ] =useState('loading')
        
        //const [userTweetsProfile, setUserTweetsProfile] = useState([]);
        
    const [isTweetsList , setisTweetsList] = useState(false);

    const [isMedia , setisMedia] = useState(false);

    const [islikes , setisLike] = useState(false);


    const [isBeingFollowedByYou, setIsBeingFollowedByYou] = useState(false);
    
    const [following, setFollowing] =useState({});
    
    const [followers, setFollowers] =useState({});
        
    const { profileId } = useParams();
        
    const updateUserProfile = (newData) => {
        //console.log(newData, 'profile')
        setUserProfile({ ...userProfile, ...newData });
    };


    // const updateUserTweetsProfile = (newData) => {
    //     console.log('data', newData)
    //     setUserTweetsProfile({ ...userTweetsProfile, ...newData });
    // };

    // console.log(location.pathname, 'ProfileFeed');




    useEffect(() => {

        try{
            fetch(`/api/${profileId}/profile`)
            .then((res) =>(res.json()))
            .then((json) =>{
                updateUserProfile(json.profile)
                setIsBeingFollowedByYou(json.profile.isBeingFollowedByYou)
                setprofileStatus('idle')
        
            })
        } catch(error){
            setprofileStatus('error')
            console.log('error in profile page', error);
        }
        
    }, []);


    const getUserTweets = (e) =>{

        e.stopPropagation();

        setProfileTweetsStatus('loading');
        setisMedia(false);;
        setisTweetsList(true);
        getProfileFeed(profileId);
    }

    const getUserMedias = (e) =>{

        e.stopPropagation();
        setProfileTweetsStatus('loading');
        setisMedia(true);
        setisTweetsList(false);
        getProfileFeed(profileId);
    }

    const getUserLikes = (e) =>{

        e.stopPropagation();
        setProfileTweetsStatus('loading');
        setisLike(true);
        setisTweetsList(false);
        setisMedia(false)
        getProfileFeed(profileId);
    }


            

    const HandleFolllowing = (ev) =>{

        ev.stopPropagation();

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
            <LoadingPage />
        )
    }
    else if(profileStatus === 'error'){

        return (
            <ErrorPage />
        )

    }


    return ( 
        <Wrapper style={{minHeight: '100vh',minWidth: '80vw'}}>
            
            <Wrapper>
                <Banner src={userProfile.bannerSrc} />
                <DivHeader>
                    <Avatar src={userProfile.avatarSrc} />
                    {currentUser.handle !== profileId &&
                        <Button  className={`${isBeingFollowedByYou ? 'active' : ' '}`}
                            onClick= {(ev) => HandleFolllowing(ev, userProfile)}>{isBeingFollowedByYou ? "Following" : "Follow"}</Button>
                    }
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
                <button onClick= {(e)=> getUserTweets(e)} >Tweets</button>
                <button onClick= {(e)=> getUserMedias(e)}>Media</button>
                <button onClick= {(e)=> getUserLikes(e)}>Likes</button>
            </DivButton>

            {(isTweetsList || isMedia) && profileTweetsStatus === 'loading' &&
                <LoadingPage />
            }

            {(isTweetsList || isMedia) && profileTweetsStatus === 'error' &&
                <ErrorPage />
            }

            {profileTweetsStatus === 'idle' && isTweetsList &&
                    <TweetList userTweets= {userTweetsProfile} isTweetsList={isTweetsList} />
            }

            {profileTweetsStatus === 'idle' && isMedia &&
                <TweetList userTweets= {userTweetsProfile} isMedia={isMedia}/>

            } 
            {profileTweetsStatus === 'idle' && islikes &&
                <TweetList userTweets= {userTweetsProfile} islikes={islikes}/>

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
    border: 2px ${COLORS.primary} solid;

    background-color: ${COLORS.whiteColor};
    color: ${COLORS.primary};


    &.active{
        background-color: ${COLORS.primary};
        color: ${COLORS.whiteColor};
        border: none;
    }
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