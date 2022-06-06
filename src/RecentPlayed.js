import React from 'react';


function RecentPlayed() {

let baseUrl = 'https://api.spotify.com',
    userID = '1126115406',
    token = 'BQCNAMSzKFBxjqmvLggGhqu03OwXRMDRSRq0VyqlmggZFZhEqs3-AtttHMRcaUBXKIoNN4yaf0XaDJuAyJVjftunftDXk-HDrAdjh_DE__O431TFgnaF3wxQ-r77r2wfLFS9viNLirD2T072DRMrwFJ8q6ExfX2ru8b2Ey_4IfViAXUWcfwm5v1ksuPSwAOF6BRYO9FOS7yUWoto5-IcWYmX5gleegsn2NiVl_s6UF37vT2UqsCI-EntV4qfiRxHculJo068XRgVZW2Ku4o';
   


      fetch(baseUrl + '	/v1/users/' + userID, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => console.log(data));
    







  return (
   <div>karim</div>
  );
}

export default RecentPlayed;
