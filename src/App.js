import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Bookmarks from './pages/Bookmarks';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import TVSeries from './pages/TVSeries';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<HomePage />} />
        <Route path='/bookmark' element={<Bookmarks />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/tv-series' element={<TVSeries />}/>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;