import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import {fetchProfile} from '../../slices/profileSlice.js';

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  useEffect(() => {
    dispatch(fetchProfile());

  }, [dispatch])

  return (<Container>


  </Container>);
}

export default ProfilePage;
