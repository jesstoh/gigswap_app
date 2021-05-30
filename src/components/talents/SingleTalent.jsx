import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import TalentButtons from '../../components/talents/TalentsButtons';

function SingleTalent() {
  const { talent } = useSelector((state) => state.talents.activeTalent);
  const savedTalents = useSelector(
    (state) => state.favourites.fav.saved_talents_list
  );
  const isHirer = useSelector((state) => state.authentication.isHirer);

  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      <Row className="mb-3">
        <h3>
          {talent.first_name}, {talent.last_name}
        </h3>
      </Row>
      <Row>
        <Col xs="5" sm="3">
          <div className="sqr-image-container rounded-circle">
            <img
              src={talent.talent_profile.image}
              className="img-fluid"
              alt={talent.first_name}
            />
          </div>
        </Col>
        <Col className="d-flex align-items-center">
          No. of Gigs Won: {talent.talent_profile.gigs_won} <br />
          Review: .....
        </Col>
      </Row>
      <Row className="mb-4 mt-5">
        <Col>
          <h5>Skill Set</h5>
          {talent.talent_profile.skills.map((subcat, index) => {
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
          <h5>Bio</h5>
          <p>{talent.talent_profile.bio}</p>
        </Col>
      </Row>
      {/* Button container for login hirer action */}
      {!isHirer ? null : (
        <Row className="button-container my-3">
          <Col className="text-center">
            <TalentButtons />
            <Button variant="outline-primary px-4 rounded-pill">
              Invite
            </Button>
          </Col>
        </Row>
      )}

      <Row className="reviews-container border my-2">
        Placeholder of reviews for talent
      </Row>

      <Row className="gigs-container border">Placeholder of gigs of talent</Row>
    </Container>
  );
}

export default SingleTalent;
