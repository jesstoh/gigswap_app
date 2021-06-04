import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import { fetchSingleTalent } from '../../slices/talentsSlice';
import { fetchHirerFav } from '../../slices/favouritesSlicer.js';
import SingleTalent from '../../components/talents/SingleTalent';
import { fetchTalentReviews } from '../../slices/reviewsSlice';

function TalentDetails({ match }) {
  const dispatch = useDispatch();
  //States of active talent being viewed
  const { status, error } = useSelector((state) => state.talents.activeTalent);
  const isHirer = useSelector((state) => state.authentication.isHirer);

  //Talent id in url
  const { talentId } = match.params;

  useEffect(() => {
    //Fetch single talent details to the store
    dispatch(fetchSingleTalent(talentId));

    //Fetch talent's review
    dispatch(fetchTalentReviews(talentId))

    // Fetch hirer favourite if login user is hirer
    if (isHirer) {
      dispatch(fetchHirerFav());
    }
  }, []);

  let content;

  // If status is loading, show spinner
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = <SingleTalent />;
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return <React.Fragment>{content}</React.Fragment>;
}

export default TalentDetails;
