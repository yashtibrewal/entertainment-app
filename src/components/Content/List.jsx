import React from "react";

import '../../App.css'
import Card from "./Card";

const List = ({ cards: cards }) => {

  // function isCardDataPolluted({id, name, title, poster_path, release_date, first_air_date}){
  //   if(id && (name || title) && (poster_path) && (release_date || first_air_date)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // cards = cards.filter(card => !isCardDataPolluted(card))

  return (
    <>
      {
        cards.map((card) => (
          <div
            key={card.id}>
            <Card
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
          </div>
        ))
      }
    </>
  );
};

export default List;