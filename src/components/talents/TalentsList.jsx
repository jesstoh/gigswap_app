import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner, Row } from 'react-bootstrap';
import TalentExcerpt from './TalentsExcerpt';

function TalentsList() {
  const { talents, status, error } = useSelector((state) => state.talents);
  let content;

  // If status is loading, show spinner
  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    if (!talents.length) {
      //Show message if there is empty talent list, though unlikely
      content = <span>No relevant talents</span>;
    } else {
      content = (
        <div>
          {talents.map((talent) => (
            <TalentExcerpt key={talent.id} talent={talent} />
          ))}
        </div>
      );
    }
  } else if (status === 'failed') {
    content = <span>{error}</span>;
  }

  return <Container>{content}</Container>;
}
export default TalentsList;
