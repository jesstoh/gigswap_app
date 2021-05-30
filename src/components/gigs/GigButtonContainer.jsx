import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import TalentGigButtons from './TalentGigButtons';
import HirerGigButtons from './HirerGigButtons';
import AdminGigButtons from './AdminGigButtons';

function GigButtonContainer() {
  const { isHirer, isAdmin } = useSelector((state) => state.authentication);
  const gig = useSelector((state) => state.gigs.activeGig.gig);
  //Check fetching favourite status
  const status = useSelector((state) => state.favourites.status);

  let content;

  // Only render button if favorite state is loaded
  if (status === 'succeeded') {
    if (isAdmin) {
      content = <AdminGigButtons />;
    } else if (isHirer) {
      content = <HirerGigButtons />;
    } else {
      content = <TalentGigButtons />;
    }
  } else {
    //Display no content if favourite is not fetched successfully in store
    content = null;
  }

  return <Col className="text-center">{content}</Col>;
}

export default GigButtonContainer;
