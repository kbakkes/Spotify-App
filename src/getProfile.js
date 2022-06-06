
function getProfile(token) {

  console.log(token)
  let baseUrl = 'https://api.spotify.com/v1/me';


   
  let profile = fetch(baseUrl + '	/v1/users/' + userID, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if(data !== undefined) {
      setProfile(data);
    }
  });

  return profile; 

}

export default getProfile;