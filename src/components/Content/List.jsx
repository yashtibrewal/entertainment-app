import React from "react";

import '../../App.css'
import Card from "./Card";

import { v4 as uuidv4 } from 'uuid';

const List = ({ cards }) => {

  return (
    <>
      {
        cards.map((card) => (
          // TODO: add this in best practice
          <Card key={uuidv4()} {...card}
          />
        ))
      }
    </>
  );
};

export default List;