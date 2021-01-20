import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Bookmarks from "./components/Bookmarks";
import Profile from "./components/Profile";
import TweetDetails from "./components/TweetDetails";
import GlobalStyles from "./components/GlobalStyles";
import Sidebar from "./components/Sidebar";
import {TweetProvider} from "./components/TweetContext"

function App() {
  return (
    <BrowserRouter>
      
      <GlobalStyles />
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
              <TweetDetails />
            </Route>

            <Route exact path="/:profileId" >
              <Profile />
            </Route>
          </Switch>
        </Main>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 30px;
  height: calc(100vh - 110px);

`;

const Main = styled.div`
  display: flex;
  

`;


export default App;
