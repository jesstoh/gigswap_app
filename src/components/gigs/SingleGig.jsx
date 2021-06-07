import React, { useState } from 'react';
import { useSelector} from 'react-redux';
import {
  Container,
  Row,
  Col,
  Badge,
  Alert,
  Collapse,
} from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
// import TalentGigButtons from './TalentGigButtons';
import GigButtonContainer from './GigButtonContainer';
import TimeAgo from '../others/TimeAgo';
import SmallTalentExcerpt from '../talents/SmallTalentExcerpt';
import GigEditButtons from './GigEditButtons';
import ReviewStar from '../others/ReviewStar';
import GigFlagButtons from './GigFlagButtons';
import TalentExcerptChat from '../talents/TalentExcerptChat';

function SingleGig() {
 
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
          Rating: <ReviewStar rating={gig.avg_review_rating} />{' '}
          <span className="text-smaller">
            {gig.avg_review_rating
              ? gig.avg_review_rating + ` from ${gig.review_count} review `
              : 'No review'}
          </span>
          <br />
          <br />
          No. of Applicants:{' '}
          {gig.poster === userId ? (
            <span
              className="link-like text-primary"
              aria-controls="applicants-container"
              onClick={() => setShowApplicants(!showApplicants)}
            >
              {gig.applicants.length}
            </span>
          ) : (
            gig.applicants.length
          )}<br/>
          {!gig.winner ? null : (<span>Winner: <a href={`/talents/${gig.winner.id}`}>{gig.winner.first_name}, {gig.winner.last_name} </a></span>)}
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
          <br />
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
              {gig.is_fixed ? 'Fixed term' : 'Project based'}
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
      <span className="text-muted">{gig.is_updated ? '(edited)' : null}</span>
      <Row className="button-container">
        <GigButtonContainer />
      </Row>
      <Row>
        <GigEditButtons />
      </Row>
      {/* Applicants list */}
      {!gig.poster === userId ? null : (
        <Collapse in={showApplicants}>
          <div id="applicants-container" className="mt-5">
            <h5 className="text-center">Applicants list</h5>
            {gig.applicants.map((talent) => (
              <TalentExcerptChat talent={talent} key={talent.id} />
            ))}
          </div>
        </Collapse>
      )}
    </Container>
  );
}

export default SingleGig;
