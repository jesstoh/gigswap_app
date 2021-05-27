import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import SingleGig from '../../components/gigs/SingleGig';
import EditGigForm from '../../components/gigs/EditGigForm';
import { fetchSingleGig } from '../../slices/gigsSlice';

function GigDetails({ match }) {
  const dispatch = useDispatch();
  const { gig, status, error, edit } = useSelector(
    (state) => state.gigs.activeGig
  );

  const { gigId } = match.params;

  useEffect(() => {
    dispatch(fetchSingleGig(gigId));
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
    if (edit) {
      content = <EditGigForm />;
    } else {
      content = <SingleGig />;
    }
  } else if (status === 'failed') {
    //Show error if fetch failed
    content = <Alert variant="danger" className='text-center'>{error}</Alert>;
  }

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

export default GigDetails;
