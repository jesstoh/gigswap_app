import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { db } from '../../services/firebase';
import firebase from 'firebase/app';

function ChatMessagesSpace() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  function handleEnterKey(e) {
    if (e.keyCode === 13) {
      handleSubmit()
    }
  }

  // sending message
  function handleSubmit() {
    // e.preventDefault();
    //If not empty string, push data to firestore
    if (newMessage) {
      // TESTING
      db.collection('chats')
        .doc('jesstoh23-kenning')
        .collection('messages')
        .doc()
        .set({
          fromHirer: true, // Set this message is sent from talent or hirer
          message: newMessage,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log('saved successfully');
          setNewMessage(''); // Clear message box
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  }

  useEffect(() => {
    // Fetch existing messages

    // Fetch new messages
    db.collection('chats')
      .doc('jesstoh23-kenning')
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const allMessages = [];
          querySnapshot.docs.forEach((doc) => {
            allMessages.unshift({ id: doc.id, data: doc.data() });
          });

          setMessages(allMessages);

          // querySnapshot.docChanges().forEach(change => {
          //     if (change.type === 'added') {
          //         setMessages([...messages, change.doc.data()])
          //         console.log(change.doc.data())
          //     }
          // })
        },
        (err) => {
          console.log('error occurred', err);
        }
      );
  }, []);

  return (
    <>
      <div>
        Message Space
        {messages.map((message) => (
          <div>{message.data.message}</div>
        ))}
      </div>
      <div
        style={{ position: 'absolute', bottom: '0', left: '0', width: '95%' }}
        className="pl-3"
      >
        <Form onSubmit={e => {
            e.preventDefault();
            handleSubmit();
        }}>
          <Row>
            <Col xs="8" sm="10">
          <Form.Group className="text-left">
            <Form.Control
              as="textarea"
              rows={1}
              style={{ resize: 'none' }}
              name="message"
              value={newMessage}
              onChange={handleChange}
              onKeyDown={handleEnterKey}
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
