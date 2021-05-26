import React from 'react';
import { useSelector } from 'react-redux';
import GigExcerpt from './GigExcerpt';
import { Container, Spinner } from 'react-bootstrap';

function GigsList() {
  // const gigs = useSelector((state) => state.gigs.gigs);
  const { gigs, status, error } = useSelector((state) => state.gigs);
  let content;

  // If status is loading, show spinner
  if (status === 'loading') {
    content = <div className='text-center mt-5'><Spinner animation="border" variant='primary'/></div>;
  } else if (status === 'succeeded') {
    if (!gigs.length) {
      //Show message if there is empty gig list
      content = <span>No relevant gig listing</span>;
    } else {
      content = (
        <Container>
          {gigs.map((gig) => (
            <GigExcerpt key={gig.id} gig={gig} />
          ))}
        </Container>
      );
    }
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = <span>{error}</span>;
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default GigsList;
