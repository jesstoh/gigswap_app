import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function ChatMessagesSpace() {
  return (
    <>
    <div>Message Space</div>
    <div style={{position: 'absolute', bottom:'0', left:'0', width:'100%'}} className='border p-2'>Create message</div>
    </>
  );
}

export default ChatMessagesSpace;