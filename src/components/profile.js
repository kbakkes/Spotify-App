import React, { useState, useEffect } from 'react';
import Navigation from './navigation';
import { useSelector } from "react-redux";
import axios from 'axios';
import Playlists from './profile/playlists';


function Profile(props) {

let baseUrl = 'https://api.spotify.com/v1/me';
const [loaded, setLoaded] = useState(false);
const [profile, setProfile] = useState({});
const [user,setUser] = useSessionStorage("profile", {});
const empty = {};

const token = useSelector(state => state.tokens);

console.log(loaded);

useEffect(() => {
  setLoaded(false);

  console.log(loaded);
},[]);

if(!loaded){
  if(Object.keys(user).length !== 0) {
    console.log('IK BEN ERDOORHEEN');
    setProfile(user);
    setLoaded(true);
  }
  else {
    fetchProfile(baseUrl, token, setLoaded, setProfile, setUser);
  }   
}

  if(loaded === false){
    return (<span>loading....</span>)
  }
   if(loaded){
     console.log(loaded, profile);
    return (
      <div>
        <div className="Profile">
          <div className="profile-div">
            {console.log(profile)}
            <img src={profile.images[0].url} />
            <h1>{profile.display_name}</h1>
            <div>Followers: {profile.followers.total}</div>
          </div>                
        </div>
        <Playlists profile={profile} />
      </div>
    );
  }
}

export default Profile;

function fetchProfile(baseUrl, token, setLoaded, setProfile,setUser){
  axios.get(baseUrl, {
    headers: {
      'Authorization': 'Bearer ' + token.access_token
    }
  })
  .then(data => {
   if(data){
    setProfile(data.data);
    setUser(data.data)
     setLoaded(true);
   }

  })
}

// Hook
function useSessionStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.sessionStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}