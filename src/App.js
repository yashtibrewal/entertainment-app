import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Search from "./components/search";

function App() {
  return (
    <BrowserRouter>
     
      <div className="main-container flex flex-col md:flex-row min-h-screen bg-black text-white">
        {/* Navbar */}
        <div className="w-full md:w-16 h-auto md:h-screen">
          <Navbar />
        </div>

        <div className=" main-container flexing flex flex-col flex-1">
          {/* Search Component */}
          <div className="padding flex-shrink-0 p-4">
            <Search />
          </div>

          {/* Routes */}
          <div className="flexing flex-1 px-16 overflow-auto md:mt-8">
            <Routes>
              <Route index path="/" element={<HomePage />} />
              <Route path="/bookmark" element={<Bookmarks />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-series" element={<TVSeries />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
