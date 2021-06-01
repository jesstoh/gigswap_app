import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';
import HirerReviewExcerpt from './HirerReviewExcerpt';

function HirersReviewList() {
  // const gigs = useSelector((state) => state.gigs.gigs);
  const { hirerReviews, status, error } = useSelector(
    (state) => state.reviews
  );
  let content;

  // If status is loading, show spinner
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    if (!hirerReviews.length) {
      //Show message if there is empty review list
      content = <span>No reviews</span>;
    } else {
      content = (
        <div>
          {hirerReviews.map((review) => (
            <HirerReviewExcerpt key={review.id} review={review} />
          ))}
        </div>
      );
    }
  } else if (status === 'failed') {
    content = <span>{error}</span>;
  }

  return <Container className="mt-5">{content}</Container>;
}

export default HirersReviewList;
