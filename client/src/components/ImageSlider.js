import React, { useState } from 'react';
import image1 from '../assets/slider-badag.jpg';
import image2 from '../assets/slider-badging.jpg'
const ImageSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    `${image1}`,
    `${image2}`,
  ];

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative hidden md:block">
      <img src={images[currentImage]} alt="Slider" className="w-full" />

      <div className="absolute top-1/2 left-0 w-full flex justify-between">
        <button
          className="p-2 bg-gray-800 text-white rounded-full shadow-lg transform transition hover:scale-110"
          onClick={prevImage}
        >
          Prev
        </button>
        <button
          className="p-2 bg-gray-800 text-white rounded-full shadow-lg transform transition hover:scale-110"
          onClick={nextImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
