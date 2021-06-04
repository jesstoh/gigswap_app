import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import { fetchSingleHirerReview } from '../../slices/reviewsSlice.js';

// Displaying Single Hirer Review by id
function HirerReview({ match }) {
  const dispatch = useDispatch();
  const {review, status, error} = useSelector(
    (state) => state.reviews.activeReview
  );
  // Get review id in url
  const { reviewId } = match.params;
  
  useEffect(() => {
    // Fetch Hirer review by id upon first rendering
    dispatch(fetchSingleHirerReview(reviewId));
  }, []);

  let content;
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = review.id;
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <div>{content}</div>;
}

export default HirerReview;
