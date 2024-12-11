import React from "react";
import { RiFilmFill } from "react-icons/ri";

import '../../App.css'
import { BASE_IMAGE_URL, MEDIA_TYPE } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "../common-media/Bookmark";
import styles from "../common-media/content.module.css";

const Card = ({ id, name, bookmark, poster_path, title, release_date, first_air_date, adult, media_type }) => {
  // console.log('Inside card', { id, name, bookmark, poster_path, title, release_date, first_air_date, adult, media_type });
  const navigate = useNavigate();

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
      className="relative flex flex-col w-48 hover:cursor-pointer"> 
      <img
        src={`${BASE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-42 object-cover"
      />

      <Bookmark
        className={styles.bookmark}
        id={id} media_type={media_type} key={id} bookmark={bookmark}></Bookmark>

      {/* Content section below the image */}
      <div className="content-sec px-2 py-1 text-white text-xs">
        <ul className="flex content-sec gap-x-3 mt-2">
        <li className="flex flex-col items-center text-white text-xs">
        <span className="mr-1">
            { release_date?release_date.slice(0,4):first_air_date.slice(0,4)}
        </span>
        </li>
        
        <li className="flex items-center">
          <RiFilmFill className="mr-1 text-white" />
          <span>{media_type}</span>
        </li>
        <li className="flex items-center text-xs">
          <span>{adult ? "PG" : "UG"}</span>
        </li>
      </ul>
      <h3 className="mt-2 line-clamp-1 text-lg tracking-tight">
        {title?title:name}</h3>
    </div>
  </div>
  );
};

export default Card;