import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner, Container, Row, Col, Button } from 'react-bootstrap';
import NotificationExcerpt from '../../components/notifications/NotificationExcerpt';
import Axios from '../../utilz/Axios';
import { fetchNotifications } from '../../slices/notificationsSlice';

function NotificationsPage() {
  const { notifications, status, error } = useSelector(
    (state) => state.notifications
  );
  const dispatch = useDispatch();

  async function readAllNotifications() {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/notifications/read/`,
        { "all": true }
      );
      dispatch(fetchNotifications());
    } catch (err) {
      console.log(err);
    }
  }

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
          <NotificationExcerpt
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    );
  }

  return (
    <Container className="mt-5 p-2">
      <Row className='mb-3'> <Button onClick={readAllNotifications} variant='light' className='px-3'>Read All</Button></Row>
      <Row>
        <Col
          md={{ span: 8, offset: 2 }}
          className="border-left border-bottom border-right px-0"
        >
          {content}
        </Col>
      </Row>
    </Container>
  );
}

export default NotificationsPage;
