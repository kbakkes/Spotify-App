import React from 'react';

function Navigation() {

  if(hasProfile()){
    return (
      <div className="navigation">
            <a href="/">Home</a>
            <a href="recent">Recently played</a>
            <a href="artists">Top Artists</a>
            <a href="/me">Profile</a>
      </div>
    );
  } else {
      return (
          <div className="navigation">
            <a href="/">Home</a>
        </div>
      )
  }
}

function hasProfile() {
  if(window.sessionStorage.getItem('profile')){
    return true;
  }
}

export default Navigation;
