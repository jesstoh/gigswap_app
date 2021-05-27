import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchProfile } from '../../slices/profileSlice.js';
import TalentProfileDetails from '../../components/profiles/TalentProfileDetails';
import HirerProfileDetails from '../../components/profiles/HirerProfileDetails';

function ProfilePage() {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.profile.status);
  const error = useSelector((state) => state.profile.error);
  const isHirer = useSelector((state) => state.authentication.isHirer);
  const isProfileComplete = useSelector(
    (state) => state.authentication.isProfileComplete
  );

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
    if (isHirer) {
      content = <HirerProfileDetails />;
    } else {
      content = <TalentProfileDetails />;
    }
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = <span>{error}</span>;
  }

  return <section>{content}</section>;
}

export default ProfilePage;
