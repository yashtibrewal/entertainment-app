import React from "react";

import '../../App.css'
import ContentCard from "./ContentCard";
import { useNavigate } from "react-router-dom";

const Recommended = ({ card }) => {

  const navigate = useNavigate();

  // console.log(card);

  const handleClick = (id, media_type) => {

    if (media_type === 'movie')
      navigate(`/movie/${id}`);
  }

  return (
    <div className="flex flex-col flex-wrap text-xl">
      {/* Section Heading */}


      <div className="recommended">
        {card.map((card, index) => (
          <div
            className="recommended-card"
            onClick={(e) => { handleClick(card.id, card.media_type) }}
            key={index}>
            <ContentCard
              id={card.id}
              bookmark={card.bookmark}
              poster_path={card.poster_path}
              title={card.title}
              release_date={card.release_date}
              adult={card.adult}
              media_type={card.media_type}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Recommended;