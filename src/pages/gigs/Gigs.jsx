import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchGigs } from '../../slices/gigsSlice.js';

function Gigs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGigs());
  }, [dispatch]);

  return (
    <Container>
      <GigsList />
    </Container>
  );
}

export default Gigs;
