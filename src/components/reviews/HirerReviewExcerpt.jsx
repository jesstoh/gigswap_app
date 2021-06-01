import React from 'react';
import { Card } from 'react-bootstrap';
import {FaCheck, FaTimes} from 'react-icons/fa';
import TimeAgo from '../others/TimeAgo';

function HirerReviewExcerpt({ review }) {
  return (
    <Card className="mb-1 gig-card shadow-sm  bg-white rounded">
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
          <span className='mr-3'>Rating: {review.rating}</span>
          <span className='mr-3'>Scope: {review.scope}</span>
          Payment Ontime:{' '}
          {review.payment_ontime ? (
            <FaCheck className='text-success'/>
          ) : (
            <FaTimes className='text-danger' />
          )}
        </Card.Subtitle>
        <Card.Text>{review.description}</Card.Text>
        <Card.Text> Gig: <a href={`/gigs/${review.gig.id}`}>{review.gig.title}</a></Card.Text>
        <TimeAgo timestamp={review.created_at} text="Reviewed" />
      </Card.Body>
    </Card>
  );
}

export default HirerReviewExcerpt;
