import React from 'react';
import { Card } from 'react-bootstrap';

function NotificationExcerpt({ notification }) {
  return (
    <Card>
      <a href={notification.link}>
        <Card.Body>
          <Card.Title>{notification.title}</Card.Title>
          <Card.Text>{notification.message}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
}

export default NotificationExcerpt;
