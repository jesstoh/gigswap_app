import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Alert,
  Collapse,
} from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
// import TalentGigButtons from './TalentGigButtons';
import GigButtonContainer from './GigButtonContainer';
import TimeAgo from '../others/TimeAgo';
import SmallTalentExcerpt from '../talents/SmallTalentExcerpt'
import GigEditButtons from './GigEditButtons'

function SingleGig() {
  const dispatch = useDispatch();
  const { gig, error, success } = useSelector((state) => state.gigs.activeGig);
  const [errorMessage, setErrorMessage] = useState(null);
  const userId = useSelector((state) => state.authentication.user.id);

  //Open or close applicant list
  const [showApplicants, setShowApplicants] = useState(false);

  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      {errorMessage && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setErrorMessage(null)}
        >
          {errorMessage}
        </Alert>
      )}
      <Row className="mb-3">
        <h3>{gig.title}</h3>
      </Row>
      <Row>
        <Col xs="5" sm="3">
          <img
            src={gig.poster_profile.image}
            className="img-fluid border rounded-circle"
            alt={gig.poster_profile.first_name}
          />
        </Col>
        <Col>
          Company:{' '}
          <a href={`/hirers/${gig.poster}`}>{gig.poster_profile.company}</a>
          <br />
          Review: ..... <br />
          <br />
          No. of Applicants:{' '}
          {gig.poster === userId ? (
            <Button
              variant="link"
              aria-controls="applicants-container"
              onClick={() => setShowApplicants(!showApplicants)}
            >
              {gig.applicants.length}
            </Button>
          ) : (
            gig.applicants.length
          )}
          <br />
          <br />
          <TimeAgo timestamp={gig.created_at} text="Posted " />
          <br />
          <span
            className={`${
              parseISO(gig.expired_at) < new Date()
                ? 'text-danger'
                : 'text-muted'
            }`}
          >
            <i>Expired on {format(parseISO(gig.expired_at), 'd MMM yyyy')} </i>
          </span>
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
      <Row className="mb-4">
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
      <Row className="button-container">
        <GigButtonContainer />
      </Row>
      
      <Row>
        <GigEditButtons />
      </Row>
      {/* Applicants list */}
      {!gig.poster === userId ? null : (
        <Collapse in={showApplicants}>
          <div id="applicants-container" className='mt-5'>
            <h5 className='text-center'>Applicants list</h5>
            {gig.applicants.map(talent => <SmallTalentExcerpt talent={talent} key={talent.id}/>)}
          </div>
        </Collapse>
      )}
    </Container>
  );
}

export default SingleGig;
