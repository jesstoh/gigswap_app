import React from 'react';
import { parseISO, format } from 'date-fns';
import { Card, Badge } from 'react-bootstrap';
import TimeAgo from '../others/TimeAgo';

function GigExcerpt({ gig }) {
  return (
    <Card className="mb-1 gig-card shadow-sm  bg-white rounded">
      <a href={`/gigs/${gig.id}`}>
        <Card.Body>
          <Card.Title>{gig.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {gig.poster_profile.company}
          </Card.Subtitle>
          <div>
            {gig.subcategories.map((subcat, index) => {
              return (
                <Badge pill variant="info" key={index} className="mr-2">
                  {subcat.name}
                </Badge>
              );
            })}
          </div>
          <Card.Text className='text-truncate'>{gig.description}</Card.Text>
          <div className="card-sm-text">
            <TimeAgo timestamp={gig.created_at} text="Posted " />
            <br />
            <span className="text-muted">
              <i>
                Expired on {format(parseISO(gig.expired_at), 'd MMM yyyy')}{' '}
              </i>
            </span>
            <span className="text-muted float-right">
              {0 || gig.applicants.length} applied{' '}
            </span>
          </div>
          
        </Card.Body>
      </a>
    </Card>
  );
}

export default GigExcerpt;
