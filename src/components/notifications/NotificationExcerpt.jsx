import React from 'react';
import { useDispatch } from 'react-redux';
import {FaEllipsisV} from 'react-icons/fa'
import Axios from '../../utilz/Axios';

import TimeAgo from '../others/TimeAgo';
import { fetchNotifications } from '../../slices/notificationsSlice';


let NotificationExcerpt = ({ notification }) => {
  const dispatch = useDispatch();
  // Function to call backend api to mark notification as read
  async function readNotification() {
    try {
      // Pass in id of notification to be read
      const response = await Axios.put(
        `${process.env.REACT_APP_API_URL}/api/notifications/read/`,
        { notification_id: [notification.id], all: false }
      );
      // if read successfully
      dispatch(fetchNotifications());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`border-top p-2 notification-card ${
        notification.is_read ? '' : 'unread-notification'
      }`}
      onClick={readNotification}
    >
      <a href={notification.link}>
        <div>
          <h6 className='d-inline-block'>{notification.title}</h6>
          
          <span className='float-right text-muted'><FaEllipsisV /></span><br/>
          <span className="text-muted" style={{ 'font-size': 'smaller' }}>
            {notification.message}
          </span>
          <div className="float-right small-date">
            <TimeAgo timestamp={notification.created_at} />
          </div>
  
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

// Only re-rendering if props changes
// NotificationExcerpt = React.memo(NotificationExcerpt)

export default NotificationExcerpt;
