import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { fetchSingleTalentReview } from '../../slices/reviewsSlice.js';
import ReviewStar from '../../components/others/ReviewStar';
import TimeAgo from '../../components/others/TimeAgo'

// Displaying Single Hirer Review by id
function TalentReview({ match }) {
  const dispatch = useDispatch();
  const { review, status, error } = useSelector(
    (state) => state.reviews.activeReview
  );
  // Get review id in url
  const { reviewId } = match.params;

  useEffect(() => {
    // Fetch Hirer review by id upon first rendering
    dispatch(fetchSingleTalentReview(reviewId));
  }, []);

  let content;
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = review.id
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <>{content}</>;
}

export default TalentReview;
