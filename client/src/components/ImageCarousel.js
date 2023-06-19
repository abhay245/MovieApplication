import React from 'react';
import MovieTile from './MovieTile.js';
import movieData from '../assets/movieData.js';

const ImageCarousel = (props) => {
  const filteredMovies = movieData.filter((movie) => movie.type === props.type);

  return (
    <div className="carousel container w-100 h-100">
      <div className="carousel-heading text-2xl capitalize py-2 ml-2 text-white">{props.type}</div>
      <div className="image-carousel flex overflow-x-auto no-scrollbar">
          {filteredMovies.map((movie) => (
              <MovieTile  key={movie.id} id={movie.id} title={movie.title} cardImg={movie.cardImg} />
          ))}
        </div>
    </div>
  );
};

export default ImageCarousel;
