import React from "react";
import '../../../App.css';
import Card from "./Card";


const Series = ({card}) => {
 

  return (
    <div className="  text-xl flex-wrap flex flex-col  ml-6">
      {/* Section Heading */}
     

      <div className="recommended">
  { card.map((card, index) => (
    <div className="recommended-card " key={index}>
      <Card
       poster_path={card.poster_path}
      title={card.name}
      release_date={card.first_air_date}
      adult={card.adult}
     
      />
    </div>
  ))}
</div>

    </div>
  );
};

export default Series;