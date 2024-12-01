import React from "react";

import '../../App.css'
import ContentCard from "./ContentCard";

const Recommended = ({ card }) => {

  return (
    <>
      {
        card.map((card, index) => (
          <div
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
        ))
      }
    </>
  );
};

export default Recommended;