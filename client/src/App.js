import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import MoviePage from './Screens/MoviePage'
import Landing from './Screens/Landing'
import { Register } from './Screens/Register.js'
import { Login } from './Screens/Login'
import AboutUser from './Screens/AboutUser'
import {AuthProvider} from './ContextReducer.js'
import WatchList from './Screens/WatchList';
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/myAccount' element={<AboutUser/>}/>
            <Route path='/myWatchlist' element={<WatchList/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
