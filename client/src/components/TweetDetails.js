import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import { COLORS } from "../constants";
import {useParams} from "react-router-dom";
import TweetListItem from './TweetListItem';
import {BsArrowLeft} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import ErrorPage from './ErrorPage';
import LoadingPage from './LoadingPage';
import { TweetContext } from './TweetContext';


const TweetDetails = () => {

    const {tweet, tweetStatusDetails, getTweetDetails} = useContext(TweetContext)
    
    const { tweetId } = useParams();
    // const [tweet, setTweet] = useState([]);
    const history = useHistory();
    // const [tweetStatus, setTweetStatus] =useState('loading');


    useEffect(() => {
        getTweetDetails(tweetId)
        
    }, []);



    const handleClick = (e) =>{
        e.stopPropagation();
        history.push(`/`)
    }

    if(tweetStatusDetails === 'loading'){

        return (
            <LoadingPage />
        )
    }
    else if(tweetStatusDetails === 'error'){
        
        return (
            <ErrorPage />
        )

    }

    //console.log(location.pathname, 'tweet Details');

    return ( 
        <Wrapper tabIndex="0">
        <HeaderDiv>
            <BsArrowLeft /> <button onClick={(ev) => handleClick(ev)}> Meow</button>

        </HeaderDiv>
        <div > 
            <TweetListItem tweet={tweet} isBig /> 
        </div> 
        </Wrapper>);
}

const Wrapper = styled.div`
    //height: fit-content;
    display: flex;
    flex-direction: column;
    

`;

const HeaderDiv = styled.div`
    list-style-type: none;
    border-bottom: solid 2px ${COLORS.lightgrayColor};
    padding: 20px;

    & button{
        border: none;
        background-color: white;
        font-size: 20px;
        font-weight: bold;
    }
`

export default TweetDetails;