import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import SingleGig from '../../components/gigs/SingleGig';
import EditGigForm from '../../components/gigs/EditGigForm';
import { fetchSingleGig } from '../../slices/gigsSlice';
import {
  fetchTalentFav,
  fetchHirerFav,
} from '../../slices/favouritesSlicer.js';

function GigDetails({ match }) {
  const dispatch = useDispatch();
  const { gig, status, error, edit } = useSelector(
    (state) => state.gigs.activeGig
  );
  const { user, isHirer, isAdmin } = useSelector(
    (state) => state.authentication
  );

  const { gigId } = match.params;

  useEffect(() => {
    dispatch(fetchSingleGig(gigId));
    if (!isAdmin) {
      // Dispatch corresponding thunk to fetch favourites of login hirer or talent
      if (isHirer) {
        dispatch(fetchHirerFav());
      } else {
        dispatch(fetchTalentFav());
      }
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
    // Only gig owner can view gig edit form
    if (edit && user.id === gig.poster) {
      content = <EditGigForm />;
    } else {
      content = <SingleGig />;
    }
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

export default GigDetails;
