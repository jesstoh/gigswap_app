import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import CreateTalentProfileForm from '../../components/profiles/CreateTalentProfileForm';

function CreateProfilePage() {
  // Get current profile complete status of user
  const isProfileComplete = useSelector(
    (state) => state.authentication.isProfileComplete
  );

  let content;

  // Redirect to profile page if profile is completed
  if (isProfileComplete) {
    content = <Redirect to="/profile" />;
  } else {
    // content = <div>Create Talent Profile</div>
    content = <CreateTalentProfileForm />;
  }

  return <Container className='mt-4'>{content}</Container>;
}

export default CreateProfilePage;
