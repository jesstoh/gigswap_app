import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';

function TalentGigButtons() {
    
  return (
    <Col className="text-center">
      <Button className="mr-3 px-4 rounded-pill"> Save</Button>
      <Button variant="outline-primary px-4 rounded-pill"> Apply </Button>
    </Col>
  );
}

export default TalentGigButtons;
