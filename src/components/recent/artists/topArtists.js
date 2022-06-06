import React from 'react';
import Artist from './artist';

function topArtists(props) {

let artists = props.artists;

  return (
    <div className="Artists">
        <h1>Top Artists (6 months)</h1>
        <div className="artist-list">
            {mapItems(artists)}
        </div>
    </div>
  );
}

function mapItems(items) {
    if(items.length !== 0 || undefined ){
        let key = 0;

        return items.items.map(artist => {
            key++;
            return <Artist key={key} artist={artist} />
        })
    }
   
}
export default topArtists;
