import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Container } from 'react-bootstrap';
import NotificationExcerpt from '../../components/notifications/NotificationExcerpt';

function NotificationsPage() {
  const { notifications, status, error } = useSelector(
    (state) => state.notifications
  );

  let content;

  if (status === 'loading') {
    content = (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else if (status === 'succeeded') {
    content = (
      <div>
        {notifications.map((notification) => (
          <NotificationExcerpt key={notification.id} notification={notification} />
        ))}
      </div>
    );
  }

  return <Container>{content}</Container>;
}

export default NotificationsPage;
