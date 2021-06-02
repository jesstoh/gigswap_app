import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

function ReviewStar({ rating }) {
  const stars = [];

  let numEmptyStars = 5 - Math.floor(rating);

  // Generate full star elementes
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar className="text-warning" key={i} />);
  }

  // Generate half star if decimal is >= 0.5
  if (rating - Math.floor(rating) >= 0.5) {
    stars.push(<FaStarHalfAlt className="text-warning" />);
    numEmptyStars--;
  }

  // Generate empty star elements
  for (let i = 0; i < numEmptyStars; i++) {
    stars.push(<FaRegStar className="text-warning" key={i} />);
  }

  return <>{stars}</>;
}

export default ReviewStar;
