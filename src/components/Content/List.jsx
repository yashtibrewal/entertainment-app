import React from "react";

import '../../App.css'
import Card from "./Card";

const List = ({ cards }) => {

  return (
    <>
      {
        cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            bookmark={card.bookmark}
            poster_path={card.poster_path}
            name={card.name}
            title={card.title}
            release_date={card.release_date}
            first_air_date={card.first_air_date}
            adult={card.adult}
            media_type={card.media_type}
          />
        ))
      }
    </>
  );
};

export default List;