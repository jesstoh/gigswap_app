import React from 'react';
import { useSelector } from 'react-redux';
import GigExcerpt from './GigExcerpt';
import { Container, Spinner } from 'react-bootstrap';

function GigsList() {
  // const gigs = useSelector((state) => state.gigs.gigs);
  const { gigs, status, error, errorCode } = useSelector((state) => state.gigs);
  let content;

  // If status is loading, show spinner
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    if (!gigs.length) {
      //Show message if there is empty gig list
      content = <span>No relevant gig listing</span>;
    } else {
      content = (
        <div>
          {gigs.map((gig) => (
            <GigExcerpt key={gig.id} gig={gig} />
          ))}
        </div>
      );
    }
  } else if (status === 'failed') {
    if (errorCode === 412) {
      //
      content = (
        <div className="text-center mt-5">
          <a className="btn btn-light px-4" href="/profile/create">
            Please complete your profile to view recommended gigs.
          </a>
        </div>
      );
    } else {
      //Show other fetch error
      content = <span>{error}</span>;
    }
  }

  return <Container className="mt-5">{content}</Container>;
}

export default GigsList;
