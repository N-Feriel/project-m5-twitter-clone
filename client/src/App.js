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
import {TweetProvider} from "./components/TweetContext";
import {CurrentUserContext} from './components/CurrentUserContext';
import { COLORS } from "./constants";


function App() {

  const {status} = useContext(CurrentUserContext);

  return (
    <BrowserRouter>
      
      <GlobalStyles />

      {status === 'idle' && 
        <Wrapper>
          <Sidebar />

          <Main>
            <Switch>
              <Route exact path="/">
              <TweetProvider>
                <HomeFeed />
              </TweetProvider>
              </Route>

              <Route exact path="/notifications" >
                <Notifications />
              </Route>

              <Route exact path="/bookmarks" >
                <Bookmarks />
              </Route>

              <Route exact path="/tweet/:tweetId" >
                <TweetProvider>
                  <TweetDetails />
                </TweetProvider>
              </Route>

              <Route exact path="/:profileId" >
              <TweetProvider>
                <Profile />
              </TweetProvider>
              </Route>
            </Switch>
          </Main>
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
