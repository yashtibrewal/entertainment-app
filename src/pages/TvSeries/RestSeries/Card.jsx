import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";


import '../../../App.css'

const Card = ({ poster_path, name,first_air_date, adult }) => {
  
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  

  return (
    <div className="flex flex-col ">
    <div className="reco-card w-64 rounded-lg shadow-lg bg-white">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={name} className="w-full h-42 object-cover" />
        <div className="absolute top-2 right-2 bg-transparent text-black  rounded-full cursor-pointer">
          <FaBookmark className="text-white" />
        </div>
      </div>
      {/* Content section below the image */}
     
    </div>
    <div className=" content-sec text-white py-1 px-2 text-xs">
        <ul className="flex gap-3 content-sec">
          <li className="flex flex-col items-center text-white text-xs">
            <span className="mr-1">{first_air_date}</span>
          </li>
          <li className="flex items-center">
            <RiFilmFill className="mr-1 text-white" />
            <span> Tv-Series</span>
          </li>
          <li className="flex text-xs items-center">
            <span>{adult?"PG":"UG"}</span>
          </li>
        </ul>
        <h3 className="text-lg  mt-2">{name}</h3>
      </div>
    </div>
  );
};

export default Card;