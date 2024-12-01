import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

const TrendingSeriesCart = ({ poster_path, name, first_air_date, adult }) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-black shadow-lg rounded-lg w-96 text-white overflow-hidden trending-cart">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={name} className="w-full h-48 object-cover" />
        <div className="top-2 right-2 absolute bg-transparent p-2 rounded-full text-white cursor-pointer">
          <FaBookmark  />
        </div>
        <div className="bottom-2 left-2 absolute bg-transparent px-2 py-1 rounded text-black text-sm">
          <ul className="flex gap-4 px-2">
            <li className="flex items-center font-semibold text-white">
              <span className="mr-1">{first_air_date}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <RiFilmFill className="mr-1 text-white" />
              <span>Tv-Series</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <span>{adult?"PG":"UG"}</span>
            </li>
          </ul>
          <h3 className="mt-1 font-semibold text-lg text-white">{name} Insidious</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingSeriesCart;
