import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from "react-router-dom";
import './App.scss';
import Profile from './components/profile';
import Recent from './components/recent';
import getAuth from './auth/getAuth';
import GetToken from './auth/getToken';
import Navigation from './components/navigation';
import RecentArtists from './components/recent/artists/recentArtists'

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import  { updateTokens }  from './store/token'

let client_id = '38d1749c6a814d4b9663a762c01360c3'; // Your client id
let client_secret = '22a951c5f9074c6e833d147a261d9ea8'; // Your secret
let redirect_uri = 'http://localhost:3000/callback';
let scope = 'user-read-private';
let url = 'https://accounts.spotify.com/authorize?client_id=' + client_id  + '&response_type=code&redirect_uri=' + redirect_uri +'&scope=user-read-private%20user-read-email';   

function App() {
    const [profile, setProfile] = useState([]);
    const [recent, setRecent] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [auth, setAuth] = useState([]);
    const [loaded, setLoaded] = useState([]);

    const dispatch = useDispatch();
    const token = useSelector(state => state.tokens);

    useEffect(() => {
      setLoaded(false);
    

    if(auth){
      console.log(auth);
    }
 
    },[]);
    
    const changeToken = (newToken) => {
      console.log('dit is de nieuwe token: ', newToken,);
      console.log(loaded)

      dispatch(updateTokens(newToken));


      setLoaded(true);
        

      // setToken(newToken);
      // console.log(token);
    }
    
  return (

    <Router>
      <div className="App">
        <Navigation />
        <Switch>
             <Route exact path="/">
              <a onClick={ () => getAuth(setAuth,auth)}>Login</a>
            </Route>
            <Route path="/callback">
              <GetToken setToken={changeToken}  token={token}/>
              {loaded ? <Redirect to={{pathname: "/me", state: {token}}} /> : <span>loading....</span>}
            </Route>
            <Route path="/recent">
              <Recent recent={recent}/>
            </Route>
            <Route  exact path="/login">
            </Route>
            <Route exact path="/me">
              {}
              <Profile token={token} />
            </Route>
            <Route path="/artists">
              <RecentArtists />
            </Route>
          </Switch>
      </div>
    </Router>
  );
}


export default App;