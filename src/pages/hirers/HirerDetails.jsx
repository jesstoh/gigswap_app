import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Alert, Container } from 'react-bootstrap';
import { fetchSingleHirer } from '../../slices/hirersSlice';
import SingleHirer from '../../components/hirers/SingleHirer'

function HirerDetails({ match }) {
  const dispatch = useDispatch();
  //States of active hirer being viewed
  const { hirer, status, error } = useSelector(
    (state) => state.hirers.activeHirer
  );

  //Hirer id in url
  const { hirerId } = match.params;

  useEffect(() => {
    //Fetch single hirer details to the store
    dispatch(fetchSingleHirer(hirerId));
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
    content = <SingleHirer />;
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

export default HirerDetails;
