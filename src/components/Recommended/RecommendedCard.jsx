import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

import '../../App.css'
import { toggleMovieBookmark } from "./api";

const RecommendedCard = ({ id, bookmark, poster_path, title, release_date, adult, media_type }) => {

  const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
  const [isBookmarked, setIsBookmarked] = useState(bookmark);

  const bookmarkContent = () => {
  //  console.log('bookmark called')
  //  console.log('media_type', media_type);
    if (media_type === 'movie') {
      toggleMovieBookmark(id, isBookmarked).then(({ result }) => {
      //  console.log('result', result);
        setIsBookmarked(result.bookmark);
      })
    }
  }

  useEffect(() => {
    setIsBookmarked(bookmark);
  }, [bookmark]);

  return (
    <div className="flex flex-col">
      <div className="bg-white shadow-lg rounded-lg w-64 reco-card">
        <div className="relative">
          <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={title} className="w-full h-42 object-cover" />
          <div className="top-2 right-2 absolute bg-transparent rounded-full text-black cursor-pointer">
            <div
              className="top-2 right-2 absolute rounded-full text-black cursor-pointer"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '10px' }}>
              {isBookmarked ? (
                <FaBookmark onClick={bookmarkContent} className="text-white" />
              ) : (
                <FaRegBookmark onClick={bookmarkContent} className="text-white" />
              )}
            </div>

          </div>
        </div>
        {/* Content section below the image */}

      </div>
      <div className="content-sec px-2 py-1 text-white text-xs">
        <ul className="flex content-sec gap-3">
          <li className="flex flex-col items-center text-white text-xs">
            <span className="mr-1">{release_date.slice(0, 4)}</span>
          </li>
          <li className="flex items-center">
            <RiFilmFill className="mr-1 text-white" />
            <span>{media_type ? media_type : "Movie"}</span>
          </li>
          <li className="flex items-center text-xs">
            <span>{adult ? "PG" : "UG"}</span>
          </li>
        </ul>
        <h3 className="mt-2 text-lg">{title}</h3>
      </div>
    </div>
  );
};

export default RecommendedCard;