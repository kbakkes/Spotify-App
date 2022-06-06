
let client_id = '38d1749c6a814d4b9663a762c01360c3'; // Your client id
let client_secret = '22a951c5f9074c6e833d147a261d9ea8'; // Your secret
let redirect_uri = 'http://localhost:3000/callback';
let scope = 'user-read-private';

 const GetAuth = (setAuth)  => {
    
    let url = 'https://accounts.spotify.com/authorize?client_id=' + client_id  + '&response_type=code&redirect_uri=' + redirect_uri +'&scope=user-read-private%20user-read-email+user-top-read%20playlist-read-private%20playlist-read-collaborative';
    let AuthUrl = 'https://accounts.spotify.com/api/token';

     console.log(scope);
    

     fetch(url, {
        form: {
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      })
      .then(data => {
          console.log(data);
        if(data.status == 200){          
          window.location.replace(data.url);
          if(data.url !== null) {
            setAuth(data.url);
          }
        }
      });

      return (<> </>)

    }
    
    export default GetAuth;