import React from 'react';
import { Badge, Col, Row, Card, Image } from 'react-bootstrap';
import ReviewStar from '../others/ReviewStar';

function TalentExcerpt({ talent }) {
  return (
    <Card className="mb-1 talent-card shadow-sm  bg-white rounded">
      <a href={`/talents/${talent.user.id}`}>
        <Card.Body>
          <Row>
            <Col sm="4" className="text-center">
              <div className="image-container mb-2 border">
                <img src={talent.image} alt={talent.username} />
              </div>
              {/* <div className="sqr-image-container rounded-circle d-inline-block" >
                <Image className='img-fluid'
                  src={talent.image}
                //   className="img-fluid"
                  alt={talent.username}
                />
              </div> */}
            </Col>
            <Col sm="7">
              <Card.Title>
                {talent.user.first_name}, {talent.user.last_name}{' '}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Rating: <ReviewStar rating={talent.avg_review_rating} />{' '}
                <span className="text-smaller mr-5 d-inline-block">
                  {talent.avg_review_rating
                    ? `${talent.review_count} review`
                    : 'No review'}{' '}
                </span>
                <span className="text-smaller d-inline-block">
                  Gigs Won: {talent.gigs_won}
                </span>
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
              <Card.Text className="text-truncate mt-3">{talent.bio}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </a>
    </Card>
  );
}

export default TalentExcerpt;
