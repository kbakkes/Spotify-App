import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Playlist from './playlist';
import querystring from 'querystring';

const client_id = '38d1749c6a814d4b9663a762c01360c3'; // Your client id
const client_secret = '22a951c5f9074c6e833d147a261d9ea8'; // Your secret
const grant_type = 'refresh_token';

const token = JSON.parse(window.sessionStorage.getItem('token'));

const url = 'https://api.spotify.com/v1/users/';



function Playlists(props) {
    const [loaded, setLoaded] = useState(false);
    const [playlists,setPlaylists] = useState(null);
    const profile = props.profile;
    const user = profile.id;
    console.log(user);


    useEffect(() => {
        setLoaded(false);
        console.log(props.profile);
        console.log(loaded);
    
        if(!loaded){
            fetchPlaylists(token,user,setPlaylists,setLoaded);
        }

      },[]);

    console.log(token);

    if(loaded === false){
        return (<span>loading....</span>)
    }
    if(loaded && playlists){
        return (
            <div className="profile__playlists">
                {mapItems(playlists)}            
            </div>
        );
    }
}

function mapItems(items) {
    if(items.length !== 0 || undefined ){
        let key = 0;
        return items.items.map(playlist => {
            key++;
            return <Playlist key={'playlist' + key} playlist={playlist} ranking={key}/>
        })
    }
   
}

function fetchPlaylists(token, user, setPlaylists,setLoaded){
    const setLists  = setPlaylists;
    const isLoaded = setLoaded; 
    const accessToken = token;

    axios.get(url + user + '/playlists?limit=40', {
      headers: {
        'Authorization': 'Bearer ' + token.access_token
      }
    })
    .then(data => {
     if(data){
         console.log(data.data);
         setPlaylists(data.data);
        setLoaded(true);
     }
  
    }).catch(function (error) {
        console.log(error);
        
        if(error.response.status == 401) {
            refreshToken(isLoaded, accessToken);
            fetchPlaylists(url, accessToken,setLists,setLoaded)
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

export default Playlists;
