import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Badge } from 'react-bootstrap';

function ProfileDetails() {
  const profile = useSelector((state) => state.profile.profile);
  return (
    <Container>
      <Row>
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
      <div className="bio mb-4">
        <h6>Bio</h6>
        <Row>
          <Col sm="4">Description: </Col>
          <Col>{profile.bio}</Col>
        </Row>
        <Row>
          <Col sm="4">Skills: </Col>
          <Col>
            {' '}
            {profile.skills.map((subcat, index) => {
              return (
                <Badge pill variant="info" key={index} className="mr-2">
                  {subcat.name}
                </Badge>
              );
            })}
          </Col>
        </Row>
      </div>
      <div className='preference mb-4'>
        <h6>Preference</h6>
        <Row>
          <Col sm="4">Remote Only: </Col>
          <Col>{profile.remote ? 'Yes' : 'No'}</Col>
        </Row>
        <Row>
          <Col sm="4">Project or Fixed Term: </Col>
          <Col>{profile.fixed_term ? 'Fixed term' : 'Project based'}</Col>
        </Row>
        <Row>
          <Col sm="4">Min pay: </Col>
          <Col>$ {profile.min_pay} /hour</Col>
        </Row>
      </div>
      <div className='other-particular'>
        <h6>Other</h6>
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
    </Container>
  );
}

export default ProfileDetails;
