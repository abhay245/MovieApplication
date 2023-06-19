import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../assets/login-background.jpg';
import { AuthContext } from '../ContextReducer';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [errorMsg,seterrorMsg]=useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email,
        password,
      };

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${process.env.SECRET_KEY}`
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save JWT to local Storage
        localStorage.setItem('token',data.token);
        login(data.token); // Call the login function from the context
        setEmail('');
        setPassword('');
        navigate('/home')
      } else {
        seterrorMsg(data.message);
      }
    } catch (error) {
      seterrorMsg(error);
    }
  };
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${Image})` }}>
      <form className="p-6 bg-white min-h-screen min-w-1/4 w-screen sm:w-1/4 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {errorMsg!==''?(
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Oops!</strong>
                  <span className="block sm:inline"> {errorMsg} </span>
                </div>
        ):(
          <></>
        )
        }
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};
