import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import CreateTalentProfileForm from '../../components/profiles/CreateTalentProfileForm';
import CreateHirerProfileForm from '../../components/profiles/CreateHirerProfileForm';

function CreateProfilePage() {
  // Get current profile complete status of user
  const isProfileComplete = useSelector(
    (state) => state.authentication.isProfileComplete
  );
  // Get detail if user is hirer
  const isHirer = useSelector((state) => state.authentication.isHirer);

  let content;

  // Redirect to profile page if profile is completed
  if (isProfileComplete) {
    content = <Redirect to="/profile" />;
  } else {
    //Rendering different profile form based on user role
    if (isHirer) {
      content = <CreateHirerProfileForm />;
    } else {
      content = <CreateTalentProfileForm />;
    }
  }

  return <Container className="mt-4">{content}</Container>;
}

export default CreateProfilePage;
