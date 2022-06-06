import React, { useState, useEffect } from 'react';
import Track from './track';
import axios from 'axios';
import querystring from 'querystring';


const client_id = '38d1749c6a814d4b9663a762c01360c3'; // Your client id
const client_secret = '22a951c5f9074c6e833d147a261d9ea8'; // Your secret
const grant_type = 'refresh_token';

if(JSON.parse(window.sessionStorage.getItem('token'))) {
    let tokens = JSON.parse(window.sessionStorage.getItem('token'));
    const refresh_token = tokens.refresh_token;
}

function Recent() {

const [recentTracks,setRecentTracks] = useState(null);
const [loaded, setLoaded] = useState(false);
const [timeRange, setTimeRange] = useState(false);
const [token, setToken] = useState(false);
const baseUrl = 'https://api.spotify.com/v1/me/top/';



const   short_term = 'short_term',
        medium_term = 'medium_term',
        long_term = 'long_term',
        artists = 'artists',
        tracks = 'tracks';

        
useEffect(() => {
    setLoaded(false);
    setToken(JSON.parse(window.sessionStorage.getItem('token')));

    if((new URL(document.URL).searchParams.get('timeRange'))){
        setTimeRange(new URL(document.URL).searchParams.get('timeRange'));
    } else { 
        setTimeRange(short_term);
    }
},[]);

if(!loaded){
    if(recentTracks !== null) {
      setLoaded(true);
    }
    else {
        console.log(timeRange)
        if(timeRange){
            fetchRecentsTracks(baseUrl, token, tracks, timeRange, setRecentTracks,setLoaded);    
        } 
    }   
  }


    if(loaded === false){
        return (<span>loading....</span>)
      }
       if(loaded && recentTracks){
        return(
            <div className="Recent">
                <h1>Recently Played</h1>
                <div className="recent__navigation">
                    <ul>
                        <li className={isActive(short_term,timeRange )}>
                            <a href="/recent?timeRange=short_term">Last 4 weeks</a>
                        </li>
                        <li className={isActive(medium_term,timeRange)}>
                            <a href="/recent?timeRange=medium_term">Last 6 months</a>
                        </li>
                        <li className={isActive(long_term,timeRange)}>
                            <a href="/recent?timeRange=long_term">All time</a>
                        </li>
                    </ul>     
                </div> 
                <div className="track-list">
                    {mapItems(recentTracks)}
                </div>
            </div>
        );
    }
}

function mapItems(items) {
    if(items.length !== 0 || undefined ){
        let key = 0;

        return items.items.map(track => {
            key++;
            return <Track key={'track' + key} track={track} />
        })
    }
   
}

const isActive = (range, currentRange ) => {
    if(range == currentRange) {
        console.log(range ,' is ', currentRange)
        return 'is-active';
    }
}

function fetchRecentsTracks(url, token, type, range, setRecentTracks,setLoaded){
    const setTracks  = setRecentTracks;
    const isLoaded = setLoaded; 
    console.log(token);
    const accessToken = token;

    axios.get(url + type + '?time_range=' + range + '&limit=50', {
      headers: {
        'Authorization': 'Bearer ' + token.access_token
      }
    })
    .then(data => {
     if(data){
       setRecentTracks(data.data);
       setLoaded(true);
     }
  
    }).catch(function (error) {
        console.log(error);
        if(error.response.status == 401) {
            refreshToken(isLoaded, accessToken);
            fetchRecentsTracks(url, accessToken ,type,range,setTracks,setLoaded)
        }
    });
}
function refreshToken(isLoaded, refresh_token){
    console.log(refresh_token);
    console.log('AAAAAAAAH');

    axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
        grant_type,
        refresh_token,
        client_id,
          }), {
            headers: {
                Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
    }).then(data => {
        console.log(data);
            if(data.status == 200){
                window.sessionStorage.setItem('token', JSON.stringify(data.data));
                isLoaded(true);
            }
        });
}

export default Recent;