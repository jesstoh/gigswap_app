import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function GigExcerpt({ gig }) {
  return (
    <Card>
      <a href={`/gigs/${gig.id}`}>
        <Card.Body>
          <Card.Title>{gig.title}</Card.Title>
          <div>
            {gig.subcategories.map((subcat, index) => {
              return (
                <Badge pill variant="info" key={index}>
                  {subcat.name}
                </Badge>
              );
            })}
          </div>
          <Card.Subtitle className="mb-2 text-muted">
            by {gig.poster.username}
          </Card.Subtitle>
          <Card.Text>{gig.description}</Card.Text>
          <span>Posted on {gig.created_at}</span>
          <span>Expired on {gig.expired_at} </span>
        </Card.Body>
      </a>
    </Card>
  );
}

export default GigExcerpt;
