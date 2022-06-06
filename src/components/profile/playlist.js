import React from 'react';

function Playlist(props) {
let playlist = props.playlist;

console.log(props.playlist);


let imagePath = playlist.images[0].url;

  return (
    <div className="playlist">
        <img className="playlist__cover" src={imagePath} />
        <div className="playlist__title">{playlist.name}</div>        
        <div className="playlist__owner">Presented by {playlist.owner.display_name}</div>        
        <div className="playlist__description">{playlist.description}</div>     
        
    </div>
  );
}



export default Playlist;
