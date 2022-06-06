
import React from 'react';

function Artist(props) {
let artist = props.artist;
let ranking = props.ranking

let imagePath = artist.images[0].url;

  return (
    <div className="Artist">
        <img className="artist-cover" src={imagePath} />
        <div className="artist-title">
        <span>{ranking}.</span>
          {artist.name}
          </div>        
    </div>
  );
}



export default Artist;
