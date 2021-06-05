import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab, Spinner } from 'react-bootstrap';
import HirerReviewExcerpt from '../reviews/HirerReviewExcerpt';
import TalentReviewExcerpt from '../reviews/TalentReviewExcerpt';

function TalentFavReviewsList() {
  const { hirerReviews, talentReviews, status, error } = useSelector(
    (state) => state.reviews
  );
  const [key, setKey] = useState('received');

  let content;
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="received" title="Received" key="received">
          {talentReviews.map((review) => (
            <TalentReviewExcerpt key={review.id} review={review} />
          ))}
        </Tab>
        <Tab eventKey="gave" title="Gave" key="gave">
          {hirerReviews.map((review) => (
            <HirerReviewExcerpt key={review.id} review={review} />
          ))}
        </Tab>
      </Tabs>
    );
  } else if (status === 'failed') {
    //Show error
    content = <span>{error}</span>;
  }

  return <>{content}</>;
}

export default TalentFavReviewsList;