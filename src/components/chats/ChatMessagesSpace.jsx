import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db } from '../../services/firebase';
import firebase from 'firebase/app';

function ChatMessagesSpace() {
  const [message, setMessage] = useState('');

  function handleChange(e) {
    setMessage(e.target.value);
  }

  // sending message
  function handleSubmit(e) {
    e.preventDefault();
    //If not empty string, push data to firestore
    if (message) {
      // TESTING
      db.collection('chats')
        .doc('jesstoh23-kenning')
        .collection('messages')
        .doc()
        .set({
          from: 'jesstoh23',
          message: message,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => console.log('saved successfully'))
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }

  return (
    <>
      <div>Message Space</div>
      <div
        style={{ position: 'absolute', bottom: '0', left: '0', width: '95%' }}
        className="pl-3"
        // className="border p-2"
      >
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs="8" sm="10">
              <Form.Group className="text-left">
                <Form.Control
                  as="textarea"
                  rows={1}
                  style={{ resize: 'none' }}
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col xs="4" sm="2">
              <Button variant="primary" type="submit">
                Send
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default ChatMessagesSpace;
