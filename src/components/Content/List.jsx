import React from "react";

import '../../App.css'
import Card from "./Card";

const List = ({ cards }) => {

  return (
    <>
      {
        cards.map((card) => (
          <Card key={card.id} {...card}
          />
        ))
      }
    </>
  );
};

export default List;