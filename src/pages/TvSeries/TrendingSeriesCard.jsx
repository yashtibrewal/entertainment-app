import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

const TrendingSeriesCart = ({ poster_path, name, first_air_date, adult }) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="trending-cart w-96 rounded-lg shadow-lg overflow-hidden text-white  bg-black">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={name} className="w-full h-48 object-cover" />
        <div className="absolute top-2  right-2 bg-transparent text-white p-2 rounded-full cursor-pointer">
          <FaBookmark  />
        </div>
        <div className="absolute bottom-2 left-2 bg-transparent text-black px-2 py-1 rounded text-sm">
          <ul className="flex gap-4 px-2">
            <li className="flex items-center text-white font-semibold">
              <span className="mr-1">{first_air_date}</span>
            </li>
            <li className="flex items-center  text-white font-semibold ">
              <RiFilmFill className="mr-1 text-white" />
              <span>Tv-Series</span>
            </li>
            <li className="flex items-center text-white font-semibold">
              <span>{adult?"PG":"UG"}</span>
            </li>
          </ul>
          <h3 className="text-lg mt-1 text-white font-semibold">{name} Insidious</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingSeriesCart;
