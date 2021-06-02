import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchGigs } from '../../slices/gigsSlice.js';
import SearchGigs from '../../components/gigs/SearchGigs';

function Gigs() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  return (
    <Container className="pt-3">
      <div className='my-3'><SearchGigs /></div>
      <Row>
        <Col md={3} className='border'>Placeholder for filter </Col>
        <Col md={9}>
          <GigsList />
        </Col>
      </Row>
    </Container>
  );
}

export default Gigs;
