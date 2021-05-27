import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SingleGig from '../../components/gigs/SingleGig';
import { fetchSingleGig } from '../../slices/gigsSlice';

function GigDetails({ match }) {
  const dispatch = useDispatch()
  const { gigId } = match.params;

  useEffect(() => {
    dispatch(fetchSingleGig(gigId))
    
  }, []);


  return (
    <React.Fragment>

      <SingleGig />
    </React.Fragment>
  );
}

export default GigDetails;
