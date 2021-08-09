import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import hash from 'object-hash';
import { getMessages } from '../features/messagesSlice';
import { db, postConverter } from '../firebase/config';
import { useDispatch } from 'react-redux';

import { addMessage } from '../features/messagesSlice';

const ChatMessage = ({ channelId = '', bottomRef }) => {
  // const selectorObj = getMessages);
  const messagesByChannelId = useSelector(getMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    // create new message listener for
    // this specific chatmessage room
    if (channelId) {
      const unsub = db
        .collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .limit(1)
        .withConverter(postConverter)
        .onSnapshot((snap) => {
          snap.forEach((doc) => {
            // console.log('new data : ', doc.data());
            // console.log('new data created at', doc.data().message);
            if (doc.data().createdAt) {
              // console.log('new data 2: ', doc.data());
              dispatch(
                addMessage({
                  channelId: channelId,
                  message: doc.data(),
                }),
              );

              bottomRef.current.scrollIntoView({
                behavior: 'smooth',
              });
            }
          });
        });

      return () => unsub();
    }
  }, [channelId, dispatch, bottomRef]);

  const renderChatMessageList = (channelId) => {
    if (!messagesByChannelId[channelId]) {
      return 'please select channel id';
    }
    return messagesByChannelId[channelId].map((message) => {
      // console.log(message);
      return (
        <li key={hash(message)}>
          <img src={message.userImage} alt="userimage" />
          {/* <span className="user">{message.user}</span> */}
          <h4>
            {message.user}
            <span className="created-at">
              {message.createdAt.seconds
                ? new Date(message.createdAt.toDate()).toUTCString()
                : message.createdAt.toString()}
            </span>
          </h4>
          <span className="message">{message.message}</span>
        </li>
      );
    });
  };

  return (
    <React.Fragment>
      <ChatMessageStyled>
        <ul>{renderChatMessageList(channelId)}</ul>
      </ChatMessageStyled>
    </React.Fragment>
  );
};

export default ChatMessage;

const ChatMessageStyled = styled.div`
  padding-bottom: 130px;

  & > ul > li {
    display: grid;
    grid-template-columns: 35px 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 15px 10px;
    column-gap: 5px;
  }

  & > ul > li > img {
    grid-area: 1/1/3/2;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  & > ul > li > h4 > span {
    font-size: 10px;
    color: gray;
    font-weight: 300;
    margin-left: 4px;
  }

  & > ul > li > .user {
    grid-area: 1/2/2/3;
    width: 35px;
    height: auto;
  }

  & > ul > li > .message {
    grid-area: 2/2/3/4;
    /* color: red; */
  }
`;
