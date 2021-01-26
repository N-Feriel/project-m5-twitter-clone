import React, {useContext} from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";
import TweetDetails from "./components/TweetDetails";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Sidebar";

import {CurrentUserContext} from './components/CurrentUserContext';
import { COLORS } from "./constants";
import { TweetProvider } from "./components/TweetContext";


function App() {

  const {status} = useContext(CurrentUserContext);


  return (
    <BrowserRouter>
      
      <GlobalStyles />

      {status === 'idle' && 
        <Wrapper>
          <Sidebar />

          <TweetProvider>
            <Main >
              <Switch>
                <Route exact path="/">
                  <HomeFeed />
                </Route>

                <Route exact path="/notifications" >
                  <Notifications />
                </Route>

                <Route exact path="/bookmarks" >
                  <Bookmarks />
                </Route>

                <Route exact path="/tweet/:tweetId" >
                    <TweetDetails />
                </Route>
                
                <Route exact path="/:profileId" >
                  <Profile />
                </Route>
              </Switch>
            </Main>
          </TweetProvider>
        </Wrapper>
  }
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  display: flex;

`;

const Main = styled.div`
  display: flex;
  margin:  0 50px;
  border: solid 2px ${COLORS.lightgrayColor};

`;


export default App;
