import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

const TrendingCart = ({ poster_path, title, release_date, adult,media_type }) => {
  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="trending-cart w-96 rounded-lg shadow-lg overflow-hidden text-white  bg-black">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2  right-2 bg-transparent text-white p-2 rounded-full cursor-pointer">
          <FaBookmark  />
        </div>
        <div className="absolute bottom-2 left-2 bg-transparent text-black px-2 py-1 rounded text-sm">
          <ul className="flex gap-4 px-2">
            <li className="flex items-center text-white font-semibold">
              <span className="mr-1">{release_date.slice(0,4)}</span>
            </li>
            <li className="flex items-center  text-white font-semibold ">
              <RiFilmFill className="mr-1 text-white" />
              <span>{media_type.toUpperCase()}</span>
            </li>
            <li className="flex items-center text-white font-semibold">
              <span>{adult?"PG":"UG"}</span>
            </li>
          </ul>
          <h3 className="text-lg mt-1 text-white font-semibold">{title} Insidious</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingCart;
