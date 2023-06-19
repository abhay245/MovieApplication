import React, { useState, useEffect, useContext } from 'react';
import background from '../assets/login-background.jpg';
import { AuthContext } from '../ContextReducer';

const WatchList = () => {
  const { state, dispatch } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/preferences', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.preferences || []); // Initialize with an empty array if preferences are not available
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const combinedMovies = [...state.watchList, ...movies];

  const handleDeleteMovie = (movie) => {
    const token = localStorage.getItem('token');
  
    // Send a POST request to delete the movie and update the preferences
    fetch('http://localhost:5000/updatePreferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movie }),
    })
      .then((response) => response.json())
      .then((data) => {
  
        // Dispatch the action to remove the movie from the watchlist
        dispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: movie });
  
        // Fetch the updated preferences from the server
        fetchMovies();
      })
      .catch((error) => {
        console.error('Error deleting movie:', error);
      });
  };
  
  return (
    <div
      className="relative min-h-screen flex flex-col items-center"
      style={{ background: `url(${background})` }}
    >
      <table className="w-1/3 text-sm text-left shadow-lg absolute top-10">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Your WatchList
        </caption>
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {combinedMovies.map((movie, index) => (
            <tr className="bg-white border-b" key={movie.id}>
              <td className="px-6 py-5">{index + 1}</td>
              <td className="px-6 py-5">{movie}</td>
              <td className="px-6 py-5">
                <button
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
                  onClick={() => handleDeleteMovie(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
