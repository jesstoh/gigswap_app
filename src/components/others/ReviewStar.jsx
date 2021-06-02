import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

function ReviewStar({ rating }) {
  const fullStar = [];
  const emptyStar = [];

  for (let i = 0; i < Math.round(rating); i++) {
    fullStar.push(<FaStar className="text-warning" key={i}/>);
  }

  for (let i = 0; i < 5 - Math.round(rating); i++) {
    emptyStar.push(<FaRegStar key={i}/>);
  }

  return (
    <>
      {fullStar}
      {emptyStar}
    </>
  );
}

export default ReviewStar;
