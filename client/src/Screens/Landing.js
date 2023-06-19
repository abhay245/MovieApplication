import React from 'react';
import Navbar from '../components/Navbar';
import Image from '../assets/background-landing.jpeg';
import logo1 from '../assets/Disney+_logo.svg.png';
import logo2 from '../assets/ESPN.png';
import logo3 from '../assets/Hulu.png';
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-cover flex justify-center items-center" style={{ backgroundImage: `url(${Image})` }}>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
          <div className="max-w-lg text-center">
            <div className="flex flex-wrap justify-center align-bottom mb-4" id="icon-container">
              <img src={logo1} className="w-1/4 mx-auto md:h-1/3 my-auto" alt="logo1" />
              <img src={logo2} className="w-1/4 mx-auto md:h-1/3 my-auto" alt="logo2" />
              <img src={logo3} className="w-1/4 mx-auto md:h-1/3 my-auto" alt="logo3" />
            </div>
            <Link to='/home'>
            <button className="px-4 py-2 w-full text-white bg-blue-500 rounded-md">Explore</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
