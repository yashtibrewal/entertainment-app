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
    console.log('user', user);
    if (user && user.name && user.name.length) {
      setInitial(user.name.substr(0, 1).toUpperCase());
    }
  }, [user])

  return (
    <div className="nav-container w-full md:w-16 h-14 md:h-[calc(100vh-5rem)] md:ml-5 py-10 rounded-xl flex flex-col md:flex-col items-center justify-between sm:w-screen sm:flex sm:flex-row sm:px-7 sm:ml-0 bg-[#182828]">
      {/* logo container */}
      <div className="logo-container ">
        <MovieCreationIcon className="text-userHover h-[40px] w-[40px]" />
      </div>

      {/* icon container */}
      <div className="icon-container flex flex-col gap-6 md:flex-col md:gap-6 md:items-center sm:flex sm:flex-row">
       
        {/* Home Icon Link */}
        <Link to="/" className="group">
          <SiWindows11 className="text-userTextColor group-hover:text-userHoverColor group-focus:text-userHoverColor text-2xl" />
        </Link>

        {/* Movies Icon Link */}
        <Link to="/movies" className="group">
          <RiFilmFill className="text-userTextColor group-hover:text-userHoverColor group-focus:text-userHoverColor text-2xl" />
        </Link>

        {/* Serial or TV Icon Link */}
        <Link to="/tv-series" className="group">
          <PiTelevision className="text-userTextColor group-hover:text-userHoverColor group-focus:text-userHoverColor text-2xl" />
        </Link>

        {/* Bookmark Icon Link */}
        <Link to="/bookmark" className="group">
          <FaBookmark className="text-userTextColor group-hover:text-userHoverColor group-focus:text-userHoverColor text-2xl" />
        </Link>
      </div>

      {/* avatar container */}
      <div className="avatar-container">
        <Avatar sx={{ bgcolor: deepOrange[500] }} className="h-[40px] w-[40px]">
          {initial}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
