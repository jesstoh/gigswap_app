import React from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

function TimeAgo({timestamp, text}) {
  const convertedDatetime = parseISO(timestamp);
  const period = formatDistanceToNow(convertedDatetime);

  return (
    <span className='text-muted'>
      <i>{text} {period} ago</i>
    </span>
  );
}

export default TimeAgo;
