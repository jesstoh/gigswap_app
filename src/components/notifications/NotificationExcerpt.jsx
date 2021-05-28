import React from 'react';
import { Card, Col } from 'react-bootstrap';
import TimeAgo from '../others/TimeAgo'

function NotificationExcerpt({ notification }) {
  return (
    <div className={`border-top p-2 notification-card ${notification.is_read?'':'unread-notification'}`}>
      <a href={notification.link}>
        <div>
          <h6>{notification.title}</h6><div className='float-right small-date'><TimeAgo timestamp={notification.created_at}/></div>
          <span className="text-muted" style={{ 'font-size': 'smaller' }}>
            {notification.message}
          </span>
        </div>
      </a>
    </div>
    // <Card>
    //   <a >
    //     <Card.Body>
    //       <Card.Title>{notification.title}</Card.Title>
    //       <Card.Text>{notification.message}</Card.Text>
    //     </Card.Body>
    //   </a>
    // </Card>
  );
}

export default NotificationExcerpt;
