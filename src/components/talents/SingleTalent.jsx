import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';

function SingleTalent() {
  const { talent } = useSelector((state) => state.talents.activeTalent);
  const savedTalents = useSelector(
    (state) => state.favourites.fav.saved_talents_list
  );

  return (
    <Container className="px-5 py-3 my-3 shadow bg-white rounded">
      {talent.id}
    </Container>
  );
}

export default SingleTalent;
