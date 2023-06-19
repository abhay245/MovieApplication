import React, { useState, useContext } from 'react';
import Logo from '../assets/Disney+_logo.svg.png';
import { FaSearch, FaUser, FaListUl, FaSignOutAlt, FaSignInAlt, FaHouseUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../ContextReducer';

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, logout } = useContext(AuthContext);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    logout();
  };

  return (
    <div className="flex">
      <div
        onClick={props.handleSidebarToggle}
        className={`fixed top-0 left-0 h-screen w-20 bg-gray-950 flex flex-col items-center justify-normal transition-all duration-300 ${
          props.sidebarOpen ? 'w-48' : 'w-20'
        }`}
      >
        <div
          className="w-full flex items-center justify-center cursor-pointer pt-4"
          onClick={handleSidebarToggle}
        >
          <img src={Logo} className="w-20" alt="logo" />
        </div>
        {props.sidebarOpen ? (
          <div className="flex flex-col my-auto items-center justify-center space-y-6">
            {state.isLoggedIn ? (
              <Link to="/myAccount">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaHouseUser className="text-white text-2xl" />
                  <span className="text-white">My Account</span>
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaUser className="text-white text-2xl" />
                  <span className="text-white">Login</span>
                </div>
              </Link>
            )}

            {state.isLoggedIn ? (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
                <FaSignOutAlt className="text-white text-2xl" />
                <span className="text-white">Logout</span>
              </div>
            ) : (
              <Link to="/register">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <FaSignInAlt className="text-white text-2xl" />
                  <span className="text-white">Sign In</span>
                </div>
              </Link>
            )}
            <Link to='/myWatchlist'>
            <div className="flex items-center space-x-2">
              <FaListUl className="text-white text-2xl" />
              <span className="text-white">Watchlist</span>
            </div>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center my-auto space-y-4">
            <FaUser className="text-white text-2xl" />
            <FaSignInAlt className='text-white text-2xl'/>
            <FaListUl className="text-white text-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
