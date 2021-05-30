import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchTalents } from '../../slices/talentsSlice';
import TalentsList from '../../components/talents/TalentsList';

function TalentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTalents());
  }, []);

  return (
    <Container className="pt-3">
      <Row className="border my-3">Placeholder for search </Row>
      <Row>
        <Col md={3} className="border">
          Placeholder for filter{' '}
        </Col>
        <Col md={9}>
          <TalentsList />
        </Col>
      </Row>
    </Container>
  );
}

export default TalentsPage;
