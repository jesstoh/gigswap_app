import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { db } from '../../services/firebase';
import { setChatRoom } from '../../slices/chatsSlice.js';

function ChatsList() {
  const dispatch = useDispatch();
  const isHirer = useSelector((state) => state.authentication.isHirer); //Get current login user role
  const username = useSelector((state) => state.authentication.user.username); //Get current login user username
  const activeChat = useSelector((state) => state.chats);

  //Keep list of chat rooms
  const [chatsList, setChatsList] = useState([]);

  const roleField = isHirer ? 'hirer' : 'talent';

  //Fetch all chat rooms upon first rendering
  useEffect(() => {
    db.collection('chats')
      .orderBy('updatedAt', 'desc')
      .where(roleField, '==', username)

      .onSnapshot(
        (querySnapshot) => {
          const allChatRooms = [];
          querySnapshot.docs.forEach((doc) => {
            allChatRooms.push({ chatId: doc.id, data: doc.data() });
            // console.log(doc.data());
          });
          setChatsList(allChatRooms);
        },
        (err) => {
          console.log('error occurred', err);
        }
      );
  }, []);

  let content;

  if (chatsList.length === 0) {
    content = isHirer ? (
      <div className='p-2 text-primary'><a href='/hirer/mypage' className='line-less'><i>Go to your gig applicant list to connect with talent</i></a></div>
    ) : (
      <div className='p-2 text-primary'><i>No hirer is in contact yet</i></div>
    );
  } else {
    content = (
      <ListGroup as="ul">
        {chatsList.map((chat) => (
          <ListGroup.Item
            key={chat.chatId}
            id={chat.chatId}
            as="li"
            action
            active={chat.chatId === activeChat.chatId}
            onClick={() => {
              dispatch(
                setChatRoom(chat.chatId, chat.data.hirer, chat.data.talent)
              );
            }}
          >
            {chat.data[isHirer ? 'talentName' : 'hirerName']}{' '}
            <span className="text-smaller">
              ({chat.data[isHirer ? 'talent' : 'hirer']})
            </span>
            {chat.data[isHirer ? 'unreadHirer' : 'unreadTalent'] ? (
              <Badge variant="warning" pill className="float-right">
                {chat.data[isHirer ? 'unreadHirer' : 'unreadTalent']}
              </Badge>
            ) : null}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  return <>{content}</>;
}

export default ChatsList;
