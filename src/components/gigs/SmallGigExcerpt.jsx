import React from 'react';
import { parseISO, format } from 'date-fns';
import { Card} from 'react-bootstrap';
import TimeAgo from '../others/TimeAgo';

function SmallGigExcerpt({ gig }) {
  return (
    <Card className="gig-card shadow-sm  bg-white rounded">
      <a href={`/gigs/${gig.id}`}>
        <Card.Body>
          <Card.Title>{gig.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {gig.poster_profile.company}
          </Card.Subtitle>
          <Card.Text className="text-truncate">{gig.description}</Card.Text>
          <div className="card-sm-text">
            <TimeAgo timestamp={gig.created_at} text="Posted " />
            <br />
            <span className="text-muted">
              <i>
                Expired on {format(parseISO(gig.expired_at), 'd MMM yyyy')}{' '}
              </i>
            </span>
          </div>
        </Card.Body>
      </a>
    </Card>
  );
}

export default SmallGigExcerpt;
