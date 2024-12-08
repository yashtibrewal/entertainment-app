import "./App.css";

import { Route, Routes } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { AuthProvider } from "./store/auth";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Movie from "./pages/movie";
import ProtectedRoute from "./components/ProtectedRoute";
import TVSeries from "./pages/TvSeries";
import { SingleTVSerieis } from "./pages/TvSeries/SingleTVSeries";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route index path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/bookmark" element={<Bookmarks />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv-series" element={<TVSeries />} />
          </Route>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/tv/:id" element={<SingleTVSerieis />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
