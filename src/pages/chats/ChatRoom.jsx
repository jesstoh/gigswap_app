import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatsList from '../../components/chats/ChatsList';
import ChatMessagesSpace from '../../components/chats/ChatMessagesSpace';
import { db } from '../../services/firebase';

function ChatRoom() {
  return (
    <Container className="mt-3 chat-container">
      {/* <Row>Placeholder search User</Row> */}
      <Row noGutters className='border rounded'>
        <Col
          xs="4" sm='3'
          className="border-right rounded overflow-auto chat-list"
          style={{ height: '80vh' }}
        >
          <ChatsList />
        </Col>
        <Col
          xs="8" sm='9'
          className=""
          style={{ height: '80vh', position: 'relative' }}
        >
          <ChatMessagesSpace />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;
