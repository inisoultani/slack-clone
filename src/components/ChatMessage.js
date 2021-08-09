import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import hash from 'object-hash';
import {
  getMessageByChannelId,
  getMessages,
  getMessagesByChannelIdThunk,
} from '../features/messagesSlice';

const ChatMessage = ({ channelId = '', bottomRef }) => {
  // const selectorObj = getMessages);
  const messagesByChannelId = useSelector(getMessages);

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

  useEffect(() => {
    console.log(`channel id now : ${channelId}`);
    setTimeout(() => {
      bottomRef.current.scrollIntoView({
        behavior: 'smooth',
      });
      console.log('view scrolled');
    }, 2000);
  }, [channelId, bottomRef]);

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
