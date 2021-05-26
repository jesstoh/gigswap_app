import React from 'react';
import { useSelector } from 'react-redux';
import GigExcerpt from './GigExcerpt';
import { Container } from 'react-bootstrap';

function GigsList() {
  const gigs = useSelector((state) => state.gigs.gigs);

  return (
    <Container>
      {gigs.map((gig) => (
        <GigExcerpt key={gig.id} gig={gig} />
      ))}
    </Container>
  );
}

export default GigsList;
