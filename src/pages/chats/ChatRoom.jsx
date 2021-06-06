import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatsList from '../../components/chats/ChatsList';
import ChatMessagesSpace from '../../components/chats/ChatMessagesSpace';
import { db } from '../../services/firebase';

function ChatRoom() {
  return (
    <Container className="mt-3">
      <Row>Placeholder search User</Row>
      <Row>
        <Col
          xs="3"
          className="border rounded overflow-auto"
          style={{ height: '80vh' }}
        >
          <ChatsList />
        </Col>
        <Col
          xs="9"
          className="border rounded overflow-auto"
          style={{ height: '80vh', position: 'relative' }}
        >
          <ChatMessagesSpace />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;
