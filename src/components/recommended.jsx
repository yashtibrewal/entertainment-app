import React from "react";

import '../App.css'
import RecommendedCard from "./RecommendedCart";

const Recommended = ({card}) => {
 

  return (
    <div className="  text-xl flex-wrap flex flex-col  ml-6">
      {/* Section Heading */}
     

      <div className="recommended">
  { card.map((card, index) => (
    <div className="recommended-card " key={index}>
      <RecommendedCard
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