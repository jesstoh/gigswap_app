import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Modal,
  ListGroup,
  Alert,
  Collapse,
} from 'react-bootstrap';
import { IoSend } from 'react-icons/io5';
import TalentButtons from '../../components/talents/TalentsButtons';
import SmallGigExcerpt from '../gigs/SmallGigExcerpt';
import Axios from '../../utilz/Axios.js';
import gigsSlice from '../../slices/gigsSlice';

function SingleTalent() {
  const { talent } = useSelector((state) => state.talents.activeTalent);
  const activeGigs = useSelector((state) => state.favourites.fav.active_gigs);
  const isHirer = useSelector((state) => state.authentication.isHirer);
  const favStatus = useSelector((state) => state.favourites.status);
  const userId = useSelector((state) => state.authentication.user.id);

  const [errorMessage, setErrorMessage] = useState(null); // Storing error message
  const [modalErrorMessage, setModalErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // Storing message to display when invite sent
  const [gigId, setGigId] = useState(''); // Store gig id that hirer select to invite talent
  const [modalShow, setModalShow] = useState(false); //Storing state of showing modal of hire's gig list

  //Open or close applicant list
  const [showWonGigs, setShowWonGigs] = useState(false);

  //Api call to invite talent
  async function inviteTalent() {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/gigs/${gigId}/invite/`,
        { talent: talent.id }
      );
      setSuccessMessage('Invite sent successfully');
    } catch (err) {
      setErrorMessage(err.response.data.detail);
    } finally {
      handleModalClose();
    }
  }

  //Close Modal
  function handleModalClose() {
    setModalShow(false);
    setGigId(''); // Reset gigId after modal is closed
    setModalErrorMessage(null); //reset modal error message
  }
  // Open modal
  function handleModalOpen() {
    setModalShow(true);
  }

  //Store gig id when click on the gig item in modal
  function selectGig(e) {
    setGigId(e.target.id);
  }

  function handleSubmitInvite() {
    setModalErrorMessage(null);
    if (gigId === '') {
      setModalErrorMessage('Please select a gig to send invite');
    } else {
      inviteTalent();
    }
  }

  let modalContent;
  // Only display content once favourite state is loaded successfully
  if (favStatus === 'succeeded') {
    modalContent = (
      <Modal show={modalShow} onHide={handleModalClose}>
        {modalErrorMessage && (
          <Alert
            variant="danger"
            dismissible
            onClose={() => setModalErrorMessage(null)}
          >
            {modalErrorMessage}
          </Alert>
        )}

        <Modal.Header closeButton>
          <Modal.Title>My Gigs List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {activeGigs.map((gig) => (
              <ListGroup.Item
                key={gig.id}
                id={gig.id}
                onClick={selectGig}
                className={`btn text-left ${
                  gig.id === gigId ? 'bg-light' : ''
                }`}
              >
                {gig.title}{' '}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary rounded-pill"
            className="px-4"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary rounded-pill"
            className="px-4"
            onClick={handleSubmitInvite}
          >
            Send Invite <IoSend />
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    modalContent = null;
  }
  // //testing purpose
  // useEffect(()=> {
  //     console.log(gigId)
  // }, [gigId])

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
      {successMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}
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
        <Col className="">
          No. of Gigs Won: 
          {isHirer || userId === talent.id ? (
            <Button
              variant="link"
              aria-controls="gigs-container"
              onClick={() => setShowWonGigs(!showWonGigs)}
            >
              {talent.talent_profile.gigs_won}
            </Button>
          ) : (
            talent.talent_profile.gigs_won
          )}
          <br />
          <div>Review: .....</div>
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
            <Button
              variant="outline-primary px-4 rounded-pill"
              onClick={handleModalOpen}
            >
              Invite
            </Button>
          </Col>
        </Row>
      )}

      <Row className="reviews-container border my-2">
        Placeholder of reviews for talent
      </Row>

      {/* Applicants list */}
      {isHirer || userId === talent.id ? (
        <Collapse in={showWonGigs}>
          <div id="gigs-container" className="mt-5">
            <h5 className="text-center">Portfolio</h5>
            {talent.gigs_won.map((gig) => (
              <SmallGigExcerpt gig={gig} key={gig.id} />
            ))}
          </div> 
        </Collapse>
      ): null}

      {/* Modal of hirer's gigs list */}
      {!isHirer ? null : modalContent}
    </Container>
  );
}

export default SingleTalent;
