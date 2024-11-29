import React from "react";

import '../../App.css'
import RecommendedCard from "./RecommendedCard";

const Recommended = ({ card }) => {

  console.log(card);

  return (
    <div className="flex flex-col flex-wrap ml-6 text-xl">
      {/* Section Heading */}


      <div className="recommended">
        {card.map((card, index) => (
          <div className="recommended-card" key={index}>
            <RecommendedCard
              id={card.id}
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