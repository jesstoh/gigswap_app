import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { db } from '../../services/firebase';
import firebase from 'firebase/app';
import { formatDistanceToNowStrict } from 'date-fns';

function ChatMessagesSpace() {
  const { isHirer } = useSelector((state) => state.authentication); // Check role of login user
  const { chatId, hirer, talent } = useSelector((state) => state.chats);

  const [newMessage, setNewMessage] = useState(''); // Store state of new message
  const [messages, setMessages] = useState([]); // Store messages fetched
  const [currentListeningChat, setCurrentListeningChat] = useState(null); //Store return function of firestore listener

  const [shiftKey, setShiftKey] = useState(false); //Store whether shift key is pressed

  const unreadField = isHirer ? 'unreadTalent' : 'unreadHirer';
  const readField = isHirer ? 'unreadHirer' : 'unreadTalent';

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
  function handleSubmit(e) {
    // e.preventDefault();

    //If not empty string, push data to firestore
    if (newMessage) {
      // TESTING
      db.collection('chats')
        .doc(chatId)
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
            .doc(chatId)
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
    // console.log(chatId);

    // Detaching previous chat room listener
    if (currentListeningChat) {
      currentListeningChat();
      // console.log('detaching listening', chatId);
    }

    // If chat room is selected
    if (chatId) {
      // mark all message as read when first open chat
      db.collection('chats')
        .doc(chatId)
        .set({ [unreadField]: 0 }, { merge: true })
        .then(() => {
          console.log('read all', chatId);
        })
        .catch((err) => console.log('read error', err));

      //Listening to incoming messages
      const listeningChat = db
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt')
        .onSnapshot(
          (querySnapshot) => {
            const allMessages = [];
            querySnapshot.docs.forEach((doc) => {
              // if (!doc.metadata.hasPendingwWrites) {
              allMessages.push({ id: doc.id, data: doc.data() });

              // console.log(format(doc.data().createdAt.toDate(), 'yyyy'));
              // console.log(doc.data());
              // console.log(
              //   formatDistanceToNowStrict(doc.data().createdAt.toDate())
              // );
              db.collection('chats')
                .doc(chatId)
                .set({ [readField]: 0 }, { merge: true });
            });
            //   console.log(allMessages);
            setMessages(allMessages);
          },
          (err) => {
            console.log('error occurred', err);
          }
        );
      // Set current listener function in state
      setCurrentListeningChat(() => listeningChat);
    }
  }, [chatId]);

  let content;

  if (chatId) {
    // if chat is selected
    content = (
      <>
        <div className="px-4 message-container py-2" style={{ height: '90%' }}>
          {messages.map((message) => (
            <div
              key={message.id}
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
                  {formatDistanceToNowStrict(message.data.createdAt.toDate())}{' '}
                  ago
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          // style={{ position: 'absolute', bottom: '0', left: '0', width: '95%' }}
          className="pl-3 pt-2"
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Row noGutters>
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
  } else {
    content = (
      <div
        className="px-4 message-container py-2 text-center"
        style={{ height: '100%' }}
      >
        <span className="align-center">Start a chat now</span>
      </div>
    );
  }

  return <>{content}</>;
}

export default ChatMessagesSpace;
