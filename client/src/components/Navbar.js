import React from 'react';
import Logo from '../assets/Disney+_logo.svg.png'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-3 bg-gray-800 z-10">
      <div className="text-white">
        <a href="/" className="text-lg font-bold"><img src={Logo}  className='w-20' alt='logo'/></a>
      </div>
      <div>
        <Link to='/login'>
        <button className="px-4 py-2 text-white border-2 rounded-md">Login</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
