import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Collapse } from 'react-bootstrap';
import GigExcerpt from '../gigs/GigExcerpt';
import HirerReviewsList from '../reviews/HirerReviewsList'

function SingleHirer() {
  const hirer = useSelector((state) => state.hirers.activeHirer.hirer);
  const isHirer = useSelector((state) => state.authentication.isHirer);
  const userId = useSelector((state) => state.authentication.user.id);

  //Open or close review list
  const [showReview, setShowReview] = useState(false);

  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      <Row className="mb-3">
        <h3>{hirer.hirer_profile.company}</h3>
      </Row>
      <Row>
        <Col xs="5" sm="3" className="pl-3">
          <div className="sqr-image-container rounded-circle border">
            <img
              src={hirer.hirer_profile.image}
              className="img-fluid"
              alt={hirer.hirer_profile.company}
            />
          </div>
        </Col>
        <Col className="">
          <div>No. of Gigs Awarded: {hirer.gigs_award_count} </div>
          <div>
            Rating:{' '}
            {isHirer && userId !== hirer.id ? (
              hirer.avg_review_rating ? hirer.avg_review_rating + `(${hirer.review_count} review) ` : 'No reviews'
            ) : (
              <span
                className="link-like text-primary"
                aria-controls="reviews-container"
                onClick={() => setShowReview(!showReview)}
              >{hirer.avg_review_rating ? hirer.avg_review_rating + `(${hirer.review_count} review) ` : 'No review'}
              </span>
            )}
          </div>
        </Col>
      </Row>
      {/* Review List*/}
      {isHirer && userId !== hirer.id ? null : (
        <Collapse in={showReview}>
          <div id="reviews-container" className="mt-5">
            <h5 className="text-center">Review</h5>
            <HirerReviewsList />
          </div>
        </Collapse>
      )}
      {isHirer && userId !== hirer.id ? null :
      <Row className="gigs-container mb-4 mt-5 py-3">
        <Col>
          <h5 className="text-center">Active Gig Listing</h5>
          {hirer.active_gigs.map((gig) => (
            <GigExcerpt key={gig.id} gig={gig} />
          ))}
        </Col>
      </Row>}
    </Container>
  );
}

export default SingleHirer;
