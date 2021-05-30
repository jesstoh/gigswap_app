import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { fetchSingleTalent } from '../../slices/talentsSlice';
import { fetchHirerFav } from '../../slices/favouritesSlicer.js';

function TalentDetails({ match }) {
  const dispatch = useDispatch();
  //States of active talent being viewed
  const { talent, status, error } = useSelector(
    (state) => state.talents.activeTalent
  );
  const savedTalents = useSelector((state) => state.favourites.fav.saved_talents_list);

  //Talent id in url
  const { talentId } = match.params;

  useEffect(() => {
    //Fetch single talent details to the store
    dispatch(fetchSingleTalent(talentId));
    dispatch(fetchHirerFav());
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
    content = <Container>{talentId}</Container>;
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
