import React from 'react';
import { Card, Badge } from 'react-bootstrap';

function SmallTalentExcerpt({ talent }) {
  return (
    <Card className="talent-card shadow-sm  bg-white rounded">
      <a href={`/talents/${talent.user.id}`}>
        <Card.Body>
          <Card.Title>{talent.user.username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Review: ..... <br />
            Gigs Won: {talent.gigs_won}
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
