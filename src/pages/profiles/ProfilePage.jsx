import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';
import { fetchProfile, toggleProfileEdit } from '../../slices/profileSlice.js';
import TalentProfileDetails from '../../components/profiles/TalentProfileDetails';
import HirerProfileDetails from '../../components/profiles/HirerProfileDetails';
import EditTalentProfileForm from '../../components/profiles/EditTalentProfileForm';
import EditHirerProfileForm from '../../components/profiles/EditHirerProfileForm';

function ProfilePage() {
  const dispatch = useDispatch();
  const { status, error, edit } = useSelector((state) => state.profile);
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
    if (edit) {
      if (isHirer) {
        content = <EditHirerProfileForm />;
      } else {
        content = <EditTalentProfileForm />;
      }
    } else {
      if (isHirer) {
        content = <HirerProfileDetails />;
      } else {
        content = <TalentProfileDetails />;
      }
    }
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = <span>{error}</span>;
  }

  return (
    <section>
      {content}
      
    </section>
  );
}

export default ProfilePage;
