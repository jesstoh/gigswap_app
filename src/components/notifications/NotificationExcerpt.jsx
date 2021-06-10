import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEllipsisV } from 'react-icons/fa';
import Axios from '../../utilz/Axios';
import TimeAgo from '../others/TimeAgo';
import {
  fetchNotifications,
  setActiveNotification,
} from '../../slices/notificationsSlice';

let NotificationExcerpt = ({ notification }) => {
  const dispatch = useDispatch();
  // Function to call backend api to mark notification as read

  const activeNotification = useSelector(
    (state) => state.notifications.activeNotification
  );

  // const [display, setDisplay] = useState(false);

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
      // console.log(error);
    }
  }

  async function deleteNotification() {
    try {
      // Pass in id of notification to be read
      const response = await Axios.post(
        `${process.env.REACT_APP_API_URL}/api/notifications/?action=delete`,
        { notification_id: [notification.id] }
      );
      // console.log('delete');
      // if read successfully
      dispatch(fetchNotifications());
    } catch (error) {
      // console.log(error);
    }
  }

  function handleDelete(e) {
    e.stopPropagation();

    deleteNotification();
  }

  function handleDropdown(e) {
    e.stopPropagation();
    dispatch(setActiveNotification(notification.id));
    // setDisplay(!display);
  }

  return (
    <div
      className={`border-top p-2 notification-card ${
        notification.is_read ? '' : 'unread-notification'
      }`}
      onClick={readNotification}
    >
      <span
        className="float-right text-muted link-like"
        onClick={handleDropdown}
      >
        <FaEllipsisV />
      </span>
      {activeNotification === notification.id ? (
        <span
          className="dropdown-del border rounded px-2 py-1 link-like"
          onClick={handleDelete}
        >
          Delete
        </span>
      ) : null}
      {/* <span
        className={`dropdown-del border rounded px-2 py-1 link-like ${
          display ? '' : 'no-display'
        }`}
        onClick={handleDelete}
      >
        Delete
      </span> */}
      <a href={notification.link}>
        <div>
          <h6 className="d-inline-block">{notification.title}</h6>

          <span className="text-muted d-block" style={{ fontSize: 'smaller' }}>
            {notification.message}
          </span>
          <div className="small-date text-right">
            <TimeAgo timestamp={notification.created_at} />
          </div>
        </div>
      </a>
    </div>
  );
};

// Only re-rendering if props changes
// NotificationExcerpt = React.memo(NotificationExcerpt)

export default NotificationExcerpt;
