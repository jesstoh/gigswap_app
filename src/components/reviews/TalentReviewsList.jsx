import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';
import TalentReviewExcerpt from './TalentReviewExcerpt';

// Show talent reviews in list of cards
function TalentReviewsList() {
  const { talentReviews, status, error } = useSelector(
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
    if (!talentReviews.length) {
      //Show message if there is empty review list
      content = <span>No reviews</span>;
    } else {
      content = (
        <div>
          {talentReviews.map((review) => (
            <TalentReviewExcerpt key={review.id} review={review} />
          ))}
        </div>
      );
    }
  } else if (status === 'failed') {
    content = <span>{error}</span>;
  }

  return <Container className="mt-3">{content}</Container>;
}

export default TalentReviewsList;
