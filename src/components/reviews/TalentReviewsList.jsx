import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import TalentReviewExcerpt from './TalentReviewExcerpt';

// Show talent reviews in list of cards
function TalentReviewsList() {
  const { talentReviews, status, error, summary } = useSelector(
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
        <>
          {' '}
          <div>
            <Row className="p-3 text-center">
              <Col>Avg Rating<br/> <span className='text-larger '>{summary.avg_rating}</span></Col>
              <Col>Quality<br/><span className='text-larger'> {summary.avg_quality}</span></Col>
              <Col>Deliver On Time<br/> <span className='text-larger'>{summary.avg_ontime * 100} %</span></Col>
              <Col>Recommend<br/><span className='text-larger'>{summary.avg_recommended * 100} %</span></Col>
            </Row>
          </div>
          <div>
            {talentReviews.map((review) => (
              <TalentReviewExcerpt key={review.id} review={review} />
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

export default TalentReviewsList;
