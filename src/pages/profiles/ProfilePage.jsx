import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchProfile } from '../../slices/profileSlice.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <Container>
        <Row>
          <Col xs="4">
            <img src={profile.image} className="img-fluid img-thumbnail " />
          </Col>
        </Row>
      </Container>
    );
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = <span>{error}</span>;
  }

  return <section>{content}</section>;
}

export default ProfilePage;
