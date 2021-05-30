import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import GigExcerpt from '../gigs/GigExcerpt'

function SingleHirer() {
  const hirer = useSelector((state) => state.hirers.activeHirer.hirer);

  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      <Row className="mb-3">
        <h3>
          {hirer.hirer_profile.company}
        </h3>
      </Row>
      <Row>
        <Col xs="5" sm="3" className='pl-3'>
          <div className="sqr-image-container rounded-circle border">
            <img
              src={hirer.hirer_profile.image}
              className="img-fluid"
              alt={hirer.hirer_profile.company}
            />
          </div>
        </Col>
        <Col className="d-flex align-items-center">
          No. of Gigs Awarded:  <br />
          Review: .....
        </Col>
      </Row>
      <Row className="gigs-container mb-4 mt-5 py-3">
        <Col>
          <h5 className='text-center'>Active Gig Listing</h5>
          {hirer.active_gigs.map(gig => <GigExcerpt key={gig.id} gig={gig}/>)}
        </Col>
      </Row>
      <div className="reviews-container my-2">
        
      </div>

    </Container>
  );
}

export default SingleHirer;
