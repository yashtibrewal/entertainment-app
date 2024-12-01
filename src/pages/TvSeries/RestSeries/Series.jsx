import React from "react";
import '../../../App.css';
import Card from "./Card";
import ContentCard from "../../../components/Recommended/ContentCard";
import { MEDIA_TYPE } from "../../../constants";


const Series = ({ card }) => {


  return (
    <div className="flex flex-col flex-wrap ml-6 text-xl">
      {card.map((card, index) => (
        <div key={index}>
          <ContentCard
            id={card.id}
            poster_path={card.poster_path}
            title={card.name}
            release_date={card.first_air_date}
            adult={card.adult}
            media_type={MEDIA_TYPE.TV_SERIES}
          />
        </div>
      ))}
    </div>
  );
};

export default Series;