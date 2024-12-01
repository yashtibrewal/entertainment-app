import React, { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";

import '../../App.css'
import { toggleMovieBookmark, toggleTVSeriesBookmark } from "./api";
import { BASE_IMAGE_URL, MEDIA_TYPE } from "../../constants";
import { useNavigate } from "react-router-dom";

const ContentCard = ({ id, bookmark, poster_path, title, release_date, adult, media_type }) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmark || false);
  const navigate = useNavigate();

  const bookmarkContent = (event) => {
    event.stopPropagation();
    if (media_type === MEDIA_TYPE.MOVIES) {
      toggleMovieBookmark(id, isBookmarked).then(({ result }) => {
        setIsBookmarked(result.bookmark);
      });
    } else if (media_type === MEDIA_TYPE.TV_SERIES) {
      toggleTVSeriesBookmark(id, isBookmarked).then(({ result }) => {
        setIsBookmarked(result.bookmark);
      });
    }
  }

  useEffect(() => {
    setIsBookmarked(bookmark);
  }, [bookmark]);

  const handleNavigation = (event) => {
    event.stopPropagation();
    if (media_type === MEDIA_TYPE.MOVIES) {
      navigate(`/movie/${id}`);
    }
    else if (media_type === MEDIA_TYPE.TV_SERIES) {
      navigate(`/tv/${id}`);
    }
  }

  return (
    <div
      onClick={handleNavigation}
      className="relative flex flex-col w-48">
      <img
        src={`${BASE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-42 object-cover"
      />
      <span
        onClick={bookmarkContent}
        className="top-2 right-2 absolute flex flex-row-reverse bg-black bg-opacity-75 p-2.5 rounded-full cursor-pointer">
        {isBookmarked ? (
          <FaBookmark className="text-white" />
        ) : (
          <FaRegBookmark className="text-white" />
        )}
      </span>

      {/* Content section below the image */}
      <div className="content-sec px-2 py-1 text-white text-xs">
        <ul className="flex content-sec gap-x-3 mt-2">
          <li className="flex flex-col items-center text-white text-xs">
            <span className="mr-1">{release_date.slice(0, 4)}</span>
          </li>
          <li className="flex items-center">
            <RiFilmFill className="mr-1 text-white" />
            <span>{media_type.toUpperCase()}</span>
          </li>
          <li className="flex items-center text-xs">
            <span>{adult ? "PG" : "UG"}</span>
          </li>
        </ul>
        <h3 className="mt-2 line-clamp-1 text-lg tracking-tight">{title}</h3>
      </div>
    </div>
  );
};

export default ContentCard;