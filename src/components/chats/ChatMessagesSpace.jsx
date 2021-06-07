import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import firebase from 'firebase/app';
import { formatDistanceToNowStrict } from 'date-fns';

function ChatMessagesSpace() {
  const { isHirer } = useSelector((state) => state.authentication); // Check role of login user

  const [newMessage, setNewMessage] = useState(''); // Store state of new message
  const [messages, setMessages] = useState([]); // Store messages fetched

  const [shiftKey, setShiftKey] = useState(false); //Store whether shift key is pressed

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  function handleEnterKey(e) {
    // Keep in state that shift key is pressed
    if (e.keyCode === 13 && !shiftKey) {
      handleSubmit();
    }
  }
  //   function handleEnterKey(e) {
  //     // Keep in state that shift key is pressed
  //     if (e.shiftKey) {
  //       setShiftKey(true);
  //     }

  //     // Only submit form if shift key is not pressed
  //     if (e.keyCode === 13 && !shiftKey) {
  //       handleSubmit();
  //     }
  //   }

  //   function handleKeyUp(e) {
  //     if (e.shiftKey) {
  //       setShiftKey(false);
  //     }
  //   }

  // sending message
  function handleSubmit() {
    // e.preventDefault();

    const unreadField = isHirer ? 'unreadTalent' : 'unreadHirer';
    //If not empty string, push data to firestore
    if (newMessage) {
      // TESTING
      db.collection('chats')
        .doc('jesstoh23-kenning')
        .collection('messages')
        .doc()
        .set({
          fromHirer: isHirer, // Set this message is sent from talent or hirer
          message: newMessage,
          //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          // Set updated timestamp on parent doc
          db.collection('chats')
            .doc('jesstoh23-kenning')
            .set(
              {
                updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
                [unreadField]: firebase.firestore.FieldValue.increment(1),
              },
              { merge: true }
            );
          console.log('saved successfully');
          setNewMessage(''); // Clear message box
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }

    ///////////TESTING/////
    // db.collection('chats')
    //   .doc('jesstoh23-kenning')
    //   .set({ read: 1, hirer: 'jesstoh23', talent: 'kenning' }, { merge: true })
    //   .then(() => {
    //     console.log('success');
    //   })
    //   .catch((error) => console.log('error', error));
  }

  useEffect(() => {
    db.collection('chats')
      .doc('jesstoh23-kenning')
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(
        (querySnapshot) => {
          const allMessages = [];
          querySnapshot.docs.forEach((doc) => {
            // if (!doc.metadata.hasPendingwWrites) {
            allMessages.push({ id: doc.id, data: doc.data() });
            // console.log(format(doc.data().createdAt.toDate(), 'yyyy'));
            console.log(doc.data());
            console.log(
              formatDistanceToNowStrict(doc.data().createdAt.toDate())
            );
          });
          //   console.log(allMessages);
          setMessages(allMessages);


        },
        (err) => {
          console.log('error occurred', err);
        }
      );
  }, []);

  return (
    <>
      <div className="px-4 message-container" style={{ height: '90%' }}>
        {messages.map((message) => (
          <div
            className={`d-flex ${
              message.data.fromHirer === isHirer ? 'justify-content-end' : ''
            }`}
          >
            <div
              className={`mb-3 p-2 message-box ${
                message.data.fromHirer === isHirer ? 'box-right' : 'box-left'
              }`}
            >
              {message.data.message}
              <div className="text-muted text-smaller text-right">
                {formatDistanceToNowStrict(message.data.createdAt.toDate())} ago
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ position: 'absolute', bottom: '0', left: '0', width: '95%' }}
        className="pl-3"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
