import React from 'react';
import './Home.css'; 
import homeImage from "../assets/landingpage.jpg";
 

const Home = () => {
  return (
    <div className="home">
    <img src={homeImage} alt="Home" className="full-screen-image" />
    </div>
  );
};

export default Home;


