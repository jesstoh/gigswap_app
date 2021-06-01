import React from 'react';
import { Card } from 'react-bootstrap';
import TimeAgo from '../others/TimeAgo';

function HirerReviewExcerpt({ review }) {
  return (
    <Card className="mb-1 gig-card shadow-sm  bg-white rounded">
      <Card.Body>
        <Card.Title>
          Gig: <a href={`/gigs/${review.gig.id}`}>{review.gig.title}</a>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Rating: {review.rating}
          Scope: {review.scope}
          Payment Ontime:{' '}
          {review.payment_ontime ? (
            <i className="fas fa-check text-secondary"></i>
          ) : (
            <i class="fas fa-times text-danger"></i>
          )}
        </Card.Subtitle>
        <Card.Text>{review.description}</Card.Text>
        <TimeAgo timestamp={review.created_at} text="Reviewed" />
      </Card.Body>
    </Card>
  );
}

export default HirerReviewExcerpt;
