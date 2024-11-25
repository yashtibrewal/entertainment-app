import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

const TrendingCart = ({ image, title, year, contentType }) => {
  return (
    <div className="trending-cart w-96 rounded-lg shadow-lg overflow-hidden  bg-white">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-transparent text-black p-2 rounded-full cursor-pointer">
          <FaBookmark />
        </div>
        <div className="absolute bottom-2 left-2 bg-transparent text-black px-2 py-1 rounded text-sm">
          <ul className="flex gap-4 px-2">
            <li className="flex items-center">
              <span className="mr-1">{year}2019</span>
            </li>
            <li className="flex items-center">
              <RiFilmFill className="mr-1 text-black" />
              <span>Movie</span>
            </li>
            <li className="flex items-center">
              <span>{contentType}PG</span>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-1">{title} Insidious</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingCart;
