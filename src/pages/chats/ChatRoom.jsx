import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatsList from '../../components/chats/ChatsList';
import ChatMessagesSpace from '../../components/chats/ChatMessagesSpace';
import { db } from '../../services/firebase';

function ChatRoom() {
  return (
    <Container className="mt-3 chat-container">
      <Row>Placeholder search User</Row>
      <Row noGutters>
        <Col
          xs="3"
          className="border overflow-auto chat-list"
          style={{ height: '80vh' }}
        >
          <ChatsList />
        </Col>
        <Col
          xs="9"
          className="border"
          style={{ height: '80vh', position: 'relative' }}
        >
          <ChatMessagesSpace />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatRoom;
