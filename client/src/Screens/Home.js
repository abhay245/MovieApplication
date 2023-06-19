import React, { useState } from 'react';
import ImageSlider from '../components/ImageSlider';
import Sidebar from '../components/Sidebar';
import ImageCarousel from '../components/ImageCarousel'
import movieData from '../assets/movieData'
import Footer from '../components/Footer';
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getDistinctTypes = () => {
    const types = movieData.map(movie => movie.type);
    return [...new Set(types)];
  };
  const distinctTypes = getDistinctTypes()


  return (
    <div className='bg-gray-950 min-h-screen'>
      <Sidebar handleSidebarToggle={handleSidebarToggle} sidebarOpen={sidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'ml-52' : 'ml-20'} transition-all duration-300`}>
        <ImageSlider />
        {distinctTypes.map(type => (<ImageCarousel type={type}/> ))}
        <Footer/>
      </div>
    </div>
  );
};

export default Home;