import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { fetchSingleTalentReview } from '../../slices/reviewsSlice.js';
import ReviewStar from '../../components/others/ReviewStar';
import TimeAgo from '../../components/others/TimeAgo';

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
    content = (
      <Container className="px-5 py-3 my-5 border rounded">
        <h4 className="text-center">
          Review for Talent:{' '}
          <a href={`/talents/${review.talent_detail.id}`} className="line-less">
          {review.talent_detail.first_name}, {review.talent_detail.last_name}
          </a>
        </h4>
        <Row className="mb-1 mt-4">
          <Col xs="6" sm="2">
            Rating
          </Col>
          <Col>
            <ReviewStar rating={review.rating} />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs="6" sm="2">
            Quality
          </Col>
          <Col>
            <ReviewStar rating={review.quality} />
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs="6" sm="2">
            Complete on time
          </Col>
          <Col className="ml-4">
            {review.is_ontime ? (
              <FaCheck className="text-success" />
            ) : (
              <FaTimes className="text-danger" />
            )}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs="6" sm="2">
            Recommend
          </Col>
          <Col className="ml-4">
            {review.recommended ? (
              <FaCheck className="text-success" />
            ) : (
              <FaTimes className="text-danger" />
            )}
          </Col>
        </Row>
        <div className="mt-3">
          Gig: <a href={`/gigs/${review.gig.id}`}>{review.gig.title}</a>
        </div>
        <Row className="mb-4 mt-4">
          <Col>
            <i>{review.description}</i>
          </Col>
        </Row>

        <div className="text-right">
          <span className="text-muted">
            <i>
              By{' '}
              <a href={`/hirers/${review.hirer.id}`} className="line-less">
                {review.company}
              </a>
            </i>
          </span>
          <br />
          <span className="text-muted text-smaller">
            <TimeAgo timestamp={review.created_at} text={'reviewed'} />
          </span>
        </div>
      </Container>
    );
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
