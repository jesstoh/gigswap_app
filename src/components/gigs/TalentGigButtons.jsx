import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { parseISO, format } from 'date-fns';

function TalentGigButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  const savedGigs = useSelector((state) => state.favourites.fav.saved_list); //Get login talent saved gig list
  const appliedGigs = useSelector((state) => state.favourites.fav.applied_list); // Get login talent applied gig list
  //Check fetching favourite status
  const status = useSelector((state) => state.favourites.status);

  let content;

  // Only render button if favorite state is loaded
  if (status === 'succeeded') {
    // Gig closed without award
    if (gig.is_closed) {
      content = (
        <span className="text-danger">
          Gig is closed by owner without award
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
              <Button variant="outline-primary px-4 rounded-pill">
                Request Acceptance of Deliverable
              </Button>
            );
          } else {
            // if owner has pay talent
            if (gig.paid) {
              content = <span>Owner has made payment to you for this gig</span>;
            } else {
              //else request for payment by talent
              content = (
                <Button className="mr-3 px-4 rounded-pill">
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
          content = (
            <>
              {/* Render save and unsave button */}
              {savedGigs.includes(gig.id) ? (
                <Button className="mr-3 px-4 rounded-pill">Unsave</Button>
              ) : (
                <Button className="mr-3 px-4 rounded-pill">Save</Button>
              )}
              {/* Render apply and withdraw button */}
              {appliedGigs.includes(gig.id) ? (
                <Button variant="outline-primary px-4 rounded-pill">
                  Withdraw
                </Button>
              ) : (
                <Button variant="outline-primary px-4 rounded-pill">
                  Apply
                </Button>
              )}
            </>
          );
        }
      }
    }
  } else {
    //Display no content if favourite is not fetched successfully in store
    content = null;
  }

  return <Col className="text-center">{content}</Col>;
}

export default TalentGigButtons;
