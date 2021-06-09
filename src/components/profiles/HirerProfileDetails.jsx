import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { toggleProfileEdit } from '../../slices/profileSlice';

function HirerProfileDetails() {
const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const isEdit = useSelector((state) => state.profile.edit);

  return (
    <Container className='mt-5'>
      <Row className='mb-4'>
        <Col xs="4">
          <img src={profile.image} className="img-fluid img-thumbnail " />
        </Col>
      </Row>
      <div className="particular mb-4">
        <h6>Particulars</h6>
        <Row>
          <Col sm="4">Username: </Col>
          <Col>{profile.user.username}</Col>
        </Row>
        <Row>
          <Col sm="4">Email: </Col>
          <Col>{profile.user.email}</Col>
        </Row>
        <Row>
          <Col sm="4">First Name: </Col>
          <Col>{profile.user.first_name}</Col>
        </Row>
        <Row>
          <Col sm="4">Last Name: </Col>
          <Col>{profile.user.last_name}</Col>
        </Row>
      </div>
      <div className="mb-4">
        <h6>Company</h6>
        <Row>
          <Col sm="4">Company Name: </Col>
          <Col>{profile.company}</Col>
        </Row>
        <Row>
          <Col sm="4">Company Details: </Col>
          <Col>{profile.bio}</Col>
        </Row>
        <Row>
          <Col sm="4">Address: </Col>
          <Col>{profile.address}</Col>
        </Row>
        <Row>
          <Col sm="4">Postal Code: </Col>
          <Col>{profile.postal_code}</Col>
        </Row>
        <Row>
          <Col sm="4">Country: </Col>
          <Col>{profile.country}</Col>
        </Row>
        <Row>
          <Col sm="4">Contact No.: </Col>
          <Col>{profile.contact}</Col>
        </Row>
      </div>
      <div className="text-center">
        <Button onClick={() => dispatch(toggleProfileEdit())} className='px-4'>Edit</Button>
      </div>
    </Container>
  );
}

export default HirerProfileDetails;
