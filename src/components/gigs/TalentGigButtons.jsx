import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Col, Modal } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
import {
  saveGig,
  unsaveGig,
  applyGig,
  withdrawGig,
} from '../../slices/favouritesSlicer.js';
import Axios from '../../utilz/Axios.js';
import ReviewHirerContainer from '../reviews/ReviewHirerContainer'

function TalentGigButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  const savedGigs = useSelector((state) => state.favourites.fav.saved_list); //Get login talent saved gig list
  const appliedGigs = useSelector((state) => state.favourites.fav.applied_list); // Get login talent applied gig list

  const [modalShow, setModalShow] = useState(false);

  //Close Modal
  function handleModalClose(e) {
    setModalShow(false);
  }

  // Open modal
  function handleModalOpen(e) {
    setModalShow(true);
  }

  let modalContent = (
    <Modal show={modalShow} onHide={handleModalClose}>
      <Modal.Header closeButton>
        {/* <Modal.Title>Participant List</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        Please complete your <a href="/profile/create">profile </a>before gig
        application
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary rounded-pill"
          className="px-4"
          onClick={handleModalClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  async function handleApplyGig() {
    try {
      const result = await dispatch(applyGig(gig.id));
      unwrapResult(result);
    } catch (err) {
      if (
        err.data.detail === 'Only talent with complete profile can apply gig'
      ) {
        handleModalOpen();
      }
    }
  }

  // Sending message for request for payment
  async function requestPayment() {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/notifications/`,
        { title: 'Request for pay', gig_id: gig.id }
      );
    } catch (err) {
      console.log(err.response);
    }
  }

  // Sending message to request for acceptance of deliverable
  async function requestDeliverableAcceptance() {
    try {
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/notifications/`,
        { title: 'Request for acceptance', gig_id: gig.id }
      );
    } catch (err) {
      console.log(err.response);
    }
  }

  let content;
  // Gig closed without award
  if (gig.is_closed) {
    content = (
      <span className="text-danger">
        Gig is closed/cancelled by owner without award
      </span>
    );
  } else {
    // if gig is already awarded
    if (gig.winner) {
      //check if login talent is winner
      if (gig.winner.id === user.id) {
        if (!gig.is_completed) {
          // if gig is not marked as complete, request acceptance of deliverable from owner
          content = (
            <Button
              variant="outline-primary px-4 rounded-pill"
              onClick={requestDeliverableAcceptance}
            >
              Request Acceptance of Deliverable
            </Button>
          );
        } else {
          // if owner has pay talent
          if (gig.paid) {
            content = (
              <>
                <span>Owner has made payment to you for this gig</span>
                <br />
                {gig.is_hirer_reviewed ? null : (
                  <ReviewHirerContainer />
                )}
              </>
            );
          } else {
            //else request for payment by talent
            content = (
              <Button
                className="mr-3 px-4 rounded-pill"
                onClick={requestPayment}
              >
                Request for Payment
              </Button>
            );
          }
        }
      } else {
        // display message if gig is awarded to other talents
        content = (
          <span className="text-danger">
            Gig has been awarded to other talents.
          </span>
        );
      }
    } else {
      //If not awarded yet, check if gig expired
      if (parseISO(gig.expired_at) < new Date()) {
        // display message of pending award, if expired
        content = <span className="text-danger">Gig pending award.</span>;
      } else {
        if (appliedGigs.includes(gig.id)) {
          content = (
            <Button
              variant="outline-primary px-4 rounded-pill"
              onClick={() => dispatch(withdrawGig(gig.id))}
            >
              Withdraw
            </Button>
          );
        } else {
          content = (
            <>
              {/* Render save and unsave button */}
              {savedGigs.includes(gig.id) ? (
                <Button
                  className="mr-3 px-4 rounded-pill"
                  onClick={() => dispatch(unsaveGig(gig.id))}
                >
                  Unsave
                </Button>
              ) : (
                <Button
                  className="mr-3 px-4 rounded-pill"
                  onClick={() => dispatch(saveGig(gig.id))}
                >
                  Save
                </Button>
              )}
              {modalContent}
              <Button
                variant="outline-primary px-4 rounded-pill"
                onClick={handleApplyGig}
              >
                Apply
              </Button>
            </>
          );
        }
        // content = (
        //   <>
        //     {/* Render save and unsave button */}
        //     {savedGigs.includes(gig.id) ? (
        //       <Button
        //         className="mr-3 px-4 rounded-pill"
        //         onClick={() => dispatch(unsaveGig(gig.id))}
        //       >
        //         Unsave
        //       </Button>
        //     ) : (
        //       <Button
        //         className="mr-3 px-4 rounded-pill"
        //         onClick={() => dispatch(saveGig(gig.id))}
        //       >
        //         Save
        //       </Button>
        //     )}
        //     {/* Render apply and withdraw button */}
        //     {appliedGigs.includes(gig.id) ? (
        //       <Button
        //         variant="outline-primary px-4 rounded-pill"
        //         onClick={() => dispatch(withdrawGig(gig.id))}
        //       >
        //         Withdraw
        //       </Button>
        //     ) : (
        //       <>
        //         {modalContent}
        //         <Button
        //           variant="outline-primary px-4 rounded-pill"
        //           onClick={handleApplyGig}
        //         >
        //           Apply
        //         </Button>
        //       </>
        //     )}
        //   </>
        // );
      }
    }
  }

  return <Col className="text-center">{content}</Col>;
}

export default TalentGigButtons;
