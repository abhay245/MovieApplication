import React, { createContext, useReducer } from 'react';
import jwt_decode from 'jwt-decode';

// Create the initial state for the context
const initialState = {
  isLoggedIn: false,
  user: {},
  token: null,
  watchList: [],
};

// Create the context
export const AuthContext = createContext(initialState);

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const decodedToken = jwt_decode(action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        user: {
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
        },
        token: action.payload.token,
        watchList: [], // Initialize the watchList property
      };
    case 'SET_WATCHLIST':
      return {
        ...state,
        watchList: action.payload,
      };
    case 'ADD_TO_WATCHLIST':
      return {
        ...state,
        watchList: [...state.watchList, action.payload],
      };
      case 'REMOVE_FROM_WATCHLIST':
        const updatedWatchList = state.watchList.filter(item => item !== action.payload);
        return {
          ...state,
          watchList: updatedWatchList,
        };
      
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: {},
        token: null,
      };
    default:
      return state;
  }
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isLoggedIn: Boolean(storedToken),
    token: storedToken || null,
  });

  // Define the login and logout functions
  const login = (token, user) => {
    localStorage.setItem('token', token);
    dispatch({
      type: 'LOGIN',
      payload: { token },
    });
  };

  const logout = () => {
    // Post the movie preferences to the server before logging out
    const token = localStorage.getItem('token');
    const moviePreferences = state.watchList;
    fetch('http://localhost:5000/postPreferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences: moviePreferences }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Movie preferences posted:', data);
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      })
      .catch((error) => {
        console.error('Error posting movie preferences:', error);
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
      });
  };

  const addToWatchlist = (item) => {
    dispatch({
      type: 'ADD_TO_WATCHLIST',
      payload: item,
    });
  };

  const removeFromWatchlist = (item) => {
    dispatch({
      type: 'REMOVE_FROM_WATCHLIST',
      payload: item,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        dispatch,
        logout,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
