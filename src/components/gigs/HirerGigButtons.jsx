import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';
import { closeGig, awardGig } from '../../slices/gigsSlice';

function HirerGigButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);

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
            <Button variant="outline-primary px-4 rounded-pill">Award</Button>
          </>
        );
      } else {
        //Check if gig is completed
        if (!gig.is_completed) {
          content = (
            <Button className="mr-3 px-4 rounded-pill">
              Accept deliverable
            </Button>
          );
        } else {
          //Check if gig is paid
          if (gig.paid) {
            content = <span>You have paid talent</span>;
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
