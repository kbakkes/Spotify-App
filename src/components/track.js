import React from 'react';

function Track(props) {

    let track = props.track;
    let imagePath = track.album.images[0].url;

  return (
    <div className="Track">

        <img className="track-cover" src={imagePath} />
        <div className="track-title">{track.name}</div>
        <div className="artist-list">
            {getArtists(track.artists)}
        </div>
        
    </div>
  );
}

function getArtists(artists){

    return artists.map(artist => {
        return (
            <div className="track-artist">{artist.name}</div>
        )
    })
}



export default Track;
