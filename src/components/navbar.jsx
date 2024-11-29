import React, { useEffect, useState } from "react";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { SiWindows11 } from "react-icons/si";
import { RiFilmFill } from "react-icons/ri";
import { PiTelevision } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {

  const { state } = useAuth()
  const user = state.user
  const [initial, setInitial] = useState('');

  useEffect(() => {
    // console.log('user', user);
    if (user && user.name && user.name.length) {
      setInitial(user.name.substr(0, 1).toUpperCase());
    }
  }, [user])

  return (
    <div className="flex sm:flex sm:flex-row flex-col md:flex-col justify-between items-center bg-[#182828] sm:ml-0 md:ml-5 sm:px-7 py-10 rounded-xl w-full sm:w-screen md:w-16 h-14 md:h-[calc(100vh-5rem)] nav-container">
      {/* logo container */}
      <div className="logo-container">
        <MovieCreationIcon className="w-[40px] h-[40px] text-userHover" />
      </div>

      {/* icon container */}
      <div className="flex sm:flex sm:flex-row flex-col md:flex-col md:items-center gap-6 md:gap-6 icon-container">
        {/* Home Icon Link */}
        <Link to="/" className="group">
          <SiWindows11 className="group-hover:text-userHover group-focus:text-userHoverColor text-2xl text-userTextColor" />
        </Link>

        {/* Movies Icon Link */}
        <Link to="/movies" className="group">
          <RiFilmFill className="group-hover:text-userHover group-focus:text-userHoverColor text-2xl text-userTextColor" />
        </Link>

        {/* Serial or TV Icon Link */}
        <Link to="/tv-series" className="group">
          <PiTelevision className="group-hover:text-userHover group-focus:text-userHoverColor text-2xl text-userTextColor" />
        </Link>

        {/* Bookmark Icon Link */}
        <Link to="/bookmark" className="group">
          <FaBookmark className="group-hover:text-userHover group-focus:text-userHoverColor text-2xl text-userTextColor" />
        </Link>
      </div>

      {/* avatar container */}
      <div className="avatar-container">
        <Avatar sx={{ bgcolor: deepOrange[500] }} className="w-[40px] h-[40px]">
          {initial}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
