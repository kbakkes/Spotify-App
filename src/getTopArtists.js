import React from 'react';

function getTopArtist(range,setTopArtists,token) {

let baseUrl = 'https://api.spotify.com';

      fetch(baseUrl + '/v1/me/top/artists?time_range=' + range, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.items.length !== undefined && setTopArtists !== undefined){
            setTopArtists(data);
        }
    });
}

export default getTopArtist;
