import React from 'react';
import homeImage from '../assets/landingpage.png';

function Home() {
  return (
    <div className="home">
      <img src={homeImage} alt="Home" className="full-screen-image" />
    </div>
  );
}

export default Home;
