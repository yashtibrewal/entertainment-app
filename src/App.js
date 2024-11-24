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
import { AuthProvider } from "./store/auth";
import ProtectedRoute from "./store/ProtectedRoute";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route index path="/login" element={<Login />} />
          // TODO: Fix protected route
          {/* <Route element={<ProtectedRoute />}> */}
            <Route element={<Layout />}>\
              <Route path="/" element={<HomePage />} />
              <Route path="/bookmark" element={<Bookmarks />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-series" element={<TVSeries />} />
            </Route>
          {/* </Route> */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
