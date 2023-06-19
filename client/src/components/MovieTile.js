import React from 'react';
import { Link } from 'react-router-dom';
const MovieTile = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <Link to={`/movies/${props.id}`}>
    <div
      className={`movie-tile relative m-2 `}
      style={{minWidth:'250px'}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="bg-gray-800 overflow-hidden">
        <img src={props.cardImg} alt={props.title} className="object-cover w-full h-full" />
      </div>
      {isExpanded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-75 p-2 absolute bottom-1 left-0 text-white capitalize">
            {props.title}
          </div>
        </div>
      )}
    </div>
    </Link>
  );
};

export default MovieTile;
