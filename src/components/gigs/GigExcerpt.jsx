import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function GigExcerpt({ gig }) {
  return (
    <Card className='mb-1 gig-card shadow-sm p-1 bg-white rounded'>
      <a href={`/gigs/${gig.id}`}>
        <Card.Body>
          <Card.Title>{gig.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            by {gig.poster.username}
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
          <span>Posted on {gig.created_at}</span>
          <span>Expired on {gig.expired_at} </span>
        </Card.Body>
      </a>
    </Card>
  );
}

export default GigExcerpt;
