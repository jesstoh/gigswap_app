import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Badge } from 'react-bootstrap';
import { FaRegComment } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import { db } from '../../services/firebase';
import ReviewStar from '../others/ReviewStar';

function TalentExcerptChat({ talent }) {
  const history = useHistory();
  const hirer = useSelector((state) => state.authentication.user);

  function handleChat(e) {
    // e.stopPropagation();
    // console.log('chat');
    console.log();
    db.collection('chats')
      .doc(`${hirer.username}-${talent.user.username}`)
      .set(
        {
          hirer: hirer.username,
          talent: talent.user.username,
          talentName: talent.user.first_name,
          hirerName: hirer.first_name,
          updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
        },
        { merge: true }
      )
      .then(() => {
        history.push('/chats');
      });
  }

  return (
    <Card className="talent-card shadow-sm  bg-white rounded">
      <Card.Body>
        <span className="float-right text-muted link-like">
          <FaRegComment size={25} onClick={handleChat} />
        </span>
        <a
          href={`/talents/${talent.user.id}`}
          className="line-less talent-excerpt"
        >
          <Card.Title>
            {talent.user.first_name}, {talent.user.last_name}
          </Card.Title>{' '}
          <Card.Subtitle className="mb-2 text-muted">
            Rating: <ReviewStar rating={talent.avg_review_rating} />{' '}
            <span className="text-smaller mr-5">
              {talent.avg_review_rating
                ? `${talent.review_count} review`
                : 'No review'}{' '}
            </span>
            <span className="text-smaller">Gigs Won: {talent.gigs_won}</span>
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
        </a>
      </Card.Body>
    </Card>
  );
}

export default TalentExcerptChat;
