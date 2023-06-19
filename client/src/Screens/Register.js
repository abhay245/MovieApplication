import React, { useState } from 'react';
import Image from '../assets/login-background.jpg';
import { Link,useNavigate } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg,seterrorMsg]=useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      let res = await response.json()
      console.log(res);
      if (response.ok) {
        console.log('User registered successfully');
        setName('');
        setEmail('');
        setPassword('');
        navigate('/login')
      } else {
        seterrorMsg(res.message);
      }
    } catch (error) {
      seterrorMsg(error)
    }
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${Image})` }}>
      <form className="p-6 bg-white min-w-1/4 w-screen sm:w-1/4 min-h-screen shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
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
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
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
        <div className='mb-4'>
        <p>Already have a account? <Link to='/login'><span>Login</span></Link></p>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};
