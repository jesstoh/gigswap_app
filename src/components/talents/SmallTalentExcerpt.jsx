import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import ReviewStar from '../others/ReviewStar';

function SmallTalentExcerpt({ talent }) {
  return (
    <Card className="talent-card shadow-sm  bg-white rounded">
      <a href={`/talents/${talent.user.id}`}>
        <Card.Body>
          <Card.Title>{talent.user.first_name}, {talent.user.last_name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
          Rating: <ReviewStar rating={talent.avg_review_rating}/> <span className='text-smaller mr-5'>{talent.avg_review_rating ? `${talent.review_count} review` : 'No review'} </span>
                <span className='text-smaller'>Gigs Won: {talent.gigs_won}</span>
          </Card.Subtitle>
          <div>
            {talent.skills.map((skill, index) => {
              return (
                <Badge pill variant="info" key={index} className="mr-2">
                  {skill.name}
                </Badge>
              );
            })}
          </div>
          <Card.Text className="text-truncate">{talent.bio}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
}

export default SmallTalentExcerpt;
