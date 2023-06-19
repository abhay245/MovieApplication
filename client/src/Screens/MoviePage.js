import { useParams } from 'react-router-dom';
import movies from '../assets/movieData';
import { BsPersonAdd } from 'react-icons/bs';
import { AuthContext } from '../ContextReducer';
import { useContext } from 'react';

const MoviePage = () => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id.toString() === id);
  const { addToWatchlist } = useContext(AuthContext);
  const handleAddToWatchlist = (movie) => {
    
    addToWatchlist(movie.title);
  };

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-page min-h-screen relative">
      <div
        className="movie-details absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.backgroundImg})` }}
      >
        <div className="bg-black w-screen lg:w-1/3 xl:w-1/3 h-auto bg-opacity-50 flex flex-col justify-end absolute bottom-0 left-0 p-6">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-white capitalize">{movie.title}</h1>
          </div>
          <div className="mb-4">
            <p className="text-white">{movie.subTitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded">Watch Now</button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded">Trailer</button>
            <div>
              <button className="bg-gray-800 rounded-full px-2 py-2 border-white text-white text-2xl" onClick={() => handleAddToWatchlist(movie)}>
                <BsPersonAdd />
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-white">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
