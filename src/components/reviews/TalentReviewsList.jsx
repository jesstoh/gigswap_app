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
              <Col>Avg Rating<br/> {summary.avg_rating}</Col>
              <Col>Quality<br/> {summary.avg_quality}</Col>
              <Col>Deliver On Time<br/> {summary.avg_ontime * 100} %</Col>
              <Col>Recommend<br/>{summary.avg_recommended * 100} %</Col>
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
