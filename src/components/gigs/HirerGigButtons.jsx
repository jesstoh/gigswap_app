import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Modal, ListGroup, Alert } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
import {
  closeGig,
  awardGig,
  acceptGigCompletion,
} from '../../slices/gigsSlice';
import ReviewTalentContainer from '../reviews/ReviewTalentContainer';

function HirerGigButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);

  const [modalShow, setModalShow] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState(null);
  const [winner, setWinner] = useState(''); // Store winner id that hirer select

  //Close Modal
  function handleModalClose() {
    setModalShow(false);
    setWinner('');
  }
  // Open modal
  function handleModalOpen() {
    setModalShow(true);
  }

  function handleAward() {
    // console.log(winner);
    dispatch(awardGig({ gigId: gig.id, winnerId: winner }));
    handleModalClose();
  }

  let modalContent = (
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
        <Modal.Title>Participant List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {gig.applicants.map((applicant) => (
            <ListGroup.Item
              key={applicant.user.id}
              id={applicant.user.id}
              onClick={() => setWinner(applicant.user.id)}
              className={`btn text-left ${
                applicant.user.id === winner ? 'bg-light' : ''
              }`}
            >
              {applicant.user.first_name}, {applicant.user.last_name}
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
          onClick={handleAward}
        >
          Award
        </Button>
      </Modal.Footer>
    </Modal>
  );

  let content;

  // Check if login hirer is owner of gig
  if (user.id !== gig.poster) {
    content = null;
  } else {
    //Check if gig is closed
    if (gig.is_closed) {
      content = (
        <span className="text-danger">Gig is closed/cancelled by you</span>
      );
    } else {
      // check if gig is awarded
      if (!gig.winner) {
        content = (
          <>
            <Button
              className="mr-3 px-4 rounded-pill"
              variant="warning"
              onClick={() => dispatch(closeGig(gig.id))}
            >
              Close
            </Button>
            <Button
              variant="outline-primary px-4 rounded-pill"
              onClick={handleModalOpen}
            >
              Award
            </Button>
            {modalContent}
          </>
        );
      } else {
        //Check if gig is completed
        if (!gig.is_completed) {
          content = (
            <Button
              className="mr-3 px-4 rounded-pill"
              onClick={() => dispatch(acceptGigCompletion(gig.id))}
            >
              Accept deliverable
            </Button>
          );
        } else {
          //Check if gig is paid
          if (gig.paid) {
            content = (
              <>
                <span>You have paid talent</span> <br />
                {gig.is_talent_reviewed ? null : <ReviewTalentContainer />}
              </>
            );
          } else {
            content = <Button className="mr-3 px-4 rounded-pill">Pay</Button>;
          }
        }
      }
    }
  }

  return <Col className="text-center">{content}</Col>;
}

export default HirerGigButtons;
