import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
    content = <div>Create Profile Form</div>;
  }

  return <Container>{content}</Container>;
}

export default CreateProfilePage;
