import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import TalentGigButtons from './TalentGigButtons'
import {toggleGigEdit} from '../../slices/gigsSlice'

function SingleGig() {
  const dispatch = useDispatch()
  const { gig } = useSelector((state) => state.gigs.activeGig);
  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      <Row className="mb-3">
        <h3>{gig.title}</h3>
      </Row>
      <Row>
        <Col xs="5" sm="3">
          <img
            src={gig.poster_profile.image}
            className="img-fluid border rounded-circle"
          />
        </Col>
        <Col>
          Company:{' '}
          <a href={`/hirers/${gig.poster}`}>{gig.poster_profile.company}</a>
          <br />
          Review: .....
        </Col>
      </Row>
      <div className="mt-3 mb-4">
        <Row className="mb-3">
          <Col>
            <span>Location</span>
            <br />
            <span className="text-muted">
              {gig.is_remote ? 'Remote' : gig.country}
            </span>
          </Col>
          <Col>
            <span>Type</span>
            <br />
            <span className="text-muted">
              {gig.is_fixed ? 'Project based' : 'Fixed term'}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Estimated Duration</span>
            <br />
            <span className="text-muted">
              {gig.duration} {gig.duration_unit}
            </span>
          </Col>
          <Col>
            <span>Estimated Budget</span>
            <br />
            <span className="text-muted">
              $ {gig.is_fixed ? gig.fixed_amount : gig.hour_rate + ' /hr'}
            </span>
          </Col>
        </Row>
      </div>
      <Row className='mb-4'>
        <Col>
          <h5>Skill Set</h5>
          {gig.subcategories.map((subcat, index) => {
            return (
              <Badge pill variant="info" key={index} className="mr-2">
                {subcat.name}
              </Badge>
            );
          })}
        </Col>
      </Row>

      <Row>
        <Col>
          <h4>Gig Description</h4>
          <p>{gig.description}</p>
        </Col>
      </Row>
      <Row className='button-container'>
          <TalentGigButtons/>
      </Row>
      <Button onClick={() => dispatch(toggleGigEdit())}>Edit</Button>
    </Container>
  );
}

export default SingleGig;
