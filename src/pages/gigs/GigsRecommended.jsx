import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import GigsList from '../../components/gigs/GigsList';
import { fetchRecommendedGigs } from '../../slices/gigsSlice.js';


function GigsRecommended() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedGigs());
  }, []);

  return (
    <Container className="pt-3">
      <h4 className='text-center'>Gigs Recommended for You</h4>
      {/* <Row className='border my-3'>Placeholder for search </Row> */}
      <Row>
      
        {/* <Col md={3} className='border'> </Col> */}
        <Col md={{span:8, offset:2}}>
        
          <GigsList />
        </Col>
      </Row>
    </Container>
  );
}

export default GigsRecommended;
