import React from 'react';
import { Badge, Col, Row, Card, Image } from 'react-bootstrap';

function TalentExcerpt({ talent }) {
  return (
    <Card className="talent-card shadow-sm  bg-white rounded">
      <a href={`/talents/${talent.user.id}`}>
        <Card.Body>
          <Row>
            <Col sm="3" className='text-center'>
              <div className="sqr-image-container rounded-circle d-inline-block" >
                <Image className='img-fluid'
                  src={talent.image}
                //   className="img-fluid"
                  alt={talent.username}
                />
              </div>
            </Col>
            <Col sm='8'>
              <Card.Title>
                {talent.user.first_name}, {talent.user.last_name}{' '}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Review: {talent.avg_review_rating ? talent.avg_review_rating + `(${talent.review_count})` : 'No reviews'} <br />
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
            </Col>
          </Row>
        </Card.Body>
      </a>
    </Card>
  );
}

export default TalentExcerpt;
