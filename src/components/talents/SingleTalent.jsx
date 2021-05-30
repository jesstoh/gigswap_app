import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Badge, Button, Modal } from 'react-bootstrap';
import TalentButtons from '../../components/talents/TalentsButtons';
import Axios from '../../utilz/Axios.js';

function SingleTalent() {
  const { talent } = useSelector((state) => state.talents.activeTalent);
//   const savedTalents = useSelector(
//     (state) => state.favourites.fav.saved_talents_list
//   );
  const isHirer = useSelector((state) => state.authentication.isHirer);

  const [errorMessage, setErrorMessage] = useState(null); // Storing error message
  const [gigId, setGigId] = useState(''); // Store gig id that hirer select to invite talent
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalShow, setModalShow] = useState(false); //Storing state of showing modal of hire's gig list

  //Api call to invite talent
  async function inviteTalent() {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/invite/`,
        { talent: talent.id }
      );
      setSuccessMessage(response.data.detail);
    } catch (err) {
      setErrorMessage(err.response.data.detail);
    }
  }

  function handleModalClose () {
      setModalShow(false)
  }

  function handleModalOpen () {
      setModalShow(true)
  }

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
            <Button variant="outline-primary px-4 rounded-pill" onClick={handleModalOpen}>
              Invite
            </Button>
          </Col>
        </Row>
      )}

      <Row className="reviews-container border my-2">
        Placeholder of reviews for talent
      </Row>

      <Row className="gigs-container border">Placeholder of gigs of talent</Row>

      {/* Modal of hirer's gigs list */}
      <Modal show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Gigs List</Modal.Title>
        </Modal.Header>
        <Modal.Body>Placeholder of gig list</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary rounded-pill" className='px-4' onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary rounded-pill" className='px-4' onClick={handleModalClose}>
            Send Invite
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SingleTalent;
