import React from 'react';
import { parseISO, format } from 'date-fns';
import { Card, Badge } from 'react-bootstrap';
import TimeAgo from '../others/TimeAgo';

function GigExcerpt({ gig }) {
  return (
    <Card className='mb-1 gig-card shadow-sm p-1 bg-white rounded'>
      <a href={`/gigs/${gig.id}`}>
        <Card.Body>
          <Card.Title>{gig.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {gig.company}
          </Card.Subtitle>
          <div>
            {gig.subcategories.map((subcat, index) => {
              return (
                <Badge pill variant="info" key={index} className='mr-2'>
                  {subcat.name}
                </Badge>
              );
            })}
          </div>

          <Card.Text>{gig.description}</Card.Text>
          <TimeAgo timestamp={gig.created_at} text='Posted '/><br/>
          <span className='text-muted'><i>Expired on {format(parseISO(gig.expired_at),'d MMM yyyy' )} </i></span><span className='text-muted float-right'>{0 || gig.applicants.length} applied </span>
        
        </Card.Body>
      </a>
    </Card>
  );
}

export default GigExcerpt;
