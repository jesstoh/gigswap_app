import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import HirerReviewExcerpt from './HirerReviewExcerpt';

function HirerReviewsList() {
  // const gigs = useSelector((state) => state.gigs.gigs);
  const { hirerReviews, status, error, summary } = useSelector(
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
        <>
          {/* Summary of reviews */}
          <div>
            <Row className='p-3 text-center'>
              <Col>Avg Rating<br/> <span className='text-larger'>{summary.avg_rating}</span></Col>
              <Col>Payment On Time<br/> <span className='text-larger'>{summary.avg_ontime * 100} %</span></Col>
              <Col>Scope Clarity<br/>  <span className='text-larger'>{summary.avg_scope}</span></Col>
            </Row>
          </div>
          {/* Review listing */}
          <div>
            {hirerReviews.map((review) => (
              <HirerReviewExcerpt key={review.id} review={review} />
            ))}
          </div>
        </>
      );
    }
  } else if (status === 'failed') {
    content = <span>{error}</span>;
  }

  return <Container className="mt-2">{content}</Container>;
}

export default HirerReviewsList;
