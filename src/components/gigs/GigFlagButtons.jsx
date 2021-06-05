import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col } from 'react-bootstrap';
import { FaFlag, FaRegFlag } from 'react-icons/fa';
import { parseISO } from 'date-fns';
import { flagGig, unflagGig } from '../../slices/gigsSlice';

function GigFlagButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  const gig = useSelector((state) => state.gigs.activeGig.gig);

  let content;

  //Only can flag or unflag active gig
  if (!gig.winner && !gig.is_closed && parseISO(gig.expired_at) > new Date()) {
    // Check if login hirer is owner of gig
    if (gig.flag.includes(user.id)) {
      content = (
        <div
          onClick={() =>
            dispatch(unflagGig({ gigId: gig.id, userId: user.id }))
          }
          className="btn text-danger"
        >
          <FaFlag size={15}/>
        </div>
      );
    } else {
      content = (
        <div
          onClick={() => dispatch(flagGig({ gigId: gig.id, userId: user.id }))}
          className="btn text-secondary"
        >
          <FaRegFlag size={15}/>
        </div>
      );
    }
  }

  return <Col className="text-left">{content}</Col>;
}

export default GigFlagButtons;
