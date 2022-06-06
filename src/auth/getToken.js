import axios from 'axios';
import querystring from 'querystring';
import React, { useState, useEffect } from 'react';
import { useStore } from 'react-redux';

let client_id = ''; // Your client id
let client_secret = ''; // Your secret
let redirect_uri = 'http://localhost:3000/callback';
let grant_type = 'authorization_code';

  function getToken(props) {
      let retrievedUrl = document.URL;
      let newUrl = new URL(retrievedUrl);

      let code = newUrl.searchParams.get('code');
      code = code.toString();
      if(code){
          axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type,
            code,
            redirect_uri,
            client_id,
            client_secret,
              }), {
                headers: {
                    Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
    }).then(data => {
      
      if(data.status == 200){
        props.setToken(data.data);
        window.sessionStorage.setItem('token', JSON.stringify(data.data));
        // setLocalToken(data.data)
      }
    });
          }

      return (<>
          <h1>{code}</h1>
        </>)
}
    
export default getToken;
