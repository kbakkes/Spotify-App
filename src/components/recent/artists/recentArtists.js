import React, { useState, useEffect } from 'react';
import Artist from './artist';
import axios from 'axios';
import querystring from 'querystring';

const client_id = ''; // Your client id
const client_secret = ''; // Your secret
const grant_type = 'refresh_token';

if(JSON.parse(window.sessionStorage.getItem('token'))) {
    let tokens = JSON.parse(window.sessionStorage.getItem('token'));
    const refresh_token = tokens.refresh_token;
}


function RecentArtists() {

const [recentArtists,setRecentArtists] = useState(null);
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
    if(recentArtists !== null) {
      setLoaded(true);
    }
    else {
        console.log(timeRange)
        if(timeRange){
            fetchRecentArtists(baseUrl, token, artists, timeRange, setRecentArtists,setLoaded);    
        } 
    }   
  }


    if(loaded === false){
        return (<span>loading....</span>)
      }
       if(loaded && recentArtists){
        return(
            <div className="Recent">
                <h1>Recently Played Artists</h1>
                <div className="recent__navigation">
                    <ul>
                        <li className={isActive(short_term,timeRange )}>
                            <a href="/artists?timeRange=short_term">Last 4 weeks</a>
                        </li>
                        <li className={isActive(medium_term,timeRange)}>
                            <a href="/artists?timeRange=medium_term">Last 6 months</a>
                        </li>
                        <li className={isActive(long_term,timeRange)}>
                            <a href="/artists?timeRange=long_term">All time</a>
                        </li>
                    </ul>     
                </div> 
                <div className="track-list">
                    {mapItems(recentArtists)}
                </div>
            </div>
        );
    }
}

function mapItems(items) {
    if(items.length !== 0 || undefined ){
        let key = 0;
        return items.items.map(artist => {
            key++;
            return <Artist key={'artist' + key} artist={artist} ranking={key}/>
        })
    }
   
}

const isActive = (range, currentRange ) => {
    if(range == currentRange) {
        console.log(range ,' is ', currentRange)
        return 'is-active';
    }
}

function fetchRecentArtists(url, token, type, range, setRecentArtists,setLoaded){
    const setArtists  = setRecentArtists;
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
         console.log(data.data);
        setRecentArtists(data.data);
       setLoaded(true);
     }
  
    }).catch(function (error) {
        console.log(error);
        if(error.response.status == 401) {
            refreshToken(isLoaded, accessToken);
            fetchRecentArtists(url, accessToken ,type,range,setArtists,setLoaded)
        }
    });
}
function refreshToken(isLoaded, refresh_token){
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
            if(data.status == 200){
                window.sessionStorage.setItem('token', JSON.stringify(data.data));
                isLoaded(true);
            }
        });
}

export default RecentArtists;
